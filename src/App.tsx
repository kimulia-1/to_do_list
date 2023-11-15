import React, { useState } from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: false},
    {id: v1(), title: "React", isDone: true},
    {id: v1(), title: "Redux", isDone: true},
    {id: v1(), title: "nodejs", isDone: true}]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }
  function removeTask(id: string) {
    let filtredTasks= tasks.filter(t => t.id !== id);
    setTasks(filtredTasks);
  }

  let tasksForToDoList = tasks;
  if (filter === "completed") {
    tasksForToDoList = tasks.filter(t => t.isDone === true);
  } else if (filter === "active") {
    tasksForToDoList = tasks.filter(t => t.isDone === false);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
 
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <ToDoList title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus} />
    </div>
  );
}

export default App;
