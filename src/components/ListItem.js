import { useState } from "react";
import "../styles/main.css";

export default function ListItem({ itemInfo, handleDeleteItem, handleCheckboxToggle }) {
  return (
    <li className="d-flex align-items-center">
      {/* Item checkbox and label */}
      <input type="checkbox" id={`li-checkbox-${itemInfo.id}`} className="form-check-input me-2 li-checkbox" checked={itemInfo.completed} onChange={e => {handleCheckboxToggle(itemInfo.id, e.target.checked)}} />
      <label className="list-item" htmlFor={`li-checkbox-${itemInfo.id}`}>{itemInfo.title}</label>

      {/* Button to delete an item */}
      <button className="btn btn-danger btn-sm" onClick={() => {handleDeleteItem(itemInfo.id)}}>Delete</button>
    </li>
  );
}