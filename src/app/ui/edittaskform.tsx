import { useState, useEffect } from 'react';
import { updateTask } from '@/services/api';// Import the Task interface
import { Task } from '@/types/tasks';

interface EditTaskFormProps {
  task: Task; // The task being edited
  onTaskUpdated: (updatedTask: Task) => void; // Function to handle the updated task
  onCancel: () => void; // Function to handle canceling the edit
}

export default function EditTaskForm({ task, onTaskUpdated, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title); // State to manage task title
  const [completed, setCompleted] = useState(task.completed); // State to manage task completion status
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission

  // Function to handle updating the task
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission
    setIsSubmitting(true); // Set form to submitting state

    try {
      const updatedTask = await updateTask(task.id, { title, completed });
      onTaskUpdated(updatedTask); // Notify parent of updated task
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsSubmitting(false); // Reset form submitting state
    }
  };

  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
      <h3 className='font-bold '>Edit Task</h3>
      <form onSubmit={handleUpdateTask}>
        {/* Input for editing task title */}
        <div className='mb-3'>
          <label className='font-semibold'>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className='rounded border-black p-3'
          />
        </div>

        {/* Checkbox for editing task completion status */}
        <div>
          <label className='font-semibold flex flex-row gap-2 items-center mb-5 '>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={isSubmitting}
              className='size-5'
            />
            Completed
          </label>
        </div>

        {/* Submit and Cancel buttons */}
        <div className='flex flex-row gap-3'>
          <button type="submit" disabled={isSubmitting} className='bg-blue-900 text-white p-3 rounded-sm '>
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className='bg-red-900 text-white p-3 rounded-sm '>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
