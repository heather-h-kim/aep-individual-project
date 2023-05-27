import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from '../services/userApi';
import Avatar from './Avatar';
import { SketchPicker } from 'react-color';

const Profile = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const [bgcolor, setBgcolor] = useState('#E5F2FC');
  const [fgcolor, setFgcolor] = useState('#000000');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    // bgcolor: '',
    // fgcolor: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && globalUser.userId) {
    console.log(formData);
    console.log(bgcolor);
    return (
      <div>
        <h2>User Profile</h2>
        <Avatar />
        {/*<ul>*/}
        {/*  <li>Username: {globalUser.username} </li>*/}
        {/*  <li>First name: {globalUser.firstName} </li>*/}
        {/*  <li>Last name: {globalUser.lastName}</li>*/}
        {/*  <li>Email: {globalUser.email}</li>*/}
        {/*</ul>*/}

        <form>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                First name:
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder={globalUser.firstName}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name:
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={globalUser.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Username:
              <input
                type="text"
                id="username"
                name="username"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={globalUser.username}
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email:
              <input
                type="text"
                id="email"
                name="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={globalUser.email}
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar background color:
              <SketchPicker
                color={bgcolor}
                onChangeComplete={color => setBgcolor(color.hex)}
              />
            </label>

            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar font color:
              <SketchPicker
                color={fgcolor}
                onChangeComplete={color => setFgcolor(color.hex)}
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
};

export default Profile;
