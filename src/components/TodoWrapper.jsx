import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditToDoForm";
uuidv4();

const TodoWrapper = () => {
  const [todoS, setTodo] = useState([]);

  const addTodo = (todo) => {
    setTodo([
      ...todoS,
      { id: uuidv4(), task: todo, isEditable: false, isCompleted: false },
    ]);
  };

  const toggleComplete = (id) => {
    const newTodoS = todoS.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(newTodoS);
  };

  const deleteToDo = (id) => {
    const newTodoS = todoS.filter((todo) => todo.id !== id);
    setTodo(newTodoS);
  };

  const editToDo = (id) => {
    const newTodoS = todoS.map((todo) =>
      todo.id === id ? { ...todo, isEditable: !todo.isEditable } : todo
    );
    setTodo(newTodoS);
  };

  const editTask = (task, id) => {
    const newTodoS = todoS.map((todo) =>
      todo.id === id ? { ...todo, task, isEditable: !todo.isEditable } : todo
    );
    setTodo(newTodoS);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done</h1>
      <TodoForm addTodo={addTodo} />
      {todoS.map((todo) =>
        todo.isEditable ? (
          <EditTodoForm editTask={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
