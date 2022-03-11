import { useState, useEffect } from "react";
import Tarjeta from "../Components/Tarjeta";

const renderCards = (months) => {
    months.forEach(month => {console.table(month)})
    return (
      <>
      {months.map(month => <Tarjeta month={month} /> )}
        
                    
      </>
    );
  };

const Overview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Use effect");
    fetch("http://localhost:3001/month-rates")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (data.length === 0) {
    console.log("nada");
  } else {
    console.log("effect", data);
  }
  
  return (
    <>
      <h1>Overview</h1>
      {
        // data.length === 0 ? "Loading..." : <Tarjeta month={data[0].months[0]}/>
        data.length === 0 ? "Loading..." : renderCards(data[0].months)
      }
      {/* <Tarjeta month={data[0].months[0].month} /> */}
    </>
  );
};

export default Overview;
