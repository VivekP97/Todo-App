import { useState } from "react";
import List from "./components/List";
import NewItemForm from "./components/NewItemForm";

export default function App() {
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
      setAllItems(newAllItems);
    }
  }

  // This function sorts 'items' by the selected sort order
  function handleSortSelection(selectedSortOption) {
    console.log("[App][sortItems] Selected: " + selectedSortOption);

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

/**
 * A helper function to sort a list of items according to the specified type. The array will be sorted in place.
 * @param {Array} items - The array of items to sort
 * @param {string} sortOption - The sort type (e.g. alphabetical, priority first)
 */
function sortItems(items, sortOption) {
  switch (sortOption) {
    case "alphabetical":
      items.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "reverse-alphabetical":
      items.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "priority-first":
      items.sort((a, b) => {
        if (a.priority) {
          // Item 'a' is a priority item so put it first (it doesn't matter if 'b' is also priority)
          return -1;
        } else if (b.priority) {
          // Item 'b' is a priority item so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "priority-last":
      items.sort((a, b) => {
        if (!a.priority) {
          // Item 'a' is a priority item so put it first (it doesn't matter if 'b' is also priority)
          return -1;
        } else if (!b.priority) {
          // Item 'b' is a priority item so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "completed-first":
      items.sort((a, b) => {
        if (a.completed) {
          // Item 'a' is completed so put it first (it doesn't matter if 'b' is also completed)
          return -1;
        } else if (b.completed) {
          // Item 'b' is completed so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "completed-last":
      items.sort((a, b) => {
        if (!a.completed) {
          // Item 'a' is completed so put it first (it doesn't matter if 'b' is also completed)
          return -1;
        } else if (!b.priority) {
          // Item 'b' is completed so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;
  }
}