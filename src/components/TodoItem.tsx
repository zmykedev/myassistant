import { Todo } from "../app/types/todo"; // Importing the Todo type from a types file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Defining the interface for the props that the TodoItem component will receive
interface TodoItemProps {
  todo: Todo; // A single todo item
  toggleComplete: (id: string) => void; // Function to toggle the completion status of a todo
  deleteTodo: (id: string) => void; // Function to delete a todo
  assignPerson: (id: string, person: string | null) => void; // Function to assign a person to a todo
  hasBorder?: boolean; // Optional prop to determine if the item should have a border
}

// Defining the TodoItem component as a functional component with the specified props
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  assignPerson,
  hasBorder,
}) => {
  const handleOpenRepo = (todo: Todo) => {
    if (todo?.assignedTo && todo?.repoName) {
      const url = `https://github1s.com/${todo.assignedTo}/${todo.repoName}`;
      return window.open(url, "_blank");
    }
    toast.error(
      "Error: Se debe proporcionar el usuario y el repositorio para abrir el repositorio."
    );
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className={
          "flex items-center justify-between px-4 py-2 group" +
          (hasBorder ? " border-b" : "") // Conditionally adding a border class if hasBorder is true
        }
      >
        <div className="flex items-center">
          <input
            className="h-5 w-5 text-blue-500"
            type="checkbox"
            checked={todo.isCompleted} // Checkbox is checked if the todo is completed
            onChange={() => toggleComplete(todo.id)} // Toggle completion status on change
          />
          <span
            className={`ml-2 text-sm text-white ${
              todo.isCompleted ? "text-gray-500 line-through" : "text-gray-900" // Apply different styles if the todo is completed
            }`}
          >
            {todo.assignedTo && (
              <span className="border rounded-md text-xs py-[2px] px-1 mr-2  border-purple-700 uppercase bg-purple-400 text-black font-medium">
                {todo.assignedTo}{" "}
                {/* Display the assigned person's name if available */}
              </span>
            )}
            {todo.text} {/* Display the todo text */}
          </span>
        </div>

        <div>
          {" "}
          <button
            onClick={() => handleOpenRepo(todo)}
            className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="4 4 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => deleteTodo(todo.id)} // Delete the todo on button click
            className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              const name = prompt("Assign person to this task:");
              assignPerson(todo.id, name);
            }}
            className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
