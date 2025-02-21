import { useState } from "react";
import List from "./components/List";
import NewItemForm from "./components/NewItemForm";

export default function App() {
  const [allItems, setAllItems] = useState([]); 

  /* This function adds the given item to the current list. */
  function addItemToList(newItem) {
    // Don't add item if the title is empty.
    if (!newItem || !newItem.title) {
      return;
    }

    let newItemsList = allItems.slice();
    newItemsList.push(newItem);
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
    console.log("[handleCheckboxToggle] Triggered for: ", id, newVal);

    // Confirm that 'id' is not empty
    if (!id) {
      console.log("[handleCheckboxToggle] ID is empty!");
      return;
    }

    // Find the index of the given ID
    let newAllItems = allItems.slice();
    let i = newAllItems.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      newAllItems[i].completed = !!newVal;
      setAllItems(newAllItems);
    }
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
        <List items={allItems} handleDeleteItem={removeItemById} handleCheckboxToggle={handleCheckboxToggle} />
      </div>
    </>
  );
}