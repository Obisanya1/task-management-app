"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/tasks";
import { getTasks, addTask, updateTask, deleteTask } from "@/services/api";

export default function TaskList() {
const [tasks, setTasks] = useState<Task[]>([]);

  useEffect (() => {
    async function fetchTasks() {
      const tasks = await getTasks();
      setTasks(tasks);
    }
    fetchTasks();
    console.log(tasks);
  })

  return <>
<h2> All Tasks</h2>
{tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="bg-blue-100 mt-5 flex p-5 w-fit">
              {task.title} - {task.completed ? 'Completed' : 'Incomplete'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
  </>;
}
