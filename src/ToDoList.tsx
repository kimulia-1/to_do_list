import React, { useState } from "react";
import { FilterValuesType } from "./App";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

export function ToDoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              props.addTask(newTaskTitle);
              setNewTaskTitle("");
            }
          }
            } />
        <button onClick={() => {
          props.addTask(newTaskTitle);
          setNewTaskTitle("");
        }}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}></input>
          <span>{t.title}</span>
      <button onClick={() => {props.removeTask(t.id)}}>X</button></li>)
      }
      </ul>
      <div>
    <button onClick={() => {props.changeFilter("all")}}>All</button>
    <button onClick={() => {props.changeFilter("active")}}>Active</button>
    <button onClick={() => {props.changeFilter("completed")}}>Completed</button></div>
    </div>
  )
}