import { createContext, useContext, useState } from "react";
import { sortItems, sortOptionIsValid } from "../utils/general.js"

// Create the context
const TodoContext = createContext();

// Provider Component definition
export function TodoProvider({ children }) {
  // state variables to manage the list of todo lists 
  const [allTodoLists, setAllTodoLists] = useState([
    {
      name: "Untitled List",
      sortOption: "alphabetical",
      items: []
    }
  ]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  /**
   * This function adds the given item to the current list.
   * @param {Object} newItem - The new list item to add to the current list.
   * */
  function addItemToList(newItem) {
    // Don't add item if the title is empty.
    if (!newItem || !newItem.title) {
      return;
    }

    // copy the state variable
    let localAllTodoLists = allTodoLists.slice();
    let currList = localAllTodoLists[selectedListIndex];

    //let newItemsList = currList.items.slice();
    currList.items.push(newItem);

    // re-sort the items
    sortItems(currList.items, currList.sortOption);

    // Update the list state in 'allTodoLists'
    localAllTodoLists[selectedListIndex] = currList;
    setAllTodoLists(localAllTodoLists);
  }

  /**
   * This function removes the specified item from the list.
   * @param {string} id - The ID of the item to remove from the current list.
   */
  function removeItemById(id) {
    // copy the state variable
    let localAllTodoLists = allTodoLists.slice();
    let currList = localAllTodoLists[selectedListIndex];

    // Find the index of the given ID
    let i = currList.items.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      currList.items.splice(i, 1);

      // Update the list state in 'allTodoLists'
      localAllTodoLists[selectedListIndex] = currList;
      setAllTodoLists(localAllTodoLists);
    }
  }

  /** 
   * This function handles when a list item (checkbox) is toggled. 
   * @param {string} id - The ID of the list item to toggle
   * @param {boolean} newVal - The new state of the checkbox
   * */
  function handleCheckboxToggle(id, newVal) {
    console.log("[App][handleCheckboxToggle] Triggered for: ", id, newVal);

    // Confirm that 'id' is not empty
    if (!id) {
      console.log("[App][handleCheckboxToggle] ID is empty!");
      return;
    }

    // copy the state variable
    let localAllTodoLists = allTodoLists.slice();
    let currList = localAllTodoLists[selectedListIndex];

    // Find the index of the given ID
    let i = currList.items.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      currList.items[i].completed = !!newVal;
      sortItems(currList.items, currList.sortOption);

      // Update the list state in 'allTodoLists'
      localAllTodoLists[selectedListIndex] = currList;
      setAllTodoLists(localAllTodoLists);
    }
  }

  /** 
   * This function handles when a list item's priority setting is toggled. 
   * @param {string} id - The ID of the list item to toggle
   * */
  function handlePriorityToggle(id) {
    console.log("[App][handlePriorityToggle] Triggered for: ", id);

    // Confirm that 'id' is not empty
    if (!id) {
      console.log("[App][handlePriorityToggle] ID is empty!");
      return;
    }

    // copy the state variable
    let localAllTodoLists = allTodoLists.slice();
    let currList = localAllTodoLists[selectedListIndex];

    // Find the index of the given ID
    let i = currList.items.findIndex(elem => elem.id === id);
    if (i >= 0) {
      // We were able to find the ID 
      currList.items[i].priority = !currList.items[i].priority;
      sortItems(currList.items, currList.sortOption);

      // Update the list state in 'allTodoLists'
      localAllTodoLists[selectedListIndex] = currList;
      setAllTodoLists(localAllTodoLists);
    }
  }

  /**
   * This function sorts 'items' by the selected sort order
   * @param {string} selectedSortOption - The ID of the sort option selected from the dropdown.
   */
  function handleSortSelection(selectedSortOption) {
    console.log("[App][sortItems] Selected: " + selectedSortOption);
    if (!sortOptionIsValid(selectedSortOption)) {
      // Given value is invalid, so exit.
      return;
    }

    // copy the state variable
    let localAllTodoLists = allTodoLists.slice();
    let currList = localAllTodoLists[selectedListIndex];

    sortItems(currList.items, selectedSortOption);

    // update the sort option for this list
    currList.sortOption = selectedSortOption;
    
    // Update the list state in 'allTodoLists'
    localAllTodoLists[selectedListIndex] = currList;
    setAllTodoLists(localAllTodoLists);
  }

  /**
   * This function is used to add the given list to 'allTodoLists'
   * @param {Object} newList
   */
  function addNewList(newList) {
    let localAllTodoLists = allTodoLists.slice();
    localAllTodoLists.push(newList);
    setAllTodoLists(localAllTodoLists);
  }

  /**
   * This function is called to programmatically select a list from the sidebar.
   * @param {int} listIndex - The index of the list to select
   */
  function handleSelectList(listIndex) {
    setSelectedListIndex(listIndex);
  }

  /**
   * This function is used to delete a list from 'allTodoLists'.
   * @param {int} listIndex - The index of the list to delete
   */
  function handleDeleteList(listIndex) {
    // Don't allow users to delete all lists
    if (allTodoLists.length === 1) {
      return;
    }

    // Validate the index
    if (listIndex < 0 || listIndex >= allTodoLists.length) {
      // The given index is outside the bounds of 'allTodoLists'
      return;
    }

    // Use the functional form of setState to modify multiple state variables without causing a race condition
    setAllTodoLists(prevLists => {
      // Create a new array excluding the one to delete
      // NOTE: We don't use slice() here because it only creates a shallow copy 
      const newAllTodoLists = prevLists.filter((_, i) => {
        return listIndex !== i;
      });

      // Update the selected list if the 'selectedListIndex' is no longer valid.
      setSelectedListIndex(prevIndex => {
        // If the index is out of bounds, then select the last list
        return prevIndex >= newAllTodoLists.length ? newAllTodoLists.length - 1 : prevIndex;
      });

      return newAllTodoLists;
    });
  }
  
  return (
    <TodoContext.Provider value={{ addItemToList, allTodoLists, setAllTodoLists, selectedListIndex, handleSelectList, handleDeleteList, handleSortSelection, removeItemById, handleCheckboxToggle, handlePriorityToggle, addNewList }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook for instantiating this context
export function useTodoCtx() {
  return useContext(TodoContext);
}