import { useState } from "react";
import List from "./components/List";
import NewItemForm from "./components/NewItemForm";
import { sortOptionIsValid } from "./utils/general";

export default function App() {
  // state variables to manage the list of todo lists
  const [allItems, setAllItems] = useState([]); 
  const [sortOption, setSortOption] = useState("alphabetical");
  
  /* This function adds the given item to the current list. */
  function addItemToList(newItem) {
    // Don't add item if the title is empty.
    if (!newItem || !newItem.title) {
      return;
    }

    let newItemsList = allItems.slice();
    newItemsList.push(newItem);

    // re-sort the items
    sortItems(newItemsList, sortOption);

    setAllItems(newItemsList);
  }

  /* This function removes the specified item from the list. */
  function removeItemById(id) {
    // Find the index of the given ID
    let newAllItems = allItems.slice();
    let i = newAllItems.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      newAllItems.splice(i, 1);
      setAllItems(newAllItems);
    }
  }

  /** 
   * This function handles when a list item (checkbox) is toggled. 
   * @param id - The ID of the list item to toggle
   * @param newVal - The new state of the checkbox
   * */
  function handleCheckboxToggle(id, newVal) {
    console.log("[App][handleCheckboxToggle] Triggered for: ", id, newVal);

    // Confirm that 'id' is not empty
    if (!id) {
      console.log("[App][handleCheckboxToggle] ID is empty!");
      return;
    }

    // Find the index of the given ID
    let newAllItems = allItems.slice();
    let i = newAllItems.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      newAllItems[i].completed = !!newVal;
      sortItems(newAllItems, sortOption);
      setAllItems(newAllItems);
    }
  }

  /** 
   * This function handles when a list item's priority setting is toggled. 
   * @param id - The ID of the list item to toggle
   * @param newVal - The new state of the toggle
   * */
  function handlePriorityToggle(id, newVal) {
    console.log("[App][handlePriorityToggle] Triggered for: ", id);

    // Confirm that 'id' is not empty
    if (!id) {
      console.log("[App][handlePriorityToggle] ID is empty!");
      return;
    }

    // Find the index of the given ID
    let newAllItems = allItems.slice();
    let i = newAllItems.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      newAllItems[i].priority = !newAllItems[i].priority;
      sortItems(newAllItems, sortOption);
      setAllItems(newAllItems);
    }
  }

  // This function sorts 'items' by the selected sort order
  function handleSortSelection(selectedSortOption) {
    console.log("[App][sortItems] Selected: " + selectedSortOption);
    if (!sortOptionIsValid(selectedSortOption)) {
      // Given value is invalid, so exit.
      return;
    }

    let sortedItems = allItems.slice();
    sortItems(sortedItems, selectedSortOption);

    // update state variables with new values
    setSortOption(selectedSortOption);
    setAllItems(sortedItems);
  }

  return (
    <>
      {/* Container for all the page content */}
      <div className="col-12 col-md-6 mt-4 mx-auto card p-3">
        {/* Form to enter new list items */}
        <div>
          <NewItemForm handleNewItem={addItemToList} />
        </div>
        <hr className="my-3"/>
        <List items={allItems} sortOrder={sortOption} handleDeleteItem={removeItemById} handleCheckboxToggle={handleCheckboxToggle} handlePriorityToggle={handlePriorityToggle} handleSort={handleSortSelection} />
      </div>
    </>
  );
}