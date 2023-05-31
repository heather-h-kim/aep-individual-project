import React, { useState } from 'react';
import { omit } from 'lodash';

const useForm = () => {
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
        } else {
          const newObj = omit(errors, 'firstName');
          setErrors(newObj);
        }
        break;
      case 'lastName':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            lastName: 'Last name cannot be empty',
          });
        } else {
          const newObj = omit(errors, 'lastName');
          setErrors(newObj);
        }
        break;
      case 'username':
        if (value.trim().length < 1) {
          setErrors({
            ...errors,
            userName: 'Username cannot be empty',
          });
        } else {
          const newObj = omit(errors, 'userName');
          setErrors(newObj);
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

export default useForm;
