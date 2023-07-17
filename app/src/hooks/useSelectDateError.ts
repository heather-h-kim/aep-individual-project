import { useState } from 'react';
import { useSeasonStore } from '../store/seasonStore';

const useSelectDateError = (date: Date) => {
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
  });

  const validate = (event: Event, name: string, selected: Date) => {
    switch (name) {
      case 'startDate':
        if (selected < currentSeason.endDate) {
          setErrors({
            ...errors,
            startDate:
              'Start date of the new season should be later than the end date of the current season',
          });
        }
        break;
      case 'endDate':
        if (selected < startDate) {
          setErrors({
            ...errors,
            endDate: 'End date cannot be earlier than that start date.',
          });
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

export default useSelectDateError;
