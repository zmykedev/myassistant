"use client"; // Indicates that this file is a client-side module

import { TodoItem } from "./TodoItem"; // Importing the TodoItem component
import { nanoid } from "nanoid"; // Importing the nanoid library for generating unique IDs
import { useState, useCallback } from "react"; // Importing the useState hook from React
import { Todo } from "../types/todo"; // Importing the Todo type
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

interface TodoListProps {
  selectedDate: string;
}

export const TodoList: React.FC<TodoListProps> = ({ selectedDate }) => {
  const [todosByDate, setTodosByDate] = useState<{ [date: string]: Todo[] }>(
    {}
  );
  const [input, setInput] = useState("");

  useCopilotReadable({
    description: "The user's todo list.",
    value: todosByDate,
  });

  useCopilotAction({
    name: "updateTodoList",
    description: "Update the user's todo list",
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "The new and updated todo list items.",
        attributes: [
          {
            name: "id",
            type: "string",
            description: "The id of the todo item.",
          },
          {
            name: "text",
            type: "string",
            description: "The text of the todo item.",
          },
          {
            name: "isCompleted",
            type: "boolean",
            description: "The completion status of the todo item.",
          },
          {
            name: "assignedTo",
            type: "string",
            description: "The person assigned to the todo item.",
          },
          {
            name: "day",
            type: "string",
            description: "The day of the todo item in 'YYYY-MM-DD' format.",
          },
        ],
      },
    ],
    handler: ({ items }) => {
      setTodosByDate((prev) => {
        const newTodosByDate = { ...prev };
        items.forEach((item) => {
          if (!newTodosByDate[item.day]) {
            newTodosByDate[item.day] = [];
          }
          const existingItemIndex = newTodosByDate[item.day].findIndex(
            (todo) => todo.id === item.id
          );
          if (existingItemIndex !== -1) {
            newTodosByDate[item.day][existingItemIndex] = item;
          } else {
            newTodosByDate[item.day].push(item);
          }
        });
        return newTodosByDate;
      });
    },
    render: "Updating the todo list...",
  });

  useCopilotAction({
    name: "deleteTodo",
    description: "Delete a todo item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item to delete.",
      },
    ],
    handler: ({ id }) => {
      setTodosByDate((prev) => {
        const newTodosByDate = { ...prev };
        for (const day in newTodosByDate) {
          newTodosByDate[day] = newTodosByDate[day].filter(
            (todo) => todo.id !== id
          );
        }
        return newTodosByDate;
      });
    },
    render: "Deleting a todo item...",
  });

  const addTodo = useCallback(() => {
    if (input.trim() !== "") {
      const newTodo: Todo = {
        id: nanoid(),
        text: input.trim(),
        isCompleted: false,
        day: selectedDate,
      };
      setTodosByDate((prev) => {
        const newTodos = { ...prev };
        if (!newTodos[selectedDate]) {
          newTodos[selectedDate] = [];
        }
        newTodos[selectedDate] = [...newTodos[selectedDate], newTodo];
        return newTodos;
      });
      setInput("");
    }
  }, [input, selectedDate]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleComplete = (id: string) => {
    setTodosByDate((prev) => {
      const newTodos = { ...prev };
      for (const day in newTodos) {
        newTodos[day] = newTodos[day].map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
      }
      return newTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodosByDate((prev) => {
      const newTodos = { ...prev };
      for (const day in newTodos) {
        newTodos[day] = newTodos[day].filter((todo) => todo.id !== id);
      }
      return newTodos;
    });
  };

  const assignPerson = (id: string, person: string | null) => {
    setTodosByDate((prev) => {
      const newTodos = { ...prev };
      for (const day in newTodos) {
        newTodos[day] = newTodos[day].map((todo) =>
          todo.id === id
            ? { ...todo, assignedTo: person ? person : undefined }
            : todo
        );
      }
      return newTodos;
    });
  };

  const getCurrentDateTodos = () => {
    return todosByDate[selectedDate] || [];
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border rounded-md p-2 flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 rounded-md p-2 text-white select-none"
          onClick={addTodo}
        >
          Agregar Tarea
        </button>
      </div>
      {getCurrentDateTodos().length > 0 && (
        <div className="border rounded-lg">
          {getCurrentDateTodos().map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              assignPerson={assignPerson}
              hasBorder={index !== getCurrentDateTodos().length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
