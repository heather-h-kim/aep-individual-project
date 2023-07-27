import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateSeasonModal } from './createSeasonModal';
import { UpdateSeasonModal } from './updateSeasonModal';
import { DeleteSeasonModal } from './deleteSeasonModal';
import { getAllSeasons } from '../services/seasonApi';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';
import LoadingSpinner from './LoadingSpinner';

const Admin = () => {
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, themeFgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    themeFgColor: state.fgcolor,
    preview: state.preview,
  }));
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };
  const { isLoading, isSuccess, data, isRefetching } = useQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
    onSuccess: data => {
      console.log('in Admin', data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  interface dates {
    startDate: Date | null | number;
    endDate: Date | null | number;
    seasonId: number | null;
    prevEndDate: number | null;
    nextStartDate: number | null;
  }
  const [dates, setDates] = useState<dates>({
    startDate: null,
    endDate: null,
    seasonId: null,
    prevEndDate: null,
    nextStartDate: null,
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
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

    const handleCreateClick = e => {
      e.preventDefault();
      if (data.length > 0) {
        const prevEndDateTimestamp = new Date(
          data[data.length - 1].endDate,
        ).getTime();

        setDates({
          ...dates,
          prevEndDate: prevEndDateTimestamp,
        });
      }
      setShowCreateModal(!showCreateModal);
    };

    const handleUpdateClick = (e, season) => {
      e.preventDefault();
      const currentIndex = formattedData.indexOf(season);
      const startDateTimestamp = new Date(season.startDate).getTime();
      const endDateTimestamp = new Date(season.endDate).getTime();

      if (currentIndex == 0 && formattedData.length == 1) {
        console.log('I am the only one');

        setDates({
          ...dates,
          startDate: startDateTimestamp,
          endDate: endDateTimestamp,
          seasonId: season.seasonId,
        });

        setShowUpdateModal(!showUpdateModal);
      }

      if (currentIndex == 0 && formattedData.length > 1) {
        console.log('I am the first one');
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
        currentIndex > 0 &&
        currentIndex < formattedData.length - 1 &&
        formattedData.length > 1
      ) {
        console.log('I am in the middle');

        setDates({
          ...dates,
          startDate: startDateTimestamp,
          endDate: endDateTimestamp,
          seasonId: season.seasonId,
          prevEndDate: new Date(
            formattedData[currentIndex - 1].endDate,
          ).getTime(),
          nextStartDate: new Date(
            formattedData[currentIndex + 1].startDate,
          ).getTime(),
        });

        setShowUpdateModal(!showUpdateModal);
      }

      if (
        currentIndex == formattedData.length - 1 &&
        formattedData.length > 1
      ) {
        console.log('I am the last');
        setDates({
          ...dates,
          startDate: startDateTimestamp,
          endDate: endDateTimestamp,
          seasonId: season.seasonId,
          prevEndDate: new Date(
            formattedData[currentIndex - 1].endDate,
          ).getTime(),
        });

        setShowUpdateModal(!showUpdateModal);
      }
    };

    const handleDeleteClick = (e, season) => {
      e.preventDefault();
      setDates({
        ...dates,
        seasonId: season.seasonId,
      });

      setShowDeleteModal(!showDeleteModal);
    };

    return (
      <div style={style} className="my-10 flex h-screen flex-col px-20 py-14 ">
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
                        className="mx-6 my-2 rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
                        onClick={e => {
                          handleUpdateClick(e, season);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
                        onClick={e => {
                          handleDeleteClick(e, season);
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
        <div className="flex justify-center">
          <button
            className="mt-8  w-60  rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
            onClick={handleCreateClick}
          >
            Create Season
          </button>
        </div>

        <CreateSeasonModal
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          dates={dates}
          setDates={setDates}
        />
        <UpdateSeasonModal
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          dates={dates}
          setDates={setDates}
        />
        <DeleteSeasonModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          dates={dates}
          setDates={setDates}
        />
      </div>
    );
  }
};

export default Admin;
