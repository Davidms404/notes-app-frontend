import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/signin' replace={true} />;
  }

  return children;
}

export default PrivateRoute;