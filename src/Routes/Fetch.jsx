import { useState, useEffect } from "react";
import { getDollarRate, getItems } from "../Request/axios";
import MonthCard from "../Components/MonthCard";
import "../Styles/last.css";
import { commaToPoint, getBalanceColor, getTotal } from "../utils/formatters";

const Loading = () => {
  return (
    <>
      <h1>Loading!!</h1>
    </>
  );
};

const Fetch = () => {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getItems()
      .then((data) => {
        console.table(data);
        setItems(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="month-cards">
        {isLoading ? (
          <Loading />
        ) : (
          items.map((elem) => {
            let yearElement = <></>;
            let month = elem.month.substring(5, 7);
            if (month === "01") {
              let year = elem.month.substring(0, 4);
              let months = items.filter(
                (elem) => elem.month.substring(0, 4) === year
              );
              let balance = 0;
              months.forEach((elem) => {
                balance += getTotal(elem.INCOME) - getTotal(elem.EXPENSE);
              });
              yearElement = (
                <div className="year" key={year}>
                  <p className="year-number">{year}</p>
                  <p className="year-balance" style={{color: getBalanceColor(balance)}}>AR${commaToPoint(balance)}</p>
                </div>
              );
            }
            return (
              <>
                {yearElement}
                <MonthCard key={elem.month} monthInfo={elem} />
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default Fetch;
