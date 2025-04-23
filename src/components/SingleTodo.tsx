import React, { JSX, useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import Tick from "../icons/Tick";
import Delete from "../icons/Delete";
import Edit from "../icons/Edit";
import "./styles.css";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  index: number;
  t: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, t, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string | number>(t.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={t.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, t.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : t.isDone ? (
            <s className="todos__single--text">{t.todo}</s>
          ) : (
            <span className="todos__single--text">{t.todo}</span>
          )}

          <div className="inlineIcons">
            <span
              onClick={() => {
                if (!edit && !t.isDone) {
                  setEdit(!edit);
                }
              }}
              className="icon"
            >
              <Edit />
            </span>
            <span onClick={() => handleDone(t.id)} className="icon">
              <Tick />
            </span>
            <span onClick={() => handleDelete(t.id)} className="icon">
              <Delete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
