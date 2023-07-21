import { useSeasonStore } from '../store/seasonStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import useSelectDateError from '../hooks/useSelectDateError';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createNewSeason,
  createSeason,
  deleteSeason,
} from '../services/seasonApi';
import { UpdateSeasonModal } from './updateSeasonModal';
import { getAllSeasons } from '../services/rankingApi';

const Admin = () => {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
    onSuccess: data => {
      console.log(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  interface dates {
    startDate: Date | null | number;
    endDate: Date | null | number;
    seasonId: number | null;
    prevSeasonId: number | null;
    nextSeasonId: number | null;
  }

  const { allSeasons, currentSeason, currentSeasonId, addNewSeason } =
    useSeasonStore(state => ({
      allSeasons: state.allSeasons,
      currentSeason: state.currentSeason,
      currentSeasonId: state.currentSeasonId,
      addNewSeason: state.addNewSeason,
    }));

  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dates, setDates] = useState<dates>({
    startDate: null,
    endDate: null,
    seasonId: null,
    prevSeasonId: null,
    nextSeasonId: null,
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
    },
    onSettled: data => {
      console.log('Complete', data);
      setIsUpdating(false);
    },
  });

  const deleteSeasonMutation = useMutation({
    mutationFn: seasonId => deleteSeason(seasonId),
    onMutate: seasonId => {
      console.log('mutate', seasonId);
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

  const handleOnChangeStartDate = date => {
    console.log('date', date);
    console.log('type', typeof date);

    const dateHours = date.setHours(0, 0, 0);
    console.log('dateHours', dateHours, typeof dateHours);

    setDates({ ...dates, startDate: dateHours });

    setErrors({
      ...errors,
      startDate: '',
    });

    if (currentSeason) {
      console.log('currentSeason', currentSeason);
      const timestampCurrentSeasonEndDate = Date.parse(currentSeason.endDate);

      console.log('errors', errors);

      if (dateHours / 1000 < timestampCurrentSeasonEndDate) {
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
    const dateHours = date.setHours(23, 59, 59);
    console.log('dateHours', dateHours);
    setDates({ ...dates, endDate: dateHours });
    setErrors({
      ...errors,
      endDate: '',
    });

    if (dates.startDate) {
      const timestampStartDate = dates.startDate;
      if (dateHours < timestampStartDate) {
        setErrors({
          ...errors,
          endDate: 'The end date should be later than the start date',
        });
      }
    }

    console.log('errors', errors);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('create a new season');
    const createSeason = {
      start_date: dates.startDate,
      end_date: dates.endDate,
    };
    console.log('createSeason is', createSeason);
    createSeasonMutation.mutate(createSeason as createSeason);
  };

  const handleOnClose = () => {
    // setStartDate(null);
    // setEndDate(null);
    setDates({
      ...dates,
      startDate: null,
      endDate: null,
      seasonId: null,
      prevSeasonId: null,
      nextSeasonId: null,
    });
    setShowModal(!showModal);
  };

  const handleOnUpdate = () => {
    console.log('dates', dates);
    if (typeof dates.startDate === 'object') {
      const payload = {
        season_id: dates.seasonId,
        end_date: dates.endDate,
      };
      console.log('payload', payload);
    }

    if (typeof dates.endDate === 'object') {
      const payload = {
        season_id: dates.seasonId,
        start_date: dates.startDate,
      };
      console.log('payload', payload);
    }

    if (
      typeof dates.startDate !== 'object' &&
      typeof dates.endDate !== 'object'
    ) {
      const payload = {
        season_id: dates.seasonId,
        start_date: dates.startDate,
        end_date: dates.endDate,
      };
      console.log('payload', payload);
    }

    setDates({
      ...dates,
      startDate: null,
      endDate: null,
      seasonId: null,
      prevSeasonId: null,
      nextSeasonId: null,
    });

    // setStartDate(null);
    // setEndDate(null);
    setShowModal(!showModal);
  };

  // console.log(dates);
  console.log('data', data);
  console.log('dates', dates);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isSuccess) {
    return (
      <div>
        <h1>Seasons</h1>
        <div className="flex flex-col">
          <table className="table-auto">
            <thead>
              <tr>
                <th>Season</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(season => {
                return (
                  <tr key={season.seasonId}>
                    <td>Season {season.seasonId}</td>
                    <td>{season.startDate.slice(0, 10)}</td>
                    <td>{season.endDate.slice(0, 10)}</td>
                    <td>
                      <button
                        disabled={buttonDisabled}
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={e => {
                          e.preventDefault();
                          console.log(
                            'update the season, seasonId is',
                            season.seasonId,
                          );
                          const currentIndex = allSeasons.indexOf(season);
                          const startDate = new Date(season.startDate);
                          const endDate = new Date(season.endDate);

                          if (currentIndex == 0) {
                            setDates({
                              ...dates,
                              startDate: startDate,
                              endDate: endDate,
                              seasonId: season.seasonId,
                              nextSeasonId:
                                allSeasons[currentIndex + 1].seasonId,
                            });

                            setShowModal(!showModal);
                          }

                          if (currentIndex == allSeasons.length - 1) {
                            setDates({
                              ...dates,
                              startDate: startDate,
                              endDate: endDate,
                              seasonId: season.seasonId,
                              prevSeasonId:
                                allSeasons[currentIndex - 1].seasonId,
                            });

                            setShowModal(!showModal);
                          }

                          setDates({
                            ...dates,
                            startDate: startDate,
                            endDate: endDate,
                            seasonId: season.seasonId,
                            prevSeasonId: allSeasons[currentIndex - 1].seasonId,
                            nextSeasonId: allSeasons[currentIndex + 1].seasonId,
                          });

                          setShowModal(!showModal);
                        }}
                      >
                        Update
                      </button>
                      <button
                        disabled={buttonDisabled}
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={e => {
                          e.preventDefault();
                          console.log(
                            'delete the season, payload is',
                            season.seasonId,
                          );
                          deleteSeasonMutation.mutate(season.seasonId);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              <button
                type="submit"
                disabled={buttonDisabled}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Create Season
              </button>
            )}
          </form>
          <UpdateSeasonModal
            visible={showModal}
            // startDate={startDate}
            // setStartDate={setStartDate}
            // endDate={endDate}
            // setEndDate={setEndDate}
            onClose={handleOnClose}
            onUpdate={handleOnUpdate}
            DatePicker={DatePicker}
            errors={errors}
            setErrors={setErrors}
            dates={dates}
            setDates={setDates}
          />
        </div>
      </div>
    );
  }
};

export default Admin;
