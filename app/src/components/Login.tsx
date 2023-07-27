import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <button
          className="inline-block rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </div>
    );
  }
};

export default LoginButton;
