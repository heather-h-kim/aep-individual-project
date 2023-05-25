import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from '../services/userApi';

const Profile = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);

  console.log(globalUser.email);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <h2>User Info</h2>
        <ul>
          <li>Username: {globalUser.username} </li>
          <li>First name: {globalUser.firstName} </li>
          <li>Last name: {globalUser.lastName}</li>
          <li>Background color: {globalUser.bgcolor}</li>
          <li>Foreground color: {globalUser.fgcolor}</li>
        </ul>
      </div>
    );
  }
};

export default Profile;
