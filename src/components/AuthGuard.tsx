import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../pages/authentication/Login';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const usuario = localStorage.getItem("usuario");
  if (!usuario) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Login />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
