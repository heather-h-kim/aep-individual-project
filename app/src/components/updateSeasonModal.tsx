import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSeason } from '../services/seasonApi';

export const UpdateSeasonModal = ({
  showUpdateModal,
  setShowUpdateModal,
  dates,
  setDates,
}) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
  });

  const updateSeasonMutation = useMutation({
    mutationFn: (body: updateSeason) => updateSeason(body),
    onMutate: body => {
      console.log('mutate', body);
      setIsUpdating(true);
    },
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
      setIsUpdating(false);
    },

    onSuccess: data => {
      console.log('Success', data);
      queryClient.invalidateQueries({ queryKey: ['Seasons'] });
      setDates({
        ...dates,
        startDate: null,
        endDate: null,
        seasonId: null,
        prevEndDate: null,
        nextStartDate: null,
      });
      setShowUpdateModal(!showUpdateModal);
    },
    onSettled: data => {
      console.log('Complete', data);
      setIsUpdating(false);
    },
  });

  const handleOnChangeUpdateStartDate = date => {
    console.log('dates', dates);
    setErrors({
      ...errors,
      startDate: '',
    });

    const dateHours = date.setHours(0, 0, 0);
    console.log('dateHours', dateHours);

    //input validation
    if (dates.prevEndDate) {
      console.log(dates.prevEndDate);
      console.log(dateHours);

      if (dateHours < dates.prevEndDate) {
        setErrors({
          ...errors,
          startDate:
            'The start date should be later than the end date of the previous season',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }

      if (dateHours > dates.endDate) {
        setErrors({
          ...errors,
          startDate: 'The start date should be earlier than the end date',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }

    if (!dates.prevEndDate) {
      if (dateHours > dates.endDate) {
        setErrors({
          ...errors,
          startDate: 'The start date should be earlier than the end date',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }

    setDates({ ...dates, startDate: dateHours });
  };

  const handleOnChangeUpdateEndDate = date => {
    console.log('dates', dates);
    setErrors({
      ...errors,
      endDate: '',
    });

    const dateHours = date.setHours(23, 59, 59);
    console.log('dateHours', dateHours);
    //input validation
    if (!dates.nextStartDate) {
      if (dateHours < dates.startDate) {
        setErrors({
          ...errors,
          endDate: 'The end date should be later than the start date',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }

    if (dates.nextStartDate) {
      if (dateHours > dates.nextStartDate) {
        setErrors({
          ...errors,
          endDate:
            'The end date should be earlier than the start date of the next season',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }

      if (dateHours < dates.startDate) {
        setErrors({
          ...errors,
          endDate: 'The end date should be later than the start date',
        });
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
    setDates({ ...dates, endDate: dateHours });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      season_id: dates.seasonId,
      start_date: dates.startDate,
      end_date: dates.endDate,
      prev_end_date: dates.prevEndDate,
      next_start_date: dates.nextStartDate,
    };

    console.log('payload', payload);
    updateSeasonMutation.mutate(payload);
  };

  const closeModal = e => {
    e.preventDefault();
    console.log('cancel');
    setErrors({
      ...errors,
      startDate: '',
      endDate: '',
    });

    setDates({
      ...dates,
      startDate: null,
      endDate: null,
      seasonId: null,
      prevEndDate: null,
      nextStartDate: null,
    });

    setShowUpdateModal(!showUpdateModal);
  };

  console.log('disabled', isDisabled);
  console.log('errors', errors);

  if (showUpdateModal) {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="h-1/6 bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <label htmlFor="startDate">
                        Start date:
                        <DatePicker
                          name="startDate"
                          selected={dates.startDate}
                          placeholderText={'select date'}
                          onChange={handleOnChangeUpdateStartDate}
                        />
                      </label>
                      {errors.startDate && <h3>{errors.startDate}</h3>}
                    </div>
                    <div>
                      <label htmlFor="endDate">
                        End date:
                        <DatePicker
                          name="endDate"
                          selected={dates.endDate}
                          placeholderText={'select date'}
                          onChange={handleOnChangeUpdateEndDate}
                        />
                      </label>
                      {errors.endDate && <h3>{errors.endDate}</h3>}
                    </div>
                  </div>

                  {isUpdating ? (
                    <div className="flex flex-row items-center justify-center">
                      <button
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        onClick={closeModal}
                        disabled
                      >
                        Cancel
                      </button>
                      <button
                        disabled
                        type="button"
                        className="mx-6 mb-1 mt-4 inline-flex items-center rounded bg-neutral-600 px-2 py-1 text-center text-sm font-medium text-white hover:bg-neutral-700 focus:ring-4 focus:ring-blue-300"
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
                    <div className="flex flex-row items-center justify-center">
                      <button
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        disabled={isDisabled}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
