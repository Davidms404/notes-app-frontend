import api from '../services/axiosConfig';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error ('There is no auth provider, you are probably trying to access a foreign context');

  return context;
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const message = withReactContent(Swal);

  const signUp = async(data) => {
    try {
      await api.post('/auth/signup', data);

      message.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuenta creada exitosamente!',
        showConfirmButton: false,
        timer: 2000
      });     
      
    } catch (error) {
      const response = JSON.parse(error.request.response);

      message.fire({
        position: 'center',
        icon: 'error',
        title: response.error,
        showConfirmButton: false,
        timer: 2000
      });    
    }
  }

  const signIn = async (data) => {
    try {
      const response = await api.post('/auth/signin', data);
      const { token, _id, name } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', _id);

      message.fire({
        position: 'center',
        icon: 'success',
        title: `Welcome, ${ name }!`,
        showConfirmButton: false,
        timer: 2000
      });    

      setToken(token);  
    } catch (error) {
      const response = JSON.parse(error.request.response);

      message.fire({
        position: 'center',
        icon: 'error',
        title: response.error,
        showConfirmButton: false,
        timer: 2000
      });    
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      message.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesión cerrada exitosamente',
        showConfirmButton: false,
        timer: 2000
      });

      setToken(null);
    } catch (error) {
      console.log('Error al intentar cerrar sesión: ', error);
    }
  }

  return (
    <AuthContext.Provider value={{ token, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}