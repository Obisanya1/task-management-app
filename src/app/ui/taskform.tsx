import { useState } from 'react';
import { addTask } from '@/services/api'; // Import your API function
import { Task } from '@/types/tasks'; // Import the Task interface

interface AddTaskFormProps {
  onTaskAdded: (newTask: Task) => void; // Function to handle adding a new task to the list
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState(''); // State to manage task title
  const [completed, setCompleted] = useState(false); // State to manage task completion status
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission

  // Function to handle adding a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (!title.trim()) return; // Prevent adding empty tasks

    setIsSubmitting(true); // Set form to submitting state
    try {
      const newTask = await addTask({ title, completed }); // Call the API to add a new task with title and completed status
      onTaskAdded(newTask); // Pass the new task to the parent component
      setTitle(''); // Clear the form after submission
      setCompleted(false); // Reset the completed checkbox
    } catch (error) {
      console.error('Error adding task:', error); // Handle errors
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };


  return (
    <form onSubmit={handleAddTask}>
      {/* Input for task title */}
      <h3 className='font-bold'>Add Task Here</h3>
      <div className='flex flex-row gap-3 items-center'>
        <label>Task Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task title"
          disabled={isSubmitting}
          className='text-black border-black p-2 rounded-sm'
        />
      </div>

      {/* Checkbox for task completion status */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={isSubmitting}
          />
          Completed
        </label>
      </div>

      {/* Submit button */}
      <button type="submit" disabled={isSubmitting} className='bg-white text-black p-2 font-semibold rounded-sm'>
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}