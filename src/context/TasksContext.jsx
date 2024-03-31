import api from '../services/axiosConfig';
import { createContext, useContext, useState } from 'react';

export const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) throw new Error ('There is no tasks provider, you are probably trying to access a foreign context');

  return context;
}

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = (newTask) => {
    
  }

  const editTask = () => {

  }

  const deleteTask = (id) => {

  }

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      
      return task;
    });
  }

  return (
    <TasksContext.Provider value={{ tasks, createTask, editTask, deleteTask, completeTask }}>
      {children}
    </TasksContext.Provider>
  );
}