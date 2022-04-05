import "../Styles/menu.css";
import { useState } from "react";

const Menu = () => {
  const [show, setShow] = useState(false);

  const showSide = () => {
    setShow(true);
  };

  const hideSide = () => {
    setShow(false);
  };

  return (
    <>
      <button onClick={showSide} className="buttonMenu">
        <svg
          className="svgMenu"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <div className="side" style={{ display: show ? "flex" : "none" }}>
        <button onClick={hideSide}>
          <svg
            className="svgMenu"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <ul
        style={{position: "absolute", top: "80px", left: "20px"}}
        >
          <li>Agregar gasto/ingreso fijo</li>
          <li>Add fixed income/expense</li>
          <li>aa</li>
          <li>a</li>
          <li>a</li>
          <li>a</li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
