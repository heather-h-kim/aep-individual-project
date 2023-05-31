import React, { useState } from 'react';
import { omit } from 'lodash';

const useFormError = () => {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
  });

  const validate = (event: Event, name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            firstName: 'First name cannot be empty',
          });
        } else if (value.trim().length > 50) {
          setErrors({
            ...errors,
            firstName: 'First name cannot be longer than 50 characters',
          });
        } else {
          setErrors({ ...errors, firstName: '' });
        }
        break;
      case 'lastName':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            lastName: 'Last name cannot be empty',
          });
        } else {
          setErrors({ ...errors, lastName: '' });
        }
        break;
      case 'username':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            userName: 'Username cannot be empty',
          });
        } else {
          setErrors({ ...errors, userName: '' });
        }
        break;
      default:
        break;
    }
  };

  return {
    errors,
    validate,
  };
};

export default useFormError;
