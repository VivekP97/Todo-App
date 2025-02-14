import { useState } from "react";
export default function NewItemForm({handleNewItem}) {
  const [newItem, setNewItem] = useState("");

  /* This function handles when the user clicks "Add Item" */
  function handleAddItem(itemText) {
    if (!itemText) {
      // The item text is empty, so don't add it.
      return;
    }

    // Call the callback function to handle this item
    // NOTE: The item is supposed to be an object, not just the text as a string.
    handleNewItem({title: itemText, lastModifiedTime: new Date(), isChecked: false});

    // Clear the input field
    setNewItem("");
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
        onChange={e => setNewItem(e.target.value)} />
    </div>
    <div className="d-flex justify-content-center mt-2 gap-2">
      <button className="btn btn-success w-50" onClick={handleAddItem}>Add Item</button>
      <button className="btn btn-outline-danger w-50" onClick={e => {setNewItem('')}}>Clear</button>
    </div>
  </>
  );
}