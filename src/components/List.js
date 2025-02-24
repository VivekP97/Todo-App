import { useState } from "react";
import ListItem from "./ListItem";
import { MdSort } from "react-icons/md";

export default function List({ items, handleDeleteItem, handleCheckboxToggle, handlePriorityToggle, handleSort }) {
  // Create a state variable to keep track of the selected sort option
  const [sortOption, setSortOption] = useState("alphabetical");
  //const [sortedItems, setSortedItems] = useState(items.slice());

  return (
    <>
      {/* Dropdown menu to select sorting option */}
      <div className="d-flex justify-content-between my-2">
        <h3 className="ms-4 mb-0">Todo List</h3>

        <div className="me-4">
          <span className="fw-bold">Sort:</span>&nbsp;&nbsp;
          <select className="custom-select" onChange={(e) => handleSort(e.target.value)}>
            <option value="alphabetical">Alphabetical</option>
            <option value="reverse-alphabetical">Reverse Alphabetical</option>
            <option value="priority-first">Priority First</option>
            <option value="priority-last">Priority Last</option>
          </select>
          {/* <button className="btn btn-success btn-sm dropdown-toggle" id="sort-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort <MdSort />
          </button> */}

          {/* Sorting options */}
          {/* <div className="dropdown-menu" aria-labelledby="sort-dropdown">
            <button className="dropdown-item" type="button">Alphabetical</button>
            <button className="dropdown-item" type="button">Reverse Alphabetical</button>
            <button className="dropdown-item" type="button">Priority First</button>
            <button className="dropdown-item" type="button">Priority Last</button>
          </div> */}
        </div>
      </div>

      <hr className="mx-4" />

      {/* List of items */}
      <div>
        <ul>
          {items.map((item, i) => {
            return (
              <ListItem 
                key={item.id}
                itemIndex={i}
                itemInfo={item} 
                handleDeleteItem={handleDeleteItem} 
                handleCheckboxToggle={handleCheckboxToggle} 
                handlePriorityToggle={handlePriorityToggle}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}