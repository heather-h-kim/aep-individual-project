import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../services/userApi';
import { useUserStore } from '../store/userStore';

const useFormError = () => {
  const globalUser = useUserStore(state => state.user);
  interface errors {
    firstName: string;
    lastName: string;
    userName: string;
  }
  const [errors, setErrors] = useState<errors>({
    firstName: '',
    lastName: '',
    userName: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);

  useQuery({
    queryKey: ['Users'],
    queryFn: getAllUsers,
    onSuccess: data => {
      console.log('users', data);
      const usernameArr = data.map(user => user.username.toUpperCase().trim());
      const emailArr = data.map(user => user.email.toUpperCase().trim());
      setUsernames(usernameArr);
      setEmails(emailArr);
    },
    onError: error => {
      console.log('Error while fetching users', error);
    },
  });

  const validate = (event: Event, name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            firstName: 'First name cannot be empty',
          });
          setButtonDisabled(true);
        } else if (value.trim().length > 12) {
          setErrors({
            ...errors,
            firstName: 'First name cannot be longer than 12 characters',
          });
          setButtonDisabled(true);
        } else {
          setErrors({ ...errors, firstName: '' });
          setButtonDisabled(false);
        }
        break;
      case 'lastName':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            lastName: 'Last name cannot be empty',
          });
          setButtonDisabled(true);
        } else if (value.trim().length > 12) {
          setErrors({
            ...errors,
            lastName: 'Last name cannot be longer than 12 characters',
          });
          setButtonDisabled(true);
        } else {
          setErrors({ ...errors, lastName: '' });
          setButtonDisabled(false);
        }
        break;
      case 'username':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            userName: 'Username cannot be empty',
          });
          setButtonDisabled(true);
        } else if (value.trim().length > 10) {
          setErrors({
            ...errors,
            userName: 'Username cannot be longer than 10 characters',
          });
          setButtonDisabled(true);
        } else if (
          usernames.includes(value.toUpperCase().trim()) &&
          globalUser.username !== value
        ) {
          setErrors({
            ...errors,
            userName: 'Username is already taken',
          });
          setButtonDisabled(true);
        } else {
          setErrors({ ...errors, userName: '' });
          setButtonDisabled(false);
        }
        break;
      default:
        break;
    }
  };

  return {
    buttonDisabled,
    setButtonDisabled,
    errors,
    validate,
  };
};

export default useFormError;
