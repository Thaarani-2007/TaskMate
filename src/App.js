
import './App.css';
import { Header } from './components/Header';
import { AddTask } from './components/AddTask';
import { ShowTask } from './components/ShowTask';
import { Footer } from './components/Footer';
import { useState,useEffect } from 'react'
function App() { 
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <AddTask tasks={task} setTasks={setTask} />
        <ShowTask tasks = {task} setTasks = {setTask} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
