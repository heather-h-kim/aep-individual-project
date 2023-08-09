import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewSeason, createSeason } from '../services/seasonApi';

export const CreateSeasonModal = ({
  showCreateModal,
  setShowCreateModal,
  dates,
  setDates,
}) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    update: '',
  });

  const createSeasonMutation = useMutation({
    mutationFn: (body: createSeason) => createNewSeason(body),
    onMutate: body => {
      console.log('mutate', body);
      setIsUpdating(true);
      console.log(isUpdating);
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
      setShowCreateModal(!showCreateModal);
    },
    onSettled: data => {
      console.log('Complete', data);
      setIsUpdating(false);
    },
  });

  const handleOnChangeStartDate = date => {
    setErrors({
      ...errors,
      startDate: '',
      update: '',
    });

    const dateHours = date.setHours(0, 0, 0);
    setDates({ ...dates, startDate: dateHours });

    //input validation

    if (!dates.prevEndDate && dates.endDate) {
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

    if (dates.prevEndDate && !dates.endDate) {
      if (dateHours < dates.prevEndDate) {
        setErrors({
          ...errors,
          startDate:
            'The start date of the new season should be later than the end date of the previous season',
        });
        setIsDisabled(true);
      }
    }

    if (dates.prevEndDate && dates.endDate) {
      if (dateHours < dates.prevEndDate) {
        setErrors({
          ...errors,
          startDate:
            'The start date of the new season should be later than the end date of the previous season',
        });
        setIsDisabled(true);
      } else if (dateHours > dates.endDate) {
        setErrors({
          ...errors,
          startDate: 'The start date should be earlier than the end date',
        });
        setIsDisabled(true);
      } else {
        setErrors({
          ...errors,
          startDate: '',
          endDate: '',
        });
        setIsDisabled(false);
      }
    }
  };

  const handleOnChangeEndDate = date => {
    setErrors({
      ...errors,
      endDate: '',
      update: '',
    });
    const dateHours = date.setHours(23, 59, 59);
    console.log('enddate', dateHours, 'startdate', dates.startDate);
    setDates({ ...dates, endDate: dateHours });

    if (dates.startDate) {
      if (dateHours < dates.startDate) {
        setErrors({
          ...errors,
          endDate: 'The end date should be later than the start date',
        });
        setIsDisabled(true);
      } else {
        setErrors({
          ...errors,
          startDate: '',
          endDate: '',
        });
        setIsDisabled(false);
      }
    }

    if (dates.startDate < dates.endDate) {
      setErrors({
        ...errors,
        startDate: '',
        endDate: '',
      });
    }
  };

  console.log(errors);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('in create season submit', dates, errors);

    // if (!dates.startDate || !dates.endDate) {
    //   setErrors({
    //     ...errors,
    //     update: 'The start and end dates should be selected',
    //   });
    //   setIsDisabled(true);
    // } else {
    //   setIsDisabled(false);
    // }

    const createSeason = {
      start_date: dates.startDate,
      end_date: dates.endDate,
    };
    console.log('createSeason is', createSeason);

    createSeasonMutation.mutate(createSeason as createSeason);
    setErrors({
      ...errors,
      startDate: '',
      endDate: '',
      update: '',
    });
    setIsDisabled(true);
  };

  const closeModal = () => {
    setErrors({
      ...errors,
      startDate: '',
      endDate: '',
      update: '',
    });

    setDates({
      ...dates,
      startDate: null,
      endDate: null,
    });

    setIsDisabled(false);
    setShowCreateModal(!showCreateModal);
  };

  if (showCreateModal) {
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
            <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Create season
                    </h3>
                    <div className="mt-2">
                      <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <label htmlFor="startDate">
                              Start date:
                              <DatePicker
                                name="startDate"
                                selected={dates.startDate}
                                placeholderText={'select a date'}
                                onChange={handleOnChangeStartDate}
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
                                placeholderText={'select a date'}
                                onChange={handleOnChangeEndDate}
                              />
                            </label>
                            {errors.endDate && <h3>{errors.endDate}</h3>}
                          </div>
                          {errors.update && <h3>{errors.update}</h3>}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                                className="mx-6 mb-1 mt-4  inline-flex items-center rounded bg-neutral-600 px-2 py-1 text-center text-sm font-medium text-white hover:bg-neutral-700 focus:ring-4 focus:ring-blue-300"
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
                                Creating...
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
                                Create Season
                              </button>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
