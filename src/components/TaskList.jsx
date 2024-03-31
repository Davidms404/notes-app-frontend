import '../css/Tasklist.css';
import Input from './Input.jsx';
import Task from './Task.jsx';
import { useTasks } from '../context/TasksContext';
import React from 'react';

function TaskList() {
  const { tasks, editTask, deleteTask, completeTask } = useTasks();
  
  const taskList = tasks.map((task) => 
    <Task 
      id={task._id}
      title={task.title}
      isCompleted={task.done}
      completeTask={completeTask}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  );

  return (
    <div className='task-list'>
      <Input />

      {taskList}
    </div>
  );
}

export default TaskList;