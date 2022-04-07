import { commaToPoint } from "../../utils/formatters";
const Item = ({ className, item, exchange }) => {
  return (
    <>
      <div className={className} id={item._id}>
        <div className="circle"></div>
        <div className="details">
          <p style={{ fontWeight: "600" }}>{item.details}</p>
          <p>
            {item.date.substring(5, 10).split("-").reverse().join("/")}
          </p>{" "}
        </div>
        <p
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            fontSize: "25px",
          }}
          className="amount"
        >
          {exchange.currency}
          {commaToPoint(exchange.conversion(item.amount))}
        </p>
      </div>
    </>
  );
};

export default Item;
