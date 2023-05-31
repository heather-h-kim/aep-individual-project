import { useState } from 'react';
import React from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [formData, setFormData] = useState({
    userId: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bgcolor: '',
    fgcolor: '',
  });

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const setInitialValue = (value: string) => {
    setEnteredValue(value);
  };

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setEnteredValue(event.target.defaultValue);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
    isValid: valueIsValid,
    reset,
    setInitialValue,
  };
};

export default useInput;
