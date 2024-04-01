import '../css/Auth.css';
import Logo from '../img/logo.jpg';
import {  useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const { signUp } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleRegister = async ({name, email, password, confirmedPassword }) => {
    const userData = {
      name, 
      email,
      password,
      confirmedPassword
    };

    console.log("Objeto usuario: ", userData);

    await signUp(userData);
    navigate('/signin');
  };

  return (
    <form className='register-form' onSubmit={handleSubmit(handleRegister)}>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='row border rounded-5 p-3 bg-white shadow box-area'>
          <div className='logo-presentation col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box'>
            <div className='logo-container mb-3'>
              <img src={Logo} alt='logo' className='logo img-fluid' />
            </div>
            
            <p className='logo-text text-white fs-2'>Regístrate</p>
            <small className='text-white text-wrap text-center'>Crea y gestiona tu lista de tareas.</small>
          </div>

          <div className='inputs-box col-md-6 right-box'>
            <div className='row align-items-center'>
              <div className='header-text mb-4'>
                <h2>Notes app</h2>
                <p>Crea tu cuenta y empieza ya!</p>
              </div>

              <div className='input-group mb-3'>
                <input type='text' className='form-control form-control-lg bg-light fs-6' placeholder='Nombre' {...register('name')} />
              </div>

              <div className='input-group mb-3'>
                <input type='text' className='form-control form-control-lg bg-light fs-6' placeholder='Correo electrónico' {...register('email')} />
              </div>

              <div className='input-group mb-3'>
                <input type='password' className='form-control form-control-lg bg-light fs-6' placeholder='Contraseña' {...register('password')} />
              </div>
              
              <div className='input-group mb-3'>
                <input type='password' className='form-control form-control-lg bg-light fs-6' placeholder='Confirma la contraseña' {...register('confirmedPassword')} />
              </div>

              <div className='input-group mb-3 mt-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>Crear cuenta</button>
              </div>

              <div className='row text-center'>
                <small>Ya tienes una cuenta? <Link to={'/signin'}>Inicia sesión</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;