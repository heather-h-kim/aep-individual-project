import React from 'react';

export const UpdateSeasonModal = ({
  visible,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClose,
  onUpdate,
  DatePicker,
  errors,
  setErrors,
  dates,
  setDates,
}) => {
  if (visible === false) return null;

  const handleOnChangeUpdateStartDate = date => {
    console.log('type of date', typeof date, date);
    // setStartDate(date);
    setDates({
      ...dates,
      startDate: date,
    });
    setErrors({
      ...errors,
      startDate: '',
    });

    console.log('errors', errors);
  };

  const handleOnChangeUpdateEndDate = date => {
    // setEndDate(date);
    setDates({
      ...dates,
      endDate: date,
    });
    setErrors({
      ...errors,
      endDate: '',
    });

    console.log('errors', errors);
  };

  // console.log(dates);

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
                      // placeholderText={'select a date'}
                      onChange={handleOnChangeUpdateStartDate}
                    />
                  </label>
                  <label htmlFor="endDate">
                    End date:
                    <DatePicker
                      name="endDate"
                      selected={dates.endDate}
                      // placeholderText={'select a date'}
                      onChange={handleOnChangeUpdateEndDate}
                    />
                  </label>
                </div>
                <div className="flex flex-row">
                  <button onClick={onUpdate}>Update</button>
                  <button onClick={onClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
