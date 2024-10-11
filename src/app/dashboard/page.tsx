"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/tasks";
import { getTasks } from "@/services/api";
import AddTaskForm from "../ui/taskform";
import EditTaskForm from "../ui/edittaskform";

export default function TaskList() {
const [tasks, setTasks] = useState<Task[]>([]);
const [showTasks, setShowTasks] = useState(false);
const [taskLimit] = useState(12); // Limits number of tasks to display (e.g., 10)
const [editingTask, setEditingTask] = useState<Task | null>(null); // Tracks the task being edited

// const taskLimit = 10;

// Load tasks from local storage on component mount
useEffect(() => {
  const savedTasks = localStorage.getItem('tasks'); // Get tasks from local storage
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks)); // Set the tasks from local storage if they exist
  } else {
    // Optionally, you can load tasks from the API initially
    fetchInitialTasks();
  }
}, []);

// Save tasks to local storage whenever tasks state changes
useEffect(() => {
  if (tasks.length > 0) {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
  }
}, [tasks]);


const handleShowTasks = async () => {
    try {
      const taskList = await getTasks(); // Fetch tasks from the API
      setTasks(taskList.slice(0, taskLimit)); // Set the tasks in the state
      setShowTasks(!showTasks); // Show the tasks after they are fetched
    } catch (error) {
      console.error('Error fetching tasks:', error); // Handle errors
    }
  }; 

   // Fetch tasks from the API (only once if not available in local storage)
   const fetchInitialTasks = async () => {
    try {
      const taskList = await getTasks();
      setTasks(taskList.slice(0, taskLimit)); // Optionally, limit to 10 tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
   // Function to handle adding a new task to the list
   const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]); // Add the new task to the top of the task list
  };

   // Function to handle updating a task in the list
   const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))); // Update the task in the local state
    setEditingTask(null); // Reset editing mode
  };
  
  return <>
<main className="flex flex-col gap-5 justify-center items-center mb-10">
<div className="flex flex-row gap-5 mt-5" >
<button onClick={handleShowTasks} className="bg-blue-950 text-white rounded-sm p-5">Show Tasks</button>
<button className="bg-blue-950 text-white rounded-sm p-5"><AddTaskForm onTaskAdded={handleTaskAdded}/> </button>
</div>
{tasks.length > 0 ? (
        <ul className="flex flex-row gap-3 flex-wrap justify-center items-center">
          {/* {tasks.map(task => (
            <li key={task.id} className="bg-blue-300 mt-5 p-5 w-60 flex flex-row h-80 ml-5 mr-5 rounded-xl">
              {task.title} - {task.completed ? 'Completed' : 'Incomplete'}
            </li>
          ))} */}
          {tasks.map(task => (
            <li key={task.id} className="bg-slate-400 mt-5 p-5 w-60 gap-5 h-80 ml-5 mr-5 rounded-xl">
              {/* Show either the edit form or the task details */}
              {editingTask && editingTask.id === task.id ? (
                <EditTaskForm
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onCancel={() => setEditingTask(null)}
                />
              ) : (
                <div className="flex flex-col gap-5">
                  <h1 className="font-extrabold text-2xl">Task Details</h1>
                  <h3 className="font-semibold">Task : <span className="font-medium">{task.title}</span></h3> <br/> 
                  <h3 className="font-semibold">Status : <span className="bg-green-600 text-white p-3 rounded">{task.completed ? 'Completed' : 'Incomplete'}</span></h3>
                  <button onClick={() => setEditingTask(task)} className="bg-blue-900 text-white p-3 rounded-xl">Edit Task</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
      </main>
  </>;
}
