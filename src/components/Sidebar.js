import { useState, useRef, useEffect, useMemo } from "react";
import { useTodoCtx } from "../contexts/TodoContext";
import "../styles/sidebar.css";
import { FaList, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "bootstrap/js/dist/modal"; // Import Bootstrap's JS Modal
import 'bootstrap/dist/css/bootstrap.css';

export default function Sidebar() {
  const { allTodoLists, setAllTodoLists, selectedListIndex, handleSelectList, handleDeleteList, addNewList } = useTodoCtx();
  const [newListName, setNewListName] = useState("");

  // Create a state variable to keep track of which mode to use for the modal (i.e. add or update a todo list).
  const [manageTodoListMode, setManageTodoListMode] = useState("add"); // Possible values: "add", "edit"

  // create a ref to control the modal
  const modalRef = useRef(null);
  const [modalInstance, setModalInstance] = useState(null);

  // Create a state var to indicate which list to update (when in edit mode)
  const [listToEditIndex, setListToEditIndex] = useState(0);

  // This memoized var indicates whether to disable the Create/Update button in the modal based on the name
  // NOTE: Using a memoized variable ensures that React only re-computes this value on renders when one of the dependent values have changed.
  const shouldDisableSave = useMemo(() => newNameIsInvalid(), [newListName]);

  useEffect(() => {
    if (modalRef.current) {
      setModalInstance(new Modal(modalRef.current));

      // Add an event listener for when the modal closes so we can reset it
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        setNewListName("");
        setManageTodoListMode("add");
      });

      // Add an event listener for when the modal opens so we can focus the input field
      modalRef.current.addEventListener("shown.bs.modal", () => {
        document.getElementById("new-list-name-input").focus();
      });
    }
  }, []);

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
      // copy the current list or lists
      let localAllTodoLists = JSON.parse(JSON.stringify(allTodoLists));
      localAllTodoLists[listToEditIndex].name = newListName;
      setAllTodoLists(localAllTodoLists);

      // Update todo list
      modalInstance.hide();
    }
  }

  /**
   * This function is called when a list is selected to be edited.
   * @param {int} i - The index of the list to edit
   */
  function selectListToEdit(i) {
    // set the index of the list to update
    setListToEditIndex(i);

    // update the modal mode
    setManageTodoListMode("edit");

    // set the 'newListName' state so it autofills in the input field
    setNewListName(allTodoLists[i].name);

    // open the modal
    modalInstance.show();
  }

  /**
   * This function is used to indicate whether the name inputted in the modal is invalid.
   * The name cannot be empty or a duplicate of an existing list.
   * @return {boolean} - A boolean indicating whether the name is invalid.
   */
  function newNameIsInvalid() {
    if (!newListName) {
      // List is empty, so disable save
      return true;
    } else if (allTodoLists.some(obj => obj.name === newListName)) {
      // We found a list with the inputted name, so disable save
      return true;
    }

    // No issues were found so enable save.
    return false;
  }

  return (
    <>
      <div className="sidebar-container col-3 col-md-2 d-flex flex-column">
        {/* List of Todo lists */}
        <div>
          <ul className="list-of-lists">
            {allTodoLists.map((list, i) => {
              return (
                <li key={list.name} className={"todo-list d-flex align-items-center justify-content-between py-2 px-3 " + (i === selectedListIndex ? "selected-todo-list" : "")} onClick={() => handleSelectList(i)}>
                  {/* List name */}
                  <div className="d-inline-block">
                    <FaList className="mb-1" />&nbsp;&nbsp;{list.name}
                  </div>

                  {/* Buttons to edit/delete a list */}
                  <div className="d-flex">
                    <FaRegEdit className="edit-list-icon me-1" onClick={() => selectListToEdit(i)} />
                    <MdDelete className="delete-list-icon" onClick={() => handleDeleteList(i)} />
                  </div>
                </li>)
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
                id="new-list-name-input"
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
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleSave()} disabled={shouldDisableSave}>{manageTodoListMode === "add" ? "Create" : "Update"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}