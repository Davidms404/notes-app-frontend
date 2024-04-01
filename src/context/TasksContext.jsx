import api from '../services/axiosConfig';
import { createContext, useContext, useState, useEffect } from 'react';

export const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) throw new Error('There is no tasks provider, you are probably trying to access a foreign context');

  return context;
}

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  const updateTasks = async () => {
    try {
      const response = await api.get(`/tasks/${localStorage.getItem('user')}`);
      const taskList = response.data;
      setTasks(taskList);
    } catch (error) {
      console.log('Error al cargar la lista de tareas: ', error);
    }
  };

  useEffect(() => {

    updateTasks();
  }, []);

  const createTask = async (newTask) => {
    try {
      await api.post('/tasks/add', newTask);
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
    } catch (error) {
      console.log('Error al crear la tarea: ', error);
    }
  }

  const editTask = async (id, newTitle) => {
    try {
      await api.put(`/tasks/${localStorage.getItem('user')}/edit/${id}`, { title: newTitle });
      await updateTasks();
    } catch (error) {
      console.log('Error al editar la tarea: ', error);
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${localStorage.getItem('user')}/delete/${id}`);
      await updateTasks();
    } catch (error) {
      console.log('Error al eliminar la tarea: ', error);
    }
  }

  const completeTask = async (id, isCompleted) => {
    try {
      await api.put(`/tasks/${localStorage.getItem('user')}/edit/${id}`, { done: !isCompleted });
      await updateTasks();
    } catch (error) {
      console.log('Error al completar la tarea: ', error);  
    }
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, editTask, deleteTask, completeTask }}>
      {children}
    </TasksContext.Provider>
  );
}