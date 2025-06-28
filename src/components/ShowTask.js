import React from 'react';
import { Taskcard } from './Taskcard';
import { useState, useEffect } from 'react';
import './ShowTask.css'; // Don't forget to import the CSS

export const ShowTask = ({ tasks, setTasks }) => {
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditSubmit = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...updatedTask, id } : task));
  };

  const handleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    ));
  };

  const incompleteCount = tasks.filter(task => !task.status).length;

  return (
    <div className="task-container">
      <span className="count">Grind left: {incompleteCount} 🛠️</span>
      <ul>
        {tasks.map(task => (
          <Taskcard
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleEditSubmit={handleEditSubmit}
            handleComplete={handleComplete}
          />
        ))}
      </ul>
    </div>
  );
};