import { useState } from 'react';
import { addTask } from '@/services/api'; // Import your API function
import { Task } from '@/types/tasks'; // Import the Task interface

interface AddTaskFormProps {
  onTaskAdded: (newTask: Task) => void; // Function to handle adding a new task to the list
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState(''); // State to hold the new task title
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission

  // Function to handle adding a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (!title.trim()) return; // Prevent adding empty tasks

    setIsSubmitting(true); // Set form to submitting state
    try {
      const newTask = await addTask({ title, completed: false }); // Call the API to add a new task
      onTaskAdded(newTask); // Pass the new task to the parent component
      setTitle(''); // Clear the form after submission
    } catch (error) {
      console.error('Error adding task:', error); // Handle errors
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form onSubmit={handleAddTask} className='flex flex-col gap-3 text-black'>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task title"
        disabled={isSubmitting}
      />
      <select>
        <option>Not Completed</option>
        <option>Completed</option>
      </select>
      <button type="submit" disabled={isSubmitting} className='bg-white p-2'>
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
