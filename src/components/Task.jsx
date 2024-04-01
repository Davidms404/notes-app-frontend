import '../css/Task.css';
import Swal from 'sweetalert2';
import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaEdit } from 'react-icons/fa';

function Task({ id, title, isCompleted, completeTask, deleteTask, editTask}) {
  const handleEdit = () => {
    Swal.fire({
      title: 'Escribe el nuevo nombre',
      input: 'text',
      inputPlaceholder: 'Nombre',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const newName = result.value;
        editTask(id, newName);
      } 
    });
  }

  return (  
    <div className={`task-container ${isCompleted? 'task-completed' : 'pending-task'}`}>
      <div className='task' onClick={() => {completeTask(id, isCompleted)}}>
        {title}
      </div>

      <div className='icons'>
        <div className='icon-container' onClick={handleEdit}>
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