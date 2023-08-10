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
import LoadingSpinner from './LoadingSpinner';

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

  interface data {
    userId: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    bgcolor: string | undefined;
    fgcolor: string | undefined;
  }

  const [formData, setFormData] = useState<data>({
    userId: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bgcolor: '',
    fgcolor: '',
  });

  const [showModal, setShowModal] = useState(false);
  const { errors, validate, buttonDisabled, setButtonDisabled } =
    useFormError();
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (body: updateUser) => updateUserProfile(body),
    onMutate: body => {
      console.log('mutate', body);
      setIsUpdating(true);
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
    setFormData({
      userId: globalUser.userId,
      firstName: globalUser.firstName,
      lastName: globalUser.lastName,
      username: globalUser.username,
      email: globalUser.email,
      bgcolor: globalUser.bgcolor,
      fgcolor: globalUser.fgcolor,
    });
  }, [globalUser]);

  const handleChange = e => {
    const { name, value } = e.target;

    //input validation
    validate(e, name, value);
    setFormData({ ...formData, [name]: value });
  };

  const onChangeCompleteBgColor = color => {
    setFormData({ ...formData, bgcolor: color.hex });
    updateThemeBgColor(color.hex);
    updatePreviewState(true);
  };

  const onChangeCompleteFgColor = color => {
    setFormData({ ...formData, fgcolor: color.hex });
    updateThemeFgColor(color.hex);
    updatePreviewState(true);
  };

  //close the modal when cancel option is clicked
  const handleOnClose = () => {
    setShowModal(!showModal);
    updatePreviewState(false);

    //reset the formData
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
  };

  //update the user profile when update option in the modal is clicked
  const handleOnUpdate = () => {
    //Don't send email to the backend as it should not be updated
    delete formData.email;
    mutate(formData);
    setShowModal(!showModal);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //triggers the confirmation modal
    setShowModal(!showModal);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (isAuthenticated && globalUser.userId) {
    return (
      <div
        style={style}
        className="my-10 flex flex-col items-center justify-center px-40 py-10"
      >
        <Avatar />
        <form className="mt-4 flex w-full flex-col" onSubmit={handleSubmit}>
          <div className="mr-4 mt-4 flex items-center">
            <div className="w-1/5">
              <label
                htmlFor="firstName"
                className="text-md flex justify-center font-bold text-black"
              >
                First name:
              </label>
            </div>
            <div className="w-4/5">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.firstName && (
            <div className="mr-4  flex items-center">
              <div className="w-1/5"></div>
              <span className="w-4/5 text-red-900">{errors.firstName}</span>
            </div>
          )}
          {globalUser.firstName === 'first name' && (
            <div className="mr-4  flex items-center">
              <div className="w-1/5"></div>
              <span className="w-4/5 text-red-900">
                Please update your first name
              </span>
            </div>
          )}
          <div className="mr-4 mt-4 flex items-center">
            <div className="w-1/5">
              <label
                htmlFor="lastName"
                className="text-md flex justify-center font-bold text-black"
              >
                Last name:
              </label>
            </div>
            <div className="w-4/5">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.lastName && (
            <div className="mr-4  flex items-center">
              <div className="w-1/5"></div>
              <span className="w-4/5 text-red-900">{errors.lastName}</span>
            </div>
          )}
          {globalUser.lastName === 'last name' && (
            <div className="mr-4  flex items-center">
              <div className="w-1/5"></div>
              <span className="w-4/5 text-red-900">
                Please update your last name
              </span>
            </div>
          )}
          <div className="mr-4 mt-4 flex items-center">
            <div className="w-1/5">
              <label
                htmlFor="username"
                className="text-md flex justify-center font-bold text-black"
              >
                Username:
              </label>
            </div>
            <div className="w-4/5">
              <input
                type="text"
                id="username"
                name="username"
                className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.userName && (
            <div className="mr-4  flex items-center">
              <div className="w-1/5"></div>
              <span className="w-4/5 text-red-900">{errors.userName}</span>
            </div>
          )}
          <div className="mr-4 mt-4  flex items-center">
            <div className="w-1/5">
              <label
                htmlFor="email"
                className="text-md flex justify-center font-bold text-black"
              >
                Email:
              </label>
            </div>
            <div className="w-4/5">
              <input
                type="email"
                id="email"
                name="email"
                className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500"
                disabled
                defaultValue={formData.email}
              />
            </div>
          </div>
          <div className="mr-4  flex items-center">
            <div className="w-1/5"></div>
            <span className="w-4/5 text-sky-900">*Email cannot be changed</span>
          </div>

          <div className="mb-6 mt-6 flex flex-row justify-around">
            <div className="flex flex-col">
              <label className="text-md mb-2 block font-bold text-black">
                Avatar Background Color:
              </label>
              <SketchPicker
                color={formData.bgcolor}
                onChangeComplete={onChangeCompleteBgColor}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md mb-2 block font-bold text-black">
                Avatar font color:
              </label>
              <SketchPicker
                color={formData.fgcolor}
                onChangeComplete={onChangeCompleteFgColor}
              />
            </div>
          </div>

          {isUpdating ? (
            <div className="flex justify-center">
              <button
                disabled
                type="button"
                className="mt-6 flex w-1/4 items-center justify-center rounded bg-neutral-700 px-4 py-2 font-bold text-white hover:bg-neutral-800"
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
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={buttonDisabled}
                className="mt-6 flex w-1/4 items-center justify-center rounded bg-neutral-700 px-4 py-2 font-bold text-white hover:bg-neutral-800"
              >
                Update Profile
              </button>
            </div>
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
