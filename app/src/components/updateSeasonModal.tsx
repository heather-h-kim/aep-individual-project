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
}) => {
  if (visible === false) return null;

  const handleOnChangeUpdateStartDate = date => {
    setStartDate(date);
    setErrors({
      ...errors,
      startDate: '',
    });
    const timestampSelectedDate = date.getTime();

    console.log('errors', errors);
  };

  const handleOnChangeUpdateEndDate = date => {
    setEndDate(date);
    setErrors({
      ...errors,
      endDate: '',
    });
    const timestampSelectedDate = date.getTime();
    const timestampStartDate = startDate.getTime();

    console.log('errors', errors);

    if (timestampSelectedDate < timestampStartDate) {
      setErrors({
        ...errors,
        endDate: 'The end date should be later than the start date',
      });
    }
  };

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
                      selected={startDate}
                      placeholderText={'select a date'}
                      onChange={handleOnChangeUpdateStartDate}
                    />
                  </label>
                  <label htmlFor="endDate">
                    End date:
                    <DatePicker
                      name="endDate"
                      selected={endDate}
                      placeholderText={'select a date'}
                      onChange={handleOnChangeEndDate}
                    />
                    {errors.endDate && <h3>{errors.endDate}</h3>}
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
