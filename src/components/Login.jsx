import Logo from '../img/logo.jpg';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const userData = {
      email,
      password
    };

    await signIn(userData);
    navigate('/notes-app');
  }

  return (
    <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='row border rounded-5 p-3 bg-white shadow box-area'>
          <div className='logo-presentation col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box'>
            <div className='logo-container mb-3'>
              <img src={Logo} alt='logo' className='logo img-fluid' />
            </div>

            <p className='logo-text text-white fs-2'>Inicia sesión</p>
            <small className='text-white text-wrap text-center'>Crea y gestiona tu lista de tareas.</small>
          </div>

          <div className='inputs-box col-md-6 right-box'>
            <div className='row align-items-center'>
              <div className='header-text mb-4'>
                <h2>Notes app</h2>
                <p>Es bueno verte de nuevo!</p>
              </div>

              <div className='input-group mb-3'>
                <input type='text' className='form-control form-control-lg bg-light fs-6' placeholder='Correo electrónico' {...register('email')} />
              </div>

              <div className='input-group mb-3'>
                <input type='password' className='form-control form-control-lg bg-light fs-6' placeholder='Contraseña' {...register('password')} />
              </div>

              <div className='input-group mb-3 mt-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>Iniciar sesión</button>
              </div>

              <div className='row text-center'>
                <small>No tienes una cuenta? <Link to={'/signup'}>Regístrate</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;