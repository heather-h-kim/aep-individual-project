import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserStore } from '../store/userStore';
import LoadingSpinner from './LoadingSpinner';

const PublicHome = () => {
  const { isAuthenticated } = useAuth0();
  const globalUser = useUserStore(state => state.user);

  if (isAuthenticated && !globalUser.userId) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="my-10 flex h-screen flex-col items-center justify-center bg-cyan-50">
      <h1 className=" pb-8 text-6xl font-bold">
        Welcome to Number Memory Game!
      </h1>
      <h2 className=" text-4xl">Click demo button to play demo game</h2>
    </div>
  );
};
export default PublicHome;
