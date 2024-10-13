Task Management App
This is a simple task management application built using Next.js and TypeScript. Users can view, add, edit, and delete tasks. The app integrates with the JSONPlaceholder API and uses localStorage to persist tasks across page reloads.

Features
View a list of tasks.
Add new tasks with a title and completion status.
Edit existing tasks (update title and status).
Delete tasks.
Persist tasks using localStorage.
Toggle visibility of tasks using a "Show/Hide Tasks" button.
Technologies Used
Next.js: React-based framework for server-side rendering.
TypeScript: For type safety and better code quality.
JSONPlaceholder API: Mock API for task data.
React Hooks: Used for state and side effects (useState, useEffect).
localStorage: To save tasks across reloads.
Installation and Setup
Follow these steps to run the project on your local machine:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd task-management-app
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash
Copy code
npm run dev
Open the Application in Your Browser: Go to http://localhost:3000 in your browser.

Folder Structure
bash
Copy code
/task-management-app
│
├── /components
│   ├── AddTaskForm.tsx      # Component for adding tasks
│   ├── EditTaskForm.tsx     # Component for editing tasks
│   └── TaskList.tsx         # Main task management logic
│
├── /services
│   └── api.ts               # API functions to fetch tasks
│
├── /types
│   └── task.ts              # TypeScript interface for Task objects
│
├── /pages
│   ├── index.tsx            # Entry point of the app
│
├── public/
│
└── README.md                # Documentation
JSONPlaceholder API Endpoints Used
GET /todos: Retrieve tasks
Example: https://jsonplaceholder.typicode.com/todos
POST /todos: Add new task (mock response)
PUT /todos/
: Update task (mock response)
DELETE /todos/
: Delete task (mock response)
Usage
Add a Task:

Use the input form to add a new task.
Specify the title and whether the task is completed or not.
The task will appear in the task list and persist in localStorage.
View Tasks:

Click the "Show Tasks" button to reveal all available tasks (limited to 10).
Click "Hide Tasks" to hide the list.
Edit a Task:

Click the "Update Task" button next to a task to open the edit form.
Modify the title or status and save the changes.
Delete a Task:

Use the "Delete Task" button to remove a task from the list.
Changes will be reflected in localStorage as well.
Code Snippets
API Service Example (/services/api.ts):

ts
Copy code
export const getTasks = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return response.json();
};
Handling Local Storage Example (TaskList.tsx):

ts
Copy code
useEffect(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  } else {
    fetchInitialTasks();
  }
}, []);
Clean Code Practices
Modular Components: Each component handles a single responsibility.
TypeScript Interfaces: Defined types for tasks to ensure type safety.
Error Handling: Catch blocks for API calls.
State Management: Controlled with React hooks.
Testing (Optional)
If you want to test components:

Install Jest or React Testing Library:

bash
Copy code
npm install @testing-library/react jest --save-dev
Write tests for:

Adding a task.
Editing a task.
Deleting a task.
Known Issues & Limitations
JSONPlaceholder API only returns mock data (changes aren’t persisted on the API).
No pagination: Only the first 10 tasks are shown (can be extended).
Future Improvements
Add pagination to handle more tasks efficiently.
Implement better styling using CSS frameworks like Tailwind or Bootstrap.
Add form validation with more detailed error handling.
Contributing
Fork the repository.
Create a new branch:
bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and commit:
bash
Copy code
git commit -m "Add your message"
Push the changes:
bash
Copy code
git push origin feature/your-feature-name
Open a pull request.
License
This project is licensed under the MIT License.

Contact
For any inquiries or suggestions, feel free to reach out!
Author: Daniel Ifeoluwa Obisanya