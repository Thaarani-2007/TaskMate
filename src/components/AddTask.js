import React, { useRef, useState } from 'react';
import './AddTask.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
export const AddTask = ({ tasks, setTasks }) => {
  const taskRef = useRef();
  const [progress, setProgress] = useState(false);
  const [deadline, setDeadline] =  useState(new Date());
  const [timeRequired, setTimeRequired] = useState({ hours: '', minutes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const taskName = taskRef.current.value.trim();
    if (!taskName) return; // 🧼 Avoid empty tasks
  
    const hrs = parseInt(timeRequired.hours) || 0;
    const mins = parseInt(timeRequired.minutes) || 0;
    const totalSeconds = hrs * 3600 + mins * 60;
  
    const task = {
      id: Math.floor(Math.random() * 1000),
      Name: taskName,
      completed: Boolean(progress),
      deadline: deadline,
      status:  progress,
      timeRequired: {
        hours: hrs.toString(),
        minutes: mins.toString(),
        secondsLeft: totalSeconds.toString(), // 🕒 for timer resume
      },
    };
    console.log(task);
    setTasks([...tasks, task]);
    handleReset();
    setTimeRequired({ hours: '', minutes: '' }); ;
    
  };

  const handleReset = () => {
    setProgress(false);
    taskRef.current.value = "";
    setDeadline(new Date()); ;
  };

  return (
    <section className="AddTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="taskname"
          name="taskname"
          placeholder="Task name"
          ref={taskRef}
        />
      <select
      className="status-dropdown"
      onChange={(e) => setProgress(e.target.value === "true")}
      value={progress}
      >
      <option value={false}>Pending</option>
      <option value={true}>Completed</option>
    </select>
        <DatePicker
  selected={new Date(deadline)}
  onChange={(date) => setDeadline(date)}
  showTimeSelect
  dateFormat="Pp"
  className="custom-date-input"
/>
<div className="time-required">
  <p>Time Required:</p>
  <div className="time-inputs">
    <div className="time-wrapper">
      <input
        type="text"
        inputMode="numeric"
        value={timeRequired.hours}
        onChange={(e) =>
          setTimeRequired({ ...timeRequired, hours: e.target.value })
        }
      />
      <span className="unit-label">hrs</span>
    </div>

    <div className="time-wrapper">
      <input
        type="text"
        inputMode="numeric"
        value={timeRequired.minutes}
        onChange={(e) =>
          setTimeRequired({ ...timeRequired, minutes: e.target.value })
        }
      />
      <span className="unit-label">mins</span>
    </div>
  </div>
</div>




        <button onClick ={handleSubmit}type="submit" className="submit">Add Task</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </section>
  );
};
