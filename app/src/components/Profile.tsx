import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.email}</h2>
        <p>{JSON.stringify(user)}</p>
      </div>
    );
  }
};

export default Profile;
