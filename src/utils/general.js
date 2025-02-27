// The list of all available sorting options
export const allSortingOptions = [
  {id: "alphabetical", title: "Alphabetical"},
  {id: "reverse-alphabetical", title: "Reverse Alphabetical"},
  {id: "priority-first", title: "Priority First"},
  {id: "priority-last", title: "Priority Last"},
  {id: "completed-first", title: "Completed First"},
  {id: "completed-last", title: "Completed Last"}
];

/**
 * Check whether the given sorting option ID is valid.
 * @param {string} sortOptionId
 */
export function sortOptionIsValid(sortOptionId) {
  return allSortingOptions.findIndex(opt => opt.id === sortOptionId) >= 0;
}

/**
 * A helper function to sort a list of items according to the specified type. The array will be sorted in place.
 * @param {Array} items - The array of items to sort
 * @param {string} sortOption - The sort type (e.g. alphabetical, priority first)
 */
export function sortItems(items, sortOption) {
  switch (sortOption) {
    case "alphabetical":
      items.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "reverse-alphabetical":
      items.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "priority-first":
      items.sort((a, b) => {
        if (a.priority) {
          // Item 'a' is a priority item so put it first (it doesn't matter if 'b' is also priority)
          return -1;
        } else if (b.priority) {
          // Item 'b' is a priority item so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "priority-last":
      items.sort((a, b) => {
        if (!a.priority) {
          // Item 'a' is a priority item so put it first (it doesn't matter if 'b' is also priority)
          return -1;
        } else if (!b.priority) {
          // Item 'b' is a priority item so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "completed-first":
      items.sort((a, b) => {
        if (a.completed) {
          // Item 'a' is completed so put it first (it doesn't matter if 'b' is also completed)
          return -1;
        } else if (b.completed) {
          // Item 'b' is completed so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;

    case "completed-last":
      items.sort((a, b) => {
        if (!a.completed) {
          // Item 'a' is completed so put it first (it doesn't matter if 'b' is also completed)
          return -1;
        } else if (!b.priority) {
          // Item 'b' is completed so put it first
          return 1;
        } else {
          return 0;
        }
      });
      break;
  }
}