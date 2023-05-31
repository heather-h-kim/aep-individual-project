import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { updateUser, updateUserProfile } from '../services/userApi';
import Avatar from './Avatar';
import { SketchPicker } from 'react-color';
import { UpdateUserModal } from './UpdateUserModal';
import useForm from '../hooks/useForm';

const Profile = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const [formData, setFormData] = useState({
    userId: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bgcolor: '',
    fgcolor: '',
  });

  const [showModal, setShowModal] = useState(false);

  const { errors, validate } = useForm();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  console.log('errors', errors);
  const { data, mutate } = useMutation({
    mutationFn: (body: updateUser) => updateUserProfile(body),
    onMutate: body => console.log('mutate', body),
    onError: (error, variables, context) =>
      console.log('Something went wrong...', error, variables, context),
    onSuccess: data => {
      console.log('Success', data);
      updateGlobalUser(data);
    },
    onSettled: (data, error, variables, context) =>
      console.log('Complete', data),
  });

  //set initial formData state with globalUser
  useEffect(() => {
    if (
      globalUser.auth0token &&
      globalUser.userId &&
      globalUser.firstName &&
      globalUser.lastName &&
      globalUser.username &&
      globalUser.email &&
      globalUser.bgcolor &&
      globalUser.fgcolor
    ) {
      setFormData({
        auth0token: globalUser.auth0token,
        userId: globalUser.userId,
        firstName: globalUser.firstName,
        lastName: globalUser.lastName,
        username: globalUser.username,
        email: globalUser.email,
        bgcolor: globalUser.bgcolor,
        fgcolor: globalUser.fgcolor,
      });
    }
  }, [globalUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    validate(e, name, value);
    if (errors) {
      setButtonDisabled(true);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleOnClose = () => {
    setShowModal(!showModal);
    console.log('cancel clicked, formData is', formData);
    console.log('cancel clicked globalUser is', globalUser);

    // //reset the formData
    // if (
    //   globalUser.userId &&
    //   globalUser.firstName &&
    //   globalUser.lastName &&
    //   globalUser.username &&
    //   globalUser.email &&
    //   globalUser.bgcolor &&
    //   globalUser.fgcolor
    // ) {
    //   setFormData({
    //     userId: globalUser.userId,
    //     firstName: globalUser.firstName,
    //     lastName: globalUser.lastName,
    //     username: globalUser.username,
    //     email: globalUser.email,
    //     bgcolor: globalUser.bgcolor,
    //     fgcolor: globalUser.fgcolor,
    //   });
    //
    //   console.log('formData updated!', formData);
    // }
  };

  const handleOnUpdate = () => {
    console.log('update clicked', formData);
    delete formData.email;
    console.log('new formData', formData);

    mutate(formData);

    setShowModal(!showModal);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submit button is clicked');

    //triggers the confirmation modal
    setShowModal(!showModal);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && globalUser.userId) {
    // console.log('formData is', formData);
    console.log('globalUser is', globalUser);
    return (
      <div>
        <h2>User Profile</h2>
        <Avatar />
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid gap-6 md:grid-cols-1">
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                  // defaultValue={formData.firstName}
                  // value={firstName}
                  // onChange={setFirstName}
                  // onBlur={setFirstNameBlur}
                />
              </label>
              {errors.firstName && <h3>{errors.firstName}</h3>}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name:
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  defaultValue={formData.lastName}
                  onChange={handleChange}
                  // defaultValue={lastName}
                  // onChange={setLastName}
                  // onBlur={setLastNameBlur}
                />
              </label>
              {errors.lastName && <h3>{errors.lastName}</h3>}
            </div>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Username:
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  defaultValue={formData.username}
                  onChange={handleChange}
                  // defaultValue={userName}
                  // onChange={setUserName}
                  // onBlur={setUserNameBlur}
                />
              </label>
              {errors.userName && <h3>{errors.userName}</h3>}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  disabled="disabled"
                  readOnly
                  onBlur={() => console.log('email cannot be updated')}
                  defaultValue={formData.email}
                  // defaultValue={email}
                  // onChange={setEmail}
                />
              </label>
            </div>
          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar background color:
              <SketchPicker
                // color={bgcolor}
                color={formData.bgcolor}
                // onChangeComplete={color => setBgcolor(color.hex)}
                onChangeComplete={color =>
                  setFormData({ ...formData, bgcolor: color.hex })
                }
              />
            </label>

            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar font color:
              <SketchPicker
                // color={fgcolor}
                color={formData.fgcolor}
                onChangeComplete={
                  color => setFormData({ ...formData, fgcolor: color.hex })
                  // setFgcolor(color.hex)
                }
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={buttonDisabled}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
        <UpdateUserModal
          visible={showModal}
          onClose={handleOnClose}
          onUpdate={handleOnUpdate}
        />
      </div>
    );
  }
};

export default Profile;
