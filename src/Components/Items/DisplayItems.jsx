import Item from "./Item";
import Modal from "../Modal";
import { useState } from "react";
import { enabledScroll } from "../../utils/formatters";
import { deleteItem, updateItem } from "../../Request/axios";

const DisplayItems = ({ items, setItems, className, exchange }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    _id: "",
    details: "",
    amount: "",
    date: "",
  });

  const delItem = async (itemId) => {
    console.log({ itemId });
    try {
      await deleteItem(itemId);
      const newArray = items.filter((elem) => elem._id !== itemId);
      setItems(newArray);
      console.log("deleted");
    } catch (error) {
      console.error(error);
    }
    enabledScroll(true);
    setVisibility(false);
    console.log("finish");
  };

  const updItem = async () => {
    const form = document.querySelector("#addItemForm");
    const updatedItem = Object.fromEntries(new FormData(form));
    const x = {...selectedItem, updateItem}
    console.log({updatedItem})
    try {
      const response = await updateItem(x._id, x);
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
    enabledScroll(true);
    setVisibility(false);
  };

  return items.map((elem) => {
    return (
      <>
        <Modal
          title={"Edit item"}
          visibility={visibility}
          setVisibility={setVisibility}
          onClose={() => console.log("close")}
        >
          <form id="editItemForm" className="group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              name="details"
              defaultValue={selectedItem.details}
            />
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              defaultValue={selectedItem.amount}
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              defaultValue={selectedItem.date.substring(0, 10)}
            />
            <button onClick={updItem}>SAVE</button>
            <button
              style={{ backgroundColor: "#e49a9a" }}
              onClick={(e) => {
                e.preventDefault();
                delItem(selectedItem._id);
              }}
            >
              DELETE
            </button>
          </form>
        </Modal>

        <div
          key={elem._id}
          style={{ width: "100%" }}
          onClick={() => {
            setSelectedItem(elem);
            setVisibility(true);
            enabledScroll(false);
          }}
        >
          <Item item={elem} className={className} exchange={exchange} />
        </div>
      </>
    );
  });
};

export default DisplayItems;
