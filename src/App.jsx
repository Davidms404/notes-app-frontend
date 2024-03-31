import '../src/css/App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TaskList from './components/TaskList.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/signin' element={ <Login /> } />
            <Route path='/signup' element={ <Register /> } />
            <Route path='/notes-app' element={ <TaskList /> } />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  )
}

export default App;