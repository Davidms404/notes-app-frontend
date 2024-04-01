import '../css/Tasklist.css';
import Input from './Input.jsx';
import Task from './Task.jsx';
import { useTasks } from '../context/TasksContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function TaskList() {
  const { logout } = useAuth();
  const { tasks, editTask, deleteTask, completeTask } = useTasks();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  }

  const taskList = tasks.map((task) =>
    <Task
      key={task._id}
      id={task._id}
      title={task.title}
      isCompleted={task.done}
      completeTask={completeTask}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  );

  return (
    <div className='notes-app-container'>
      <div className='task-list'>
        <button className='logout-btn btn btn-primary' onClick={handleLogout} >Cerrar sesión</button>
        <Input />
      
        {taskList}
      </div>
    </div>
  );
}

export default TaskList;