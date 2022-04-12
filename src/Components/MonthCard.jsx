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
import Item from "./Items/Item";
import Chart from "./MyChart";
import AddItem from "./Items/AddItem";
import DisplayItems from "./Items/DisplayItems";

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

  const [incomes, setIncomes] = useState(monthInfo.INCOME);
  const [expenses, setExpenses] = useState(monthInfo.EXPENSE);
  const [exchange, setExchange] = useState(exchanges[0]);
  const [chartVisibility, setChartVisibility] = useState(false);

  const changeCurrency = () => {
    const currency = document.querySelector(
      `#currency${truncateDate(monthInfo.month)}`
    ).value;
    console.log({ currency });
    const obj = exchanges.find((elem) => elem.currency === currency);
    setExchange(obj);
  };

  const handleChartVisibility = () => {
    const obj = !chartVisibility ? {text:"Show chart", path: "M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"}
     : {text: "Hide chart", path: "M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"};

    return (
      <>
        <p style={{ textDecoration: "underline", fontWeight: "400"}}>{obj.text}</p>
        <svg
          style={{
            width: "21px",
            height: "28px",
            marginLeft: "5px",
          }}
          id="caretDown"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-down"
          viewBox="0 0 16 16"
        >
          <path d={obj.path} />
        </svg>
      </>
    );
  };

  return (
    <>
      <div className="cardd">
        <div className="cardd-header" style={{ color: "white" }}>
          <div className="x">
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
          <div
            className="showChart"
            onClick={() => {
              setChartVisibility(!chartVisibility);
              console.log("click");
            }}
          >
            {handleChartVisibility()}
            {/* <p style={{ textDecoration: "underline", fontWeight: "400" }}>
              Show chart{" "}
            </p>
            <svg
              style={{
                width: "21px",
                height: "28px",
                marginLeft: "5px",
              }}
              id="caretDown"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
            </svg> */}
          </div>
        </div>
        <Chart
          visibility={chartVisibility}
          incomes={incomes}
          expenses={expenses}
          exchange={exchange}
        />
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
            <DisplayItems
              items={incomes}
              setItems={setIncomes}
              className="income"
              exchange={exchange}
            />
          </div>
          <div className="box">
            <div
              className="box-header"
              style={{ backgroundColor: "rgb(255, 128, 128, 0.5)" }}
            >
              <h2>Expenses</h2>
              <p style={{ fontSize: "25px", fontWeight: "400" }}>
                {exchange.currency}
                {commaToPoint(exchange.conversion(getTotal(expenses)))}
              </p>
            </div>
            <DisplayItems
              items={expenses}
              setItems={setExpenses}
              className="expense"
              exchange={exchange}
            />
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
