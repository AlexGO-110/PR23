import React, { useRef, useState, useEffect } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const inputRef = useRef(null);
    const taskCountRef = useRef(0);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
            inputRef.current.focus();
            taskCountRef.current += 1;
        }
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((task, idx) => idx !== index);
        setTasks(newTasks);
        taskCountRef.current -= 1;
    };

    const handleToggleTask = (index) => {
        const newTasks = tasks.map((task, idx) => idx === index ? { ...task, completed: !task.completed } : task);
        setTasks(newTasks);
    };

    const handleEditTask = (index, newText) => {
        const newTasks = tasks.map((task, idx) => idx === index ? { ...task, text: newText } : task);
        setTasks(newTasks);
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Новая задача"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <h2>Total Tasks: {taskCountRef.current}</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            value={task.text}
                            onChange={(e) => handleEditTask(index, e.target.value)}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        />
                        <button onClick={() => handleToggleTask(index)}>
                            {task.completed ? 'Unmark' : 'Mark'} as Completed
                        </button>
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
