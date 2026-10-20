import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Basics', dueDate: '2026-10-25' },
    { id: 2, title: 'Build GT13 React Client', dueDate: '2026-10-28' },
    { id: 3, title: 'Connect to Render Backend', dueDate: '2026-11-01' },
  ]);

  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      dueDate: new Date().toISOString().split('T')[0],
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;