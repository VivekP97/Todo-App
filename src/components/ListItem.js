import "../styles/main.css";
import { MdDelete } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTodoCtx } from "../contexts/TodoContext";

export default function ListItem({ itemInfo, itemIndex }) {
  // import state from TodoContext
  const {removeItemById, handleCheckboxToggle, handlePriorityToggle} = useTodoCtx();

  return (
    <motion.li layout 
              key={itemInfo.id} 
              className={"d-flex mb-1 " + (itemIndex % 2 == 1 ? "bg-light" : "")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      {/* Item checkbox and label */}
      <input type="checkbox" id={`li-checkbox-${itemInfo.id}`} className="form-check-input me-2 li-checkbox mt-2" checked={itemInfo.completed} onChange={e => {handleCheckboxToggle(itemInfo.id, e.target.checked)}} />
      <label className={"list-item flex-grow-1 " + (itemInfo.completed ? "list-item-checked" : "")} htmlFor={`li-checkbox-${itemInfo.id}`}>{itemInfo.title}</label>

      {/* Icon to set priority on items */}
      <div>
        {itemInfo.priority ? <FaStar className="priority-icon me-1" onClick={() => handlePriorityToggle(itemInfo.id)} /> : <FaRegStar className="non-priority-icon me-1" onClick={() => {handlePriorityToggle(itemInfo.id)}} />}
      </div>

      {/* Icon to delete an item */}
      <div className="ms-auto me-4">
        <MdDelete className="li-icon delete-icon" onClick={() => {removeItemById(itemInfo.id)}}/>
      </div>
    </motion.li>
  );
}