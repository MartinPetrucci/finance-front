import "../Styles/modal.css";
import { enabledScroll } from "../utils/formatters";

const Modal = ({ children, visibility, setVisibility, onClose }) => {
  

  const closeModal = () => {
      if(onClose !== undefined) onClose()
      enabledScroll(true)
      setVisibility(false)
  };

  return (
    <>
      <div
        className="overlay"
        style={{ display: visibility ? "flex" : "none" }}
      >
        <div className="window">
          <div className="modal-header">
            <h3>Add item</h3>
          </div>
          <button onClick={closeModal} className="close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
