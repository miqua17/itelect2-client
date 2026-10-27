import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) throw new Error('Failed to load tasks from server.');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>

      <LoginForm token={token} onLogin={(newToken) => setToken(newToken)} />
      <TaskForm token={token} onTaskAdded={fetchTasks} />

      <h2>Task List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
      {!loading && !error && tasks.length === 0 && <p>No tasks found.</p>}
      {!loading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;