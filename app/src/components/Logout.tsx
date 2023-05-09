import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <button onClick={() => logout()}>Log Out</button>;
  }
};

export default LogoutButton;
