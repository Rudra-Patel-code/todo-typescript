import React, { createContext, useContext, useEffect, useState } from "react";
import { TodoInterface } from "../interfaces/todo";
import toast from "react-hot-toast";

// Create a context to manage todos
const TodoContext = createContext<{
  todos: TodoInterface[];
  updateTodo: (title: string, description: string, id: string) => void;
  createTodo: (title: string, description: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}>({
  todos: [],
  createTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

// Create a hook to access the todos and related functions
const useTodo = () => useContext(TodoContext);

// Create a component that provides todos
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  // function to create todo
  const createTodo = (title: string, description: string) => {
    let todo: TodoInterface = {
      title,
      description,
      isComplete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: Date.now().toString(),
    };

    setTodos((prev) => [todo, ...prev]);
    toast.success("Todo created Successfully");
  };

  // change todos
  const updateTodo = (title: string, description: string, id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? { ...todo, title, description, updatedAt: new Date().toISOString() }
          : todo
      )
    );

    toast.success("Todo updated Successfully");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              isComplete: !todo.isComplete,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );

    toast.success("Todo updated successfully!");
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
    toast.success("Todo deleted successfully!");
  };

  useEffect(() => {
    // setting up demo todos
    const demoTodos = [
      {
        title: "Finish homework",
        description:
          "Complete the math assignment and submit it before the deadline.",
      },
      {
        title: "Buy groceries",
        description:
          "Purchase fruits, vegetables, milk, and bread from the supermarket.",
      },
      {
        title: "Go for a run",
        description: "Run for 30 minutes in the park to maintain fitness.",
      },
      {
        title: "Call mom",
        description: "Give mom a call to check in and catch up with her.",
      },
      {
        title: "Write blog post",
        description: "Draft a blog post on the topic of JavaScript frameworks.",
      },
      {
        title: "Fix leaking faucet",
        description: "Repair the leaking faucet in the bathroom.",
      },
      {
        title: "Attend meeting",
        description:
          "Join the team meeting at 10:00 AM to discuss project updates.",
      },
      {
        title: "Read book",
        description:
          "Read the latest novel by your favorite author for leisure.",
      },
      {
        title: "Practice guitar",
        description: "Spend 1 hour practicing guitar chords and scales.",
      },
      {
        title: "Plan weekend trip",
        description:
          "Research and plan a weekend getaway with friends or family.",
      },
    ];

    const demoList = demoTodos.map((todo, i) => ({
      title: todo.title,
      description: todo.description,
      isComplete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: (Date.now() + i * 1000).toString(),
    }));

    console.log(demoList);
    setTodos(demoList);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { TodoContext, TodoProvider, useTodo };
