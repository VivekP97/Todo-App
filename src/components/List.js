import { useState } from "react";
import ListItem from "./ListItem";

export default function List({ items, handleDeleteItem, handleCheckboxToggle }) {
  return (
    <>
      <div>
        <ul>
          {items.map(item => {
            return (
              <ListItem 
                key={item.id} 
                itemInfo={item} 
                handleDeleteItem={handleDeleteItem} 
                handleCheckboxToggle={handleCheckboxToggle} 
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}