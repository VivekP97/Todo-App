import ListItem from "./ListItem";
import { AnimatePresence } from "framer-motion";
import { allSortingOptions } from "../utils/general";
import { useTodoCtx } from "../contexts/TodoContext";

export default function List() {
  // get the current list of items from the TodoContext
  const { allTodoLists, selectedListIndex, handleSortSelection } = useTodoCtx();
  const items = allTodoLists[selectedListIndex].items.slice();

  return (
    <>
      {/* Dropdown menu to select sorting option */}
      <div className="d-flex justify-content-between my-2">
        <h3 className="ms-4 mb-0">Todo List</h3>

        <div className="me-4">
          <span className="fw-bold">Sort:</span>&nbsp;&nbsp;
          <select className="custom-select" onChange={(e) => handleSortSelection(e.target.value)}>
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
            {
              items.length === 0 ? 
              <p className="text-center fst-italic">No items to display</p> :
              items.map((item, i) => {
                return (
                  <ListItem 
                    key={item.id}
                    itemIndex={i}
                    itemInfo={item}
                  />
                );
              })
            }
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
}