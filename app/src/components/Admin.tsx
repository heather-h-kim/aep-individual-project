import { useSeasonStore } from '../store/seasonStore';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewSeason,
  createSeason,
  deleteSeason,
} from '../services/seasonApi';
import { CreateSeasonModal } from './createSeasonModal';
import { UpdateSeasonModal } from './updateSeasonModal';
import { getAllSeasons } from '../services/rankingApi';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';

const Admin = () => {
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, themeFgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    themeFgColor: state.fgcolor,
    preview: state.preview,
  }));
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
    prevEndDate: number | null;
    nextStartDate: number | null;
  }

  const { currentSeason, currentSeasonId } = useSeasonStore(state => ({
    currentSeason: state.currentSeason,
    currentSeasonId: state.currentSeasonId,
  }));

  const [isUpdating, setIsUpdating] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dates, setDates] = useState<dates>({
    startDate: null,
    endDate: null,
    seasonId: null,
    prevEndDate: null,
    nextStartDate: null,
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

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isSuccess) {
    const timestampData = data.map(season => ({
      ...season,
      startDate: Date.parse(season.startDate),
      endDate: Date.parse(season.endDate),
    }));

    const formattedData = timestampData.map(season => ({
      ...season,
      startDate: new Date(season.startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      endDate: new Date(season.endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    }));

    return (
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col px-20 py-14 "
      >
        {/*<div className="flex flex-col">*/}
        <table className="table-auto text-center">
          <thead className="border-collapse border-b border-black text-xl">
            <tr>
              <th>Season</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map(season => {
              return (
                <tr
                  className="border-collapse border-b border-black"
                  key={season.seasonId}
                >
                  <td>Season {season.seasonId}</td>
                  <td>{season.startDate}</td>
                  <td>{season.endDate}</td>
                  <td>
                    <div className="flex flex-row items-center justify-center">
                      <button
                        disabled={buttonDisabled}
                        className="mx-6 my-2 rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
                        onClick={e => {
                          e.preventDefault();
                          console.log(
                            'update the season, seasonId is',
                            season.seasonId,
                          );
                          const currentIndex = formattedData.indexOf(season);
                          console.log('currentIndex', currentIndex);

                          const startDateTimestamp = new Date(
                            season.startDate,
                          ).getTime();

                          const endDateTimestamp = new Date(
                            season.endDate,
                          ).getTime();

                          if (formattedData.length == 1) {
                            setDates({
                              ...dates,
                              startDate: startDateTimestamp,
                              endDate: endDateTimestamp,
                              seasonId: season.seasonId,
                            });
                            console.log(dates);
                            setShowUpdateModal(!showUpdateModal);
                          }

                          if (currentIndex == 0 && formattedData.length !== 1) {
                            setDates({
                              ...dates,
                              startDate: startDateTimestamp,
                              endDate: endDateTimestamp,
                              seasonId: season.seasonId,
                              nextStartDate: new Date(
                                formattedData[currentIndex + 1].startDate,
                              ).getTime(),
                            });
                            setShowUpdateModal(!showUpdateModal);
                          }

                          if (
                            formattedData.length !== 1 &&
                            currentIndex == formattedData.length - 1
                          ) {
                            setDates({
                              ...dates,
                              startDate: startDateTimestamp,
                              endDate: endDateTimestamp,
                              seasonId: season.seasonId,
                              prevEndDate: new Date(
                                formattedData[currentIndex - 1].seasonId,
                              ).getTime(),
                            });
                            setShowUpdateModal(!showUpdateModal);
                          }

                          if (
                            formattedData.length !== 1 &&
                            currentIndex !== formattedData.length - 1 &&
                            currentIndex !== 0
                          ) {
                            setDates({
                              ...dates,
                              startDate: startDateTimestamp,
                              endDate: endDateTimestamp,
                              seasonId: season.seasonId,
                              prevEndDate: new Date(
                                formattedData[currentIndex - 1].seasonId,
                              ).getTime(),
                              nextStartDate: new Date(
                                formattedData[currentIndex + 1].startDate,
                              ).getTime(),
                            });

                            setShowUpdateModal(!showUpdateModal);
                          }
                        }}
                      >
                        Update
                      </button>
                      <button
                        disabled={buttonDisabled}
                        className="rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          className="mt-8  w-60  rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
          onClick={() => setShowCreateModal(!showCreateModal)}
        >
          Create Season
        </button>

        <CreateSeasonModal
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          dates={dates}
          setDates={setDates}
          currentSeason={currentSeason}
        />
        <UpdateSeasonModal
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          dates={dates}
          setDates={setDates}
        />
      </div>
      // </div>
    );
  }
};

export default Admin;
