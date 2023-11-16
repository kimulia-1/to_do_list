import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";



// Создаем типы входящих данных (props)
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
  changeTaskStatus: (id: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function ToDoList(props: PropsType) {

  // Создаем callback
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === "Enter") {
        addTask();
      }
    }

const addTask = () => {
  if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
    setNewTaskTitle("");
  } else {
    setError("Title is required");
  }
  }
const onAllClickHandler = () => props.changeFilter("all");
const onActiveClickHandler = () => props.changeFilter("active");
const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        {/* В input создали обработчик, который отрисовывает текст на каждую букву, 
        также сделали кнопку для добавления задачи и добавление задачи через клавишу Enter */}

        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyUp={onKeyUpHandler} 
          className={error ? "error" : ""}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          // С поомщью map проходимся по всем объектам массива
          props.tasks.map(t => {
          // Создаем callback для удаления задачи в этом месте т.к. нам необходимо отрисовать в цикле
          const onRemoveHandler = () => {
            {props.removeTask(t.id)}
          }

          // Создаем callback для изменения статуса задачи
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
          }
      return <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <input type="checkbox" 
              onChange={onChangeHandler}
              checked={t.isDone}>
            </input>
          <span>{t.title}</span>
      <button onClick={onRemoveHandler}>X</button></li>})
      }
      </ul>
      <div>
        
      {/* Сделали кнопки для фильтрации */}
      <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
      <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button></div>
    </div>
  )
}