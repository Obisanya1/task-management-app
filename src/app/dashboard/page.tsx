"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/tasks";
import { getTasks, addTask, updateTask, deleteTask } from "@/services/api";
import AddTaskForm from "../ui/taskform";

export default function TaskList() {
const [tasks, setTasks] = useState<Task[]>([]);
const [showTasks, setShowTasks] = useState(false);

const taskLimit = 10;

const handleShowTasks = async () => {
    try {
      const taskList = await getTasks(); // Fetch tasks from the API
      setTasks(taskList.slice(0, taskLimit)); // Set the tasks in the state
      setShowTasks(!showTasks); // Show the tasks after they are fetched
    } catch (error) {
      console.error('Error fetching tasks:', error); // Handle errors
    }
  }; 
  
   // Function to handle adding a new task to the list
   const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]); // Add the new task to the top of the task list
  };

  return <>
<main className="flex flex-col gap-5 justify-center items-center">
<div className="flex flex-row gap-5 mt-5" >
<button onClick={handleShowTasks} className="bg-blue-950 text-white rounded-sm p-5">Show Tasks</button>
<button className="bg-blue-950 text-white rounded-sm p-5"><AddTaskForm onTaskAdded={handleTaskAdded}/> </button>
</div>
{tasks.length > 0 ? (
        <ul className="flex flex-row gap-3 flex-wrap">
          {tasks.map(task => (
            <li key={task.id} className="bg-blue-100 mt-5 p-5 w-fit flex flex-row">
              {task.title} - {task.completed ? 'Completed' : 'Incomplete'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
      </main>
  </>;
}
