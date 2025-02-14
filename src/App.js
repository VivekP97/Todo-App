import { useState } from "react";
import ListItem from "./components/ListItem";
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

  return (
    <>
      {/* Container for all the page content */}
      <div className="col-12 col-md-6 mt-4 mx-auto card p-3">
        {/* Form to enter new list items */}
        <div>
          <NewItemForm handleNewItem={addItemToList}></NewItemForm>
        </div>
        <hr className="my-3"/>
        <ListItem itemInfo={{title: 'Hello world', lastModifiedTime: new Date(), isChecked: false}}></ListItem>
      </div>
    </>
  );
}