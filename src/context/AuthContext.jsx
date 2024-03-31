import api from '../services/axiosConfig';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
      const response = await api.post('/auth/signup', data);
      const { token } = response.data;
      
      console.log('token: ', token);
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
      const { token, name } = response.data;

      console.log('Sesión iniciada exitosamente, este es el token: ', token);
      localStorage.setItem('token', token);

      message.fire({
        position: 'center',
        icon: 'success',
        title: `Bienvenido, ${ name }!`,
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

  return (
    <AuthContext.Provider value={{ token, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}