import { useState } from "react";
import "../styles/main.css";

export default function ListItem({ itemInfo, itemIndex, handleDeleteItem, handleCheckboxToggle }) {
  return (
    <li className={"d-flex mb-1 " + (itemIndex % 2 == 1 ? "bg-light" : "")}>
      {/* Item checkbox and label */}
      <input type="checkbox" id={`li-checkbox-${itemInfo.id}`} className="form-check-input me-2 li-checkbox mt-2" checked={itemInfo.completed} onChange={e => {handleCheckboxToggle(itemInfo.id, e.target.checked)}} />
      <label className="list-item flex-grow-1" htmlFor={`li-checkbox-${itemInfo.id}`}>{itemInfo.title}</label>

      {/* Button to delete an item */}
      <button className="btn btn-danger btn-sm ms-auto me-4 align-self-start" onClick={() => {handleDeleteItem(itemInfo.id)}}>Delete</button>
    </li>
  );
}