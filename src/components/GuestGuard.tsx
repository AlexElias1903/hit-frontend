import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    return <Navigate to="/dashboard" />;
  }


  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
