import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewSeason, createSeason } from '../services/seasonApi';

export const CreateSeasonModal = ({
  showCreateModal,
  setShowCreateModal,
  dates,
  setDates,
  currentSeason,
}) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    update: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // interface dates {
  //   startDate: Date | null | number;
  //   endDate: Date | null | number;
  //   seasonId: number | null;
  //   prevEndDate: number | null;
  //   nextStartDate: number | null;
  // }
  // const [dates, setDates] = useState<dates>({
  //   startDate: null,
  //   endDate: null,
  //   seasonId: null,
  //   prevEndDate: null,
  //   nextStartDate: null,
  // });
  // useEffect(() => {
  //   if (currentSeason) {
  //     const timestampCurrentSeasonEndDate = Date.parse(currentSeason.endDate);
  //     console.log(
  //       'currentSeason',
  //       currentSeason,
  //       timestampCurrentSeasonEndDate,
  //     );
  //
  //     if (dateHours / 1000 < timestampCurrentSeasonEndDate) {
  //       setErrors({
  //         ...errors,
  //         startDate:
  //           'The start date of the new season should be later than the end date of the current season',
  //       });
  //     }
  //   }
  // }, [dates]);

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

    if (currentSeason) {
      const timestampCurrentSeasonEndDate = Date.parse(currentSeason.endDate);
      if (dateHours < timestampCurrentSeasonEndDate) {
        setErrors({
          ...errors,
          startDate:
            'The start date of the new season should be later than the end date of the current season',
        });
      }
    }

    if (dates.endDate) {
      console.log('endDate', dates.endDate);
      if (dateHours > dates.endDate) {
        setErrors({
          ...errors,
          startDate:
            'The start date of the new season should be earlier than the end date',
        });
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
    setDates({ ...dates, endDate: dateHours });

    if (dates.startDate) {
      const timestampStartDate = dates.startDate;
      if (dateHours < timestampStartDate) {
        setErrors({
          ...errors,
          endDate: 'The end date should be later than the start date',
        });
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('create a new season');
    setErrors({
      ...errors,
      update: '',
    });

    if (!dates.startDate || !dates.endDate) {
      setErrors({
        ...errors,
        update: 'The start date and the end date should be selected',
      });
    }
    const createSeason = {
      start_date: dates.startDate,
      end_date: dates.endDate,
    };
    console.log('createSeason is', createSeason);
    // createSeasonMutation.mutate(createSeason as createSeason);
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
            <div className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="h-1/6 bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                <form onSubmit={handleSubmit}>
                  <h1>Create a new season</h1>
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
                  {errors.update && <h3>{errors.update}</h3>}
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
                    <div>
                      <button
                        disabled={buttonDisabled}
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={buttonDisabled}
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        Create Season
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
