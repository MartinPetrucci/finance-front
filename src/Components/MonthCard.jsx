import { useState } from "react";
import "../Styles/last.css";
import "../Styles/addItem.css";
import Modal from "./Modal";
import { deleteItem } from "../Request/axios";
import {
  getBalance,
  commaToPoint,
  getMonth,
  getTotal,
  truncateDate,
  getExchange,
  enabledScroll,
} from "../utils/formatters";
import Item from "./Item";
import Chart from "./MyChart";
import AddItem from "./Forms/AddItem";

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

  const [showEdit, setShowEdit] = useState(false);
  const [incomes, setIncomes] = useState(monthInfo.INCOME);
  const [expenses, setExpenses] = useState(monthInfo.EXPENSE);
  const [exchange, setExchange] = useState(exchanges[0]);

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
    setShowEdit(false);
    console.log("finish");
  };

  const displayList = (lista, className) => {
    return lista.map((elem) => {
      return (
        <div
          key={elem._id}
          style={{ width: "100%" }}
          onClick={() => {
            enabledScroll(false);
            setShowEdit(true);
          }}
        >
          <Modal visibility={showEdit} setVisibility={setShowEdit}>
            <h1>ITEM!</h1>
            <h2>
              {elem.details} {elem.amount}
            </h2>
            <h2>{elem._id}</h2>
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
            {getBalance(exchange, incomes, expenses)}
          </div>
          <div className="tres">
            <select
              name="currency"
              onChange={changeCurrency}
              id={`currency${truncateDate(monthInfo.month)}`}
            >
              <option value="AR$">AR$</option>
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
            <div className="box-header" style={{ backgroundColor: "rgb(146, 242, 148, 0.5)" }}>
              <h2>Incomes</h2>
              <p style={{ fontSize: "25px", fontWeight: "400" }}>
                {exchange.currency}
                {commaToPoint(exchange.conversion(getTotal(incomes)))}
              </p>
            </div>
            {displayList(incomes, "income")}
          </div>
          <div className="box">
            <div className="box-header" style={{ backgroundColor: "rgb(255, 128, 128, 0.5)" }}>
              <h2>Expenses</h2>
              <p style={{ fontSize: "25px", fontWeight: "400" }}>
                {exchange.currency}
                {commaToPoint(exchange.conversion(getTotal(expenses)))}
              </p>
            </div>
            {displayList(expenses, "expense")}
          </div>
        </div>
        <AddItem
          incomes={incomes}
          setIncomes={setIncomes}
          expenses={expenses}
          setExpenses={setExpenses}
          month={monthInfo.month}
        />
      </div>
    </>
  );
};

export default MonthCard;
