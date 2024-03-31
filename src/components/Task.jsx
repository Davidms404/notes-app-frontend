import '../css/Task.css';
import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaEdit } from 'react-icons/fa';

function Task({ id, title, isCompleted, completeTask, deleteTask, editTask}) {
  return (  
    <div className={`task-container ${isCompleted? 'task-completed' : 'pending-task'}`}>
      <div className='task' onClick={() => {completeTask(id)}}>
        {title}
      </div>

      <div className='icons'>
        <div className='icon-container' onClick={() => {editTask(id)}}>
          <FaEdit className='task-icon' />
        </div>
        
        <div className='icon-container' onClick={() => {deleteTask(id)}}>
          <TiDeleteOutline className='task-icon'/>
        </div>
      </div>
    </div>
  );
}

export default Task;