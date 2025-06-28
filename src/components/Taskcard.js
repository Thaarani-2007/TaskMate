import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faCheckCircle,
  faFloppyDisk,
  faPlay,
  faPause,
  faClock,
  faSave,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Taskcard.css';

export const Taskcard = ({ task, handleDelete, handleEditSubmit, handleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const initialTotalSeconds = task.timeRequired?.secondsLeft
  ? parseInt(task.timeRequired.secondsLeft)
  : parseInt(task.timeRequired?.hours || 0) * 3600 +
    parseInt(task.timeRequired?.minutes || 0) * 60;
    
    const [showTimer, setShowTimer] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(initialTotalSeconds);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }
    if (seconds <= 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveTimer = () => {
    const hrs = Math.floor(seconds / 3600).toString();
    const mins = Math.floor((seconds % 3600) / 60).toString();

    const updated = {
      ...task,
      timeRequired: {
        hours: hrs,
        minutes: mins,
        secondsLeft: seconds.toString(),
      },
    };
    handleEditSubmit(task.id, updated);
    setShowTimer(false);
    setIsRunning(false);
  };

  const handleCancelTimer = () => {
    setShowTimer(false);
    setIsRunning(false);
    setSeconds(initialTotalSeconds);
  };

  const handleSave = () => {
    handleEditSubmit(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <>
      <li className={`task-card ${task.status ? 'complete' : 'incomplete'}`}>
        <div className="task-header">
          <div className="task-icons">
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task.id)} className="icon delete-icon" />
            {isEditing ? (
              <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSave} className="icon save-icon" />
            ) : (
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsEditing(true)} className="icon edit-icon" />
            )}
            <FontAwesomeIcon
              icon={faCheckCircle}
              onClick={() => handleComplete(task.id)}
              className={`icon complete-icon ${task.status ? 'complete' : 'incomplete'}`}
            />
            {(task.timeRequired.hours > 0 || task.timeRequired.minutes > 0) && (
              <FontAwesomeIcon
                icon={faClock}
                onClick={() => {
                  setSeconds(initialTotalSeconds);
                  setShowTimer(true);
                }}
                className="icon timer-icon"
                title="Start Timer"
              />
            )}
          </div>
        </div>

        <div className="task-body">
          {isEditing ? (
            <>
              <input
                className="task-input"
                type="text"
                value={editedTask.Name}
                onChange={(e) => setEditedTask({ ...editedTask, Name: e.target.value })}
              />
              <select
                className="task-select"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value === 'true' })}
              >
                <option value={false}>Pending</option>
                <option value={true}>Completed</option>
              </select>
              <DatePicker
                selected={new Date(editedTask.deadline)}
                onChange={(date) => setEditedTask({ ...editedTask, deadline: date })}
                showTimeSelect
                dateFormat="Pp"
                className="custom-date-input"
              />
              <div className="time-inputs">
                <input
                  type="text"
                  value={editedTask.timeRequired.hours}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      timeRequired: { ...editedTask.timeRequired, hours: e.target.value },
                    })
                  }
                  placeholder="Hrs"
                />
                <input
                  type="text"
                  value={editedTask.timeRequired.minutes}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      timeRequired: { ...editedTask.timeRequired, minutes: e.target.value },
                    })
                  }
                  placeholder="Mins"
                />
              </div>
            </>
          ) : (
            <div className="task-details">
              <h3>{task.Name}</h3>
              <p>Status: {task.status ? '✅ Completed' : '⏳ Pending'}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
              <p>
                Time Required: {task.timeRequired.hours} hrs {task.timeRequired.minutes} mins
              </p>
            </div>
          )}
        </div>
      </li>

      {showTimer && (
        <div className="timer-overlay">
          <div className="timer-box">
            <h2>{formatTime()}</h2>
            <div className="timer-controls">
              <button onClick={() => setIsRunning(!isRunning)}>
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
              </button>
              <button onClick={handleSaveTimer}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button onClick={handleCancelTimer}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
