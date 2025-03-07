import { useTodoCtx } from "../contexts/TodoContext";
import "../styles/sidebar.css";
import { FaList } from "react-icons/fa";

export default function Sidebar() {
  const { allTodoLists, selectedListIndex } = useTodoCtx();

  return (
    <div className="sidebar-container col-3 col-md-2 d-flex flex-column">
      {/* List of Todo lists */}
      <div>
        <ul className="list-of-lists">
          {allTodoLists.map((list, i) => {
            return <li className={"todo-list py-2 px-3 " + (i === selectedListIndex ? "selected-todo-list" : "")}><FaList className="mb-1" />&nbsp;&nbsp;{list.name}</li>
          })}
        </ul>
      </div>

      {/* Button to add a new list */}
      <div className="mt-auto">
        <button className="btn btn-success w-100">+ New List</button>
      </div>
    </div>
  );
}