import { useState } from "react";
import ListItem from "./ListItem";
import { MdSort } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { allSortingOptions } from "../utils/general";

export default function List({ items, handleDeleteItem, handleCheckboxToggle, handlePriorityToggle, handleSort }) {
  // Create a state variable to keep track of the selected sort option
  //const [sortOption, setSortOption] = useState("alphabetical");
  //const [sortedItems, setSortedItems] = useState(items.slice());

  return (
    <>
      {/* Dropdown menu to select sorting option */}
      <div className="d-flex justify-content-between my-2">
        <h3 className="ms-4 mb-0">Todo List</h3>

        <div className="me-4">
          <span className="fw-bold">Sort:</span>&nbsp;&nbsp;
          <select className="custom-select" onChange={(e) => handleSort(e.target.value)}>
            {allSortingOptions.map((sortOpt) => {
              return <option value={sortOpt.id}>{sortOpt.title}</option>
            })}
          </select>
        </div>
      </div>

      <hr className="mx-4" />

      {/* List of items with animations for addition/deletion of items */}
      <div>
        <ul>
          <AnimatePresence>
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
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
}