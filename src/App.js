import Sidebar from "./components/Sidebar";
import List from "./components/List";
import NewItemForm from "./components/NewItemForm";
import { TodoProvider } from "./contexts/TodoContext";

export default function App() {  

  return (
    <>
      {/* Wrap all the app contents with the TodoProvider for the TodoContext so we can access state everywhere */}
      <TodoProvider>
        {/* Sidebar to manage todo lists */}
        <Sidebar />

        {/* Container for all the page content */}
        <div className="col-12 col-md-6 mt-4 mx-auto card p-3">
          {/* Form to enter new list items */}
          <div>
            <NewItemForm />
          </div>
          <hr className="my-3"/>
          <List />
        </div>
      </TodoProvider>
    </>
  );
}