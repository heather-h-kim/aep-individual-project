import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { updateUser, updateUserProfile } from '../services/userApi';
import Avatar from './Avatar';
import { SketchPicker } from 'react-color';
import { UpdateUserModal } from './UpdateUserModal';
import useFormError from '../hooks/useFormError';
import { useColorsStore } from '../store/colorStore';

const Profile = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const {
    themeBgColor,
    preview,
    updateThemeBgColor,
    updateThemeFgColor,
    updatePreviewState,
  } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
    updateThemeBgColor: state.updateBgcolor,
    updateThemeFgColor: state.updateFgcolor,
    updatePreviewState: state.updatePreview,
  }));
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };

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
  const { errors, validate } = useFormError();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (body: updateUser) => updateUserProfile(body),
    onMutate: body => {
      console.log('mutate', body);
      setIsUpdating(true);
      console.log(isUpdating);
    },
    onSuccess: data => {
      console.log('Success', data);
      updateGlobalUser(data);
      updatePreviewState(false);
      setButtonDisabled(false);
      setIsUpdating(false);
    },
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
      setIsUpdating(false);
      updatePreviewState(false);
    },
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

    //input validation
    validate(e, name, value);
    console.log('error', errors);
    if (
      errors.firstName !== '' ||
      errors.lastName !== '' ||
      errors.userName !== ''
    ) {
      //disable the update button if there's any error
      setButtonDisabled(true);
      console.log(buttonDisabled);
    } else if (
      errors.firstName === '' &&
      errors.lastName === '' &&
      errors.userName === ''
    ) {
      //un-disable the button if there's no error
      setButtonDisabled(false);
      console.log(buttonDisabled);
    }

    setFormData({ ...formData, [name]: value });
  };

  const onChangeCompleteBgColor = color => {
    setFormData({ ...formData, bgcolor: color.hex });
    console.log('selected bgcolor is', color.hex);
    updateThemeBgColor(color.hex);
    updatePreviewState(true);
  };

  const onChangeCompleteFgColor = color => {
    setFormData({ ...formData, fgcolor: color.hex });
    console.log('selected fgcolor is', color.hex);
    updateThemeFgColor(color.hex);
    updatePreviewState(true);
  };

  //close the modal when cancel option is clicked
  const handleOnClose = () => {
    setShowModal(!showModal);
    console.log('cancel clicked, formData is', formData);
    console.log('cancel clicked globalUser is', globalUser);
    updatePreviewState(false);

    //reset the formData
    if (
      globalUser.userId &&
      globalUser.firstName &&
      globalUser.lastName &&
      globalUser.username &&
      globalUser.email &&
      globalUser.bgcolor &&
      globalUser.fgcolor
    ) {
      setFormData({
        userId: globalUser.userId,
        firstName: globalUser.firstName,
        lastName: globalUser.lastName,
        username: globalUser.username,
        email: globalUser.email,
        bgcolor: globalUser.bgcolor,
        fgcolor: globalUser.fgcolor,
      });

      console.log('formData updated!', formData);
    }
  };

  //update the user profile when update option in the modal is clicked
  const handleOnUpdate = () => {
    console.log('update clicked', formData);
    //Don't send email to the backend as it should not be updated
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (isAuthenticated && globalUser.userId) {
    console.log('selected bgcolor is', formData.bgcolor);
    console.log('new theme bgcolor', themeBgColor);
    console.log('preview is', preview);
    return (
      <div style={style} className="my-10 p-5">
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
                  // required
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
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
                  value={formData.username}
                  onChange={handleChange}
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
                  defaultValue={formData.email}
                />
              </label>
            </div>
          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar background color:
              <SketchPicker
                color={formData.bgcolor}
                onChangeComplete={onChangeCompleteBgColor}
              />
            </label>

            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Avatar font color:
              <SketchPicker
                color={formData.fgcolor}
                onChangeComplete={onChangeCompleteFgColor}
              />
            </label>
          </div>
          {isUpdating ? (
            <button
              disabled
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="mr-3 inline h-4 w-4 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Updating...
            </button>
          ) : (
            <button
              type="submit"
              disabled={buttonDisabled}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Update Profile
            </button>
          )}
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
