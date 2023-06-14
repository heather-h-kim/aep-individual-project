import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <button
          className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-white"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </div>
    );
  }
};

export default LoginButton;
