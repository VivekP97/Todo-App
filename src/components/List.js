import { useState } from "react";
import ListItem from "./ListItem";

export default function List({ items, handleDeleteItem, handleCheckboxToggle }) {
  return (
    <>
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
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}