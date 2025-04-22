import React, { JSX } from "react";
import { Todo } from "../model";
import Tick from "../icons/Tick";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import "./styles.css";

interface Props {
  t: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ t, todos, setTodos }) => {
  return (
    <form className="todos__single">
      <span className="todos__single--text">{t.todo}</span>
      <div className="inlineIcons">
        <span className="icon">
          <Tick />
        </span>
        <span className="icon">
          <Delete />
        </span>
        <span className="icon">
          <Edit />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
