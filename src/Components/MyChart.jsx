import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import "../Styles/chart.css";
import { commaToPoint } from "../utils/formatters";
import { useEffect } from "react";

const MyChart = ({ incomes, expenses, exchange }) => {
  
  useEffect(()=>{
  },[])
  console.log('render')
  
  const dailyBalance = (lista) => {
    let balance = 0;
    lista.forEach((elem) => {
      if (elem.concept === "INCOME") {
        balance += elem.amount;
      } else {
        balance -= elem.amount;
      }
    });
    return balance;
  };

  const mapList = (objetos) => {
    let balance = 0;
    let mapped = objetos.map((objeto) => {
      balance += dailyBalance(objeto.y);
      return { ...objeto, y: exchange.conversion(balance) };
      // return { ...objeto, y: balance };
      // {commaToPoint(exchange.conversion(item.amount))}
    });
    console.log({ mapped });
    return mapped;
  };

  const groupByDate = (list) => {
    list.forEach((elem) => {
      const fecha = Number.parseInt(elem.date.substring(8, 10));
      let finded = objetos.find((elem) => elem.x === fecha);
      if (finded !== undefined) {
        finded.y.push(elem);
      }
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Month's Chart",
      },
    },
    xAxes: "linear",
    yAxes: "linear",

  };

  const objetos = [];
  const labels = [];
  for (let i = 1; i <= 31; i++) {
    const obj = {
      x: i,
      y: [],
    };
    objetos.push(obj);
    labels.push(i);
  }

  groupByDate(incomes);
  groupByDate(expenses);

  const mappedList = mapList(objetos);

  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: mappedList,
        borderColor: "white",
        backgroundColor: "black",
        borderWidth: 1,
        borderJoinStyle: "round",
        hoverBackgroundColor: "white",
        hoverBorderJoinStyle: "round",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line
        options={options}
        data={data}
        style={{
          display: "block",
          boxSizing: "borderBox",
          height: "100px",
          width: "200px",
        }}
      />
    </>
  );
};

export default MyChart;
