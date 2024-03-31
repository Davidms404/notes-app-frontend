import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';

function Input() {
  const { createTask } = useTasks();
  const { register, handleSubmit } = useForm();

  const handleRegister = ({ title }) => {
    if (title.trim()) {
      title = title.trim();

      const newTask = {
        title
      };

      createTask(newTask);  
    }else {
      console.log('La tarea debe tener un título asignado');
    }
  }

  return (  
    <form className='task-form' onSubmit={handleSubmit(handleRegister)}>

      <input type='text' placeholder='Nombre de la tarea' {...register('title')} />

      <button className='input-button'>Agregar tarea</button>
    </form>
  );
}

export default Input;