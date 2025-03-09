import { useState, useRef, useEffect } from "react";
import { useTodoCtx } from "../contexts/TodoContext";
import "../styles/sidebar.css";
import { FaList } from "react-icons/fa";
import Modal from "bootstrap/js/dist/modal"; // Import Bootstrap's JS Modal
import 'bootstrap/dist/css/bootstrap.css';

export default function Sidebar() {
  const { allTodoLists, selectedListIndex, addNewList } = useTodoCtx();
  const [newListName, setNewListName] = useState("");

  // Create a state variable to keep track of which mode to use for the modal (i.e. add or update a todo list).
  const [manageTodoListMode, setManageTodoListMode] = useState("add"); // Possible values: "add", "modify"

  // create a ref to control the modal
  const modalRef = useRef(null);
  const [modalInstance, setModalInstance] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      setModalInstance(new Modal(modalRef.current));

      // Add an event listener for when the modal closes so we can clear the input field
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        setNewListName("");
      });
    }
  }, []);

  /**
   * This function is used to programmatically open the modal
   */
  function openModal() {
    if (modalInstance) {
      modalInstance.show();
    }
  }

  /**
   * This function is called when the user wants to save changes for the creation or update of a todo list.
   */
  function handleSave() {
    if (!newListName) {
      // Don't save empty name
      return;
    }

    if (manageTodoListMode === "add") {
      // Create new todo list
      let newList = {
        name: newListName,
        sortOption: "alphabetical",
        items: []
      }

      // add this todo list to 'allTodoLists'
      addNewList(newList);

      // Reset the list name input field
      setNewListName("");

      modalInstance.hide();
    } else {
      // Update todo list
      modalInstance.hide();
    }
  }

  /**
   * Handle keydown events for the input field.
   * */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      // The Enter key was pressed, so try to save the changes for the todo list.
      handleSave();
    }
  }

  return (
    <>
      <div className="sidebar-container col-3 col-md-2 d-flex flex-column">
        {/* List of Todo lists */}
        <div>
          <ul className="list-of-lists">
            {allTodoLists.map((list, i) => {
              return <li key={list.name} className={"todo-list py-2 px-3 " + (i === selectedListIndex ? "selected-todo-list" : "")}><FaList className="mb-1" />&nbsp;&nbsp;{list.name}</li>
            })}
          </ul>
        </div>

        {/* Button to add a new list */}
        <div className="mt-auto">
          <button className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#manage-todo-list-modal">+ New List</button>
        </div>

        {/* Modal to add/update a todo list */}
        <div className="modal fade" id="manage-todo-list-modal" ref={modalRef} data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">{manageTodoListMode === "add" ? "Create todo list" : "Update todo list"}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
              <input 
                type="text" 
                value={newListName} 
                className="form-control w-100" 
                placeholder="Enter a name" 
                maxLength={25}
                onChange={e => setNewListName(e.target.value)}/>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleSave()} disabled={!newListName}>{manageTodoListMode === "add" ? "Create" : "Update"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}