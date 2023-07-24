import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateSeasonModal } from './createSeasonModal';
import { UpdateSeasonModal } from './updateSeasonModal';
import { DeleteSeasonModal } from './deleteSeasonModal';
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
  const { isLoading, isSuccess, data, isRefetching } = useQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
    onSuccess: data => {
      console.log(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
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
    return <h1>Loading</h1>;
  }

  if (isRefetching) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="flex h-screen items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 inline h-44 w-44 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
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
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="my-10 flex h-screen flex-col px-20 py-14 "
      >
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

        <button
          className="mt-8  w-60  rounded bg-neutral-600 px-4 py-2 font-bold text-white hover:bg-neutral-700"
          onClick={handleCreateClick}
          // onClick={() => setShowCreateModal(!showCreateModal)}
        >
          Create Season
        </button>

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
