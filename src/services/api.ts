const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTasks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addTask = async (task: { title: string; completed: boolean }) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: number, task: { title: string; completed: boolean }) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
