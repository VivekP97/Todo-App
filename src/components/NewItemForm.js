import { useState } from "react";
import { useTodoCtx } from "../contexts/TodoContext";

export default function NewItemForm() {
  // import state from TodoContext
  const { addItemToList } = useTodoCtx();

  const [newItem, setNewItem] = useState("");

  /**
   * This function handles when the user clicks the "Add Item" button.
   * */
  function handleAddItem() {
    if (!newItem) {
      // The item text is empty, so don't add it.
      return;
    }

    // Call the function to handle adding this item
    // NOTE: The item is supposed to be an object, not just the text as a string.
    addItemToList({id: crypto.randomUUID(), title: newItem, lastModifiedTime: new Date(), completed: false});

    // Clear the input field
    setNewItem("");
  }

  /**
   * Handle keydown events for the input field.
   * @param {Object} e - The Javascript event object that is fired 
   * */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      // The Enter key was pressed, so try to add the item in the input field.
      handleAddItem();
    }
  }

  return (
  <>
    <div>
      {/* Input field for new item to add to list */}
      <input 
        type="text" 
        value={newItem} 
        className="form-control w-100" 
        placeholder="Enter a new item..." 
        maxLength={100}
        onChange={e => setNewItem(e.target.value)} 
        onKeyDown={handleKeyDown}/>
    </div>
    <div className="d-flex justify-content-center mt-2 gap-2">
      <button className="btn btn-success w-50" onClick={handleAddItem}>Add Item</button>
      <button className="btn btn-outline-danger w-50" onClick={e => {setNewItem('')}}>Clear</button>
    </div>
  </>
  );
}