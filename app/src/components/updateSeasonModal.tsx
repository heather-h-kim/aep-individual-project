import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSeason } from '../services/seasonApi';

export const UpdateSeasonModal = ({
  showModal,
  setShowModal,
  DatePicker,
  dates,
  setDates,
  isUpdating,
  setIsUpdating,
}) => {
  const [errors, setErrors] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (dates.startDate > dates.endDate) {
      console.log('startdate > endDate');
      setErrors('The start date must be earlier than the end date');
    }

    if (dates.startDate < dates.prevEndDate) {
      setErrors(
        "The start date must be later than the previous season's end date",
      );
    }

    setErrors('');
  }, [dates]);

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
    },
    onSettled: data => {
      console.log('Complete', data);
      setIsUpdating(false);
    },
  });

  const handleOnChangeUpdateStartDate = date => {
    // console.log('type of date', typeof date, date);
    // console.log('dates', dates);
    // console.log(date.setHours(0, 0, 0));

    setDates({
      ...dates,
      startDate: date.setHours(0, 0, 0),
    });
  };

  const handleOnChangeUpdateEndDate = date => {
    // console.log('type of date', typeof date, date);
    // console.log('dates', dates);
    // console.log(date.setHours(23, 59, 59));

    setDates({
      ...dates,
      endDate: date.setHours(23, 59, 59),
    });
  };

  const handleCancel = e => {
    e.preventDefault();
    setErrors('');
    setShowModal(!showModal);
  };

  const handleUpdate = e => {
    e.preventDefault();
    setErrors('');

    const payload = {
      season_id: dates.seasonId,
      start_date: dates.startDate,
      end_date: dates.endDate,
      prev_end_date: dates.prevEndDate,
      next_start_date: dates.nextStartDate,
    };

    console.log('payload', payload);
    updateSeasonMutation.mutate(payload);

    setShowModal(!showModal);
  };

  console.log('dates', dates);
  // console.log('errors', errors);

  if (showModal) {
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
                <form className="flex flex-col">
                  <div className="flex flex-row">
                    <label htmlFor="startDate">
                      Start date:
                      <DatePicker
                        name="startDate"
                        selected={dates.startDate}
                        placeholderText={'select date'}
                        onChange={handleOnChangeUpdateStartDate}
                      />
                    </label>
                    <label htmlFor="endDate">
                      End date:
                      <DatePicker
                        name="endDate"
                        selected={dates.endDate}
                        placeholderText={'select date'}
                        onChange={handleOnChangeUpdateEndDate}
                      />
                    </label>
                  </div>
                  {errors && <h3>{errors}</h3>}
                  <div className="flex flex-row">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
