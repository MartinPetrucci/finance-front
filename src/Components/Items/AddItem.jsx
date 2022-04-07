import { addItem } from "../../Request/axios";
import Modal from "../Modal";
import { useState } from "react";
import { enabledScroll, truncateDate } from "../../utils/formatters";

const AddItem = ({ incomes, setIncomes, expenses, setExpenses, month }) => {
  const [visibility, setVisibility] = useState(false);

  const openModal = () => {
    document.querySelector("body").classList.add("stop-scrolling");
    setVisibility(true);
  };

  const resetForm = () => {
    const form = document.querySelector("#addItemForm");
    form.reset()
  }

  const sendForm = async (e) => {
    e.preventDefault();
    //validaciones
    const form = document.querySelector("#addItemForm");
    const newItem = Object.fromEntries(new FormData(form));
    try {
      const addedItem = await addItem({ ...newItem, userId: "62310f4c8a254e63fd7b1bc9" });
      if(addedItem.concept === "INCOME") {
          const newIncomes = [...incomes, addedItem].sort((a,b)=>a.date.substring(8,10) - b.date.substring(8,10))
          setIncomes(newIncomes)  
      } else {
        const newExpenses = [...expenses, addedItem].sort((a,b)=>a.date.substring(8,10) - b.date.substring(8,10))
        setExpenses(newExpenses)  
      }
    } catch (error) {
      console.error(error);
    }
    resetForm()
    enabledScroll(true)
    setVisibility(false);
  };

  return (
    <>
      <button className="add-item" onClick={openModal}>
        ADD ITEM
      </button>
      <Modal title={"Add item"} visibility={visibility} setVisibility={setVisibility} onClose={resetForm}>
        <form id="addItemForm" className="group">
          <label htmlFor="Concept">Concept</label>
          <select name="concept" id={`select${month}`}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <label htmlFor="details">Details</label>
          <input type="text" name="details" />
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" />
          <label htmlFor="date">Date</label>
          <input type="date" name="date" defaultValue={truncateDate(month)} />
          <button onClick={sendForm}>SAVE</button>
        </form>
      </Modal>
    </>
  );
};

export default AddItem;
