import { useState } from "react";
import "../styles/main.css";

export default function ListItem({ itemInfo }) {
  return (
    <>
      <div className="d-flex align-items-center">
        <input type="checkbox" id="list-item-checkbox" class="form-check-input me-2" />
        <label className="list-item" htmlFor="list-item-checkbox">{itemInfo.title}</label>
      </div>
    </>
  );

}