This is a simple todo/checklist application to demonstrate basic React features such as state, effects, and reactivity.

I tried to organize the project files in a standard way and structure the React project according to best practices in terms of separating components and maintaining clear parent/child component relationships.

## Building and running the app

To build and run the application, open a terminal/shell window in the root directory of the project and execute `npm run start`. The application will be running on `localhost:3000`.

## Features of the app

Users can create multiple todo lists, edit the names of existing todo lists, and delete todo lists. 

Within a todo list, users can add and remove items or set items as a "priority" with the star toggle. Items in a list can be sorted in various ways and the sort order will be remembered when switching between todo lists in the sidebar.

## Implementation Details

I have leveraged various React features and hooks in an effort to explore them and to make my app robust and maintainable.

For example, to avoid prop drilling, I implemented a context API to manage the state of the todo lists since different components need to modify different state variables and it would be very verbose/messy to pass props from the top parent component down to all the children.