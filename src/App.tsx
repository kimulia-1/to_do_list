import React, { useState } from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';

export type FilterValuesType = "all" | "active" | "completed";
function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([{id: 1, title: "HTML&CSS", isDone: true},
  {id: 2, title: "JS", isDone: false},
  {id: 3, title: "React", isDone: true},
  {id: 4, title: "Redux", isDone: true},
  {id: 5, title: "nodejs", isDone: true}]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
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
  // let tasks2: Array<TasksType> = [
  //   {id: 1, title: "Homework", isDone: true},
  //   {id: 2, title: "Cooking", isDone: false},
  //   {id: 3, title: "Chill", isDone: true},
  // ]

  return (
    <div className="App">
      <ToDoList title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
