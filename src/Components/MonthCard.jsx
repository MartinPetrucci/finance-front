import { useState } from "react";
import "../Styles/last.css";
import "../Styles/addItem.css";
import Modal from "./Modal";
import { addItem, deleteItem } from "../Request/axios";
import {
  commaToPoint,
  getMonth,
  getTotal,
  truncateDate,
  getExchange,
} from "../utils/formatters";
import EditItem from "./EditItem";
import Item from "./Item";
import Chart from "./MyChart";

const MonthCard = ({ monthInfo }) => {
  const exchanges = [
    {
      currency: "AR$",
      conversion: (amount) => amount,
    },
    {
      currency: "US$",
      conversion: (amount) => {
        const x =
          Number.parseFloat(amount) /
          getExchange(monthInfo.month.substring(0, 7));
        return x.toFixed(2);
      },
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(truncateDate(monthInfo.month));
  const [incomes, setIncomes] = useState(monthInfo.INCOME);
  const [expenses, setExpenses] = useState(monthInfo.EXPENSE);
  const [exchange, setExchange] = useState(exchanges[0]);

  const openModal = () => {
    document.querySelector("body").classList.add("stop-scrolling");
    setShowForm(true);
  };

  const save = async () => {
    const concept = document.getElementById("select" + monthInfo.month).value;
    const newItem = {
      details: item,
      amount: amount,
      userId: "62310f4c8a254e63fd7b1bc9",
      concept: concept,
      date: date,
    };

    try {
      const addedItem = await addItem(newItem);
      if (concept === "INCOME") {
        const newArray = [...incomes, addedItem];
        setIncomes(newArray);
      } else if (concept === "EXPENSE") {
        const newArray = [...expenses, addedItem];
        setExpenses(newArray);
      }
    } catch (error) {
      console.error(error);
    }
    document.querySelector("body").classList.remove("stop-scrolling");
    setShowForm(false);
    setItem("");
    setAmount("");
    setDate(truncateDate(monthInfo.month));
  };

  const delItem = async (itemId, concept) => {
    console.log({ itemId });
    try {
      await deleteItem(itemId);
      if (concept === "INCOME") {
        const newArray = incomes.filter((elem) => elem._id !== itemId);
        setIncomes(newArray);
      } else {
        const newArray = expenses.filter((elem) => elem._id !== itemId);
        setExpenses(newArray);
      }
      console.log("deleted");
    } catch (error) {
      console.error(error);
    }
    document.querySelector("body").classList.remove("stop-scrolling");
    setShowEdit(false)
    console.log("finish");
  };

  const editItem = (itemId) => {
    document.querySelector("body").classList.add("stop-scrolling");
    setShowEdit(true);
  };

  const displayList = (lista, className) => {
    return lista.map((elem) => {
      return (
        <div
          key={elem._id}
          style={{ width: "100%" }}
          onClick={() => {
            console.log("click");
            editItem(elem._id);
          }}
        >
          <Modal visibility={showEdit} setVisibility={setShowEdit}>
            <h1>ITEM!</h1>
            <h2>
              {item.details} {item.amount}
            </h2>
            <h2>{item._id}</h2>
            <button
              onClick={() => {
                delItem(elem._id, elem.concept);
              }}
            >
              DELETE
            </button>
          </Modal>
          <Item item={elem} className={className} exchange={exchange} />
        </div>
      );
    });
  };

  const getBalance = () => {
    let balance = exchange.conversion(getTotal(incomes) - getTotal(expenses));
    let style =
      balance > 0
        ? { color: "green", sign: "+" }
        : balance < 0
        ? { color: "red", sign: "" }
        : { color: "white", sign: "" };
    return (
      <p style={{ fontWeight: "500", fontSize: "32px", color: style.color }}>
        {exchange.currency}
        {commaToPoint(balance)}
      </p>
    );
  };
  const changeItem = (e) => {
    setItem(e.target.value);
  };
  const changeAmount = (e) => {
    setAmount(e.target.value);
  };
  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const changeCurrency = () => {
    const currency = document.querySelector(
      `#currency${truncateDate(monthInfo.month)}`
    ).value;
    console.log({ currency });
    const obj = exchanges.find((elem) => elem.currency === currency);
    setExchange(obj);
  };

  return (
    <>
      <div className="cardd">
        <div className="cardd-header" style={{ color: "white" }}>
          <div className="uno"></div>
          <div className="dos">
            <h2>{getMonth(monthInfo.month)}</h2>
            {getBalance()}
          </div>
          <div className="tres">
            <select
              name="currency"
              onChange={changeCurrency}
              id={`currency${truncateDate(monthInfo.month)}`}
            >
              <option type="radio" value="AR$">
                AR$
              </option>
              <option value="US$">US$</option>
            </select>
            <p style={{ fontWeight: "500" }}>
              Monthly average rate:{" "}
              {commaToPoint(getExchange(monthInfo.month.substring(0, 7)))}
            </p>
          </div>
        </div>
        <Chart incomes={incomes} expenses={expenses} exchange={exchange} />
        <div className="cardd-body">
          <div className="box">
            <div
              className="box-header"
              style={{ backgroundColor: "rgb(146, 242, 148, 0.5)" }}
            >
              <h2>Incomes</h2>
              <p style={{ fontSize: "25px", fontWeight: "400" }}>
                {exchange.currency}
                {commaToPoint(exchange.conversion(getTotal(incomes)))}
              </p>
            </div>
            {displayList(incomes, "income")}
          </div>
          <div className="box">
            <div
              className="box-header"
              style={{ backgroundColor: "rgb(255, 128, 128, 0.5)" }}
            >
              <h2>Expenses</h2>
              <p style={{ fontSize: "25px", fontWeight: "400" }}>
                {/* AR${commaToPoint(getTotal(expenses))} */}
                {exchange.currency}
                {commaToPoint(exchange.conversion(getTotal(expenses)))}
              </p>
            </div>
            {displayList(expenses, "expense")}
          </div>
        </div>
        <button className="add-item" onClick={openModal}>
          ADD ITEM
        </button>
        <Modal visibility={showForm} setVisibility={setShowForm}>
          <div className="group">
            <label htmlFor="Concept">Concept</label>
            <select name="concept" id={"select" + monthInfo.month}>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
            <label htmlFor="details">Details</label>
            <input
              onChange={changeItem}
              value={item}
              type="text"
              name="details"
            />
            <label htmlFor="amount">Amount</label>
            <input
              onChange={changeAmount}
              value={amount}
              type="number"
              name="amount"
            />
            <label htmlFor="date">Date</label>
            <input onChange={changeDate} value={date} type="date" name="date" />
            <button onClick={save}>SAVE</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MonthCard;
