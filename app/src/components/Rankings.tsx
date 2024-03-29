import { useState } from 'react';
import Pagination from './Pagination';
import { useQuery } from '@tanstack/react-query';
import { getRankings } from '../services/rankingApi';
import { getSeasonsToDate } from '../services/seasonApi';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';
import { useSeasonStore } from '../store/seasonStore';
import LoadingSpinner from './LoadingSpinner';

const Rankings = () => {
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, themeFgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    themeFgColor: state.fgcolor,
    preview: state.preview,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingsPerPage, setRankingsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const currentSeasonId = useSeasonStore(state => state.currentSeasonId);
  const [selectedSeason, setSelectedSeason] = useState<number>(currentSeasonId);
  const style = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };
  const {
    data: seasons,
    isSuccess: isSuccessSeasons,
    isLoading: isLoadingSeasons,
  } = useQuery({
    queryKey: ['SeasonsToDate'],
    queryFn: getSeasonsToDate,
    onSuccess: data => {
      console.log('seasons to date in the Rankings component', data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });

  const {
    data: rankings,
    isSuccess: isSuccessRankings,
    isLoading: isLoadingRankings,
  } = useQuery({
    queryKey: ['Rankings', selectedSeason],
    queryFn: () => getRankings(selectedSeason),
    enabled: !!selectedSeason,
    onSuccess: data => {
      console.log(
        'rankings for the current season in the Rankings component',
        data,
      );
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });

  const handleSelect = e => {
    e.preventDefault();
    console.log('in handleSelect', e.target.value);
    setSelectedSeason(Number(e.target.value));
  };

  if (isLoadingRankings || isLoadingSeasons) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isSuccessSeasons && isSuccessRankings) {
    // Get rankings to display per page
    const indexOfLastRanking = currentPage * rankingsPerPage;
    const indexOfFirstRanking = indexOfLastRanking - rankingsPerPage;
    const rankingsToDisplayPerPage = rankings.slice(
      indexOfFirstRanking,
      indexOfLastRanking,
    );
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (search == '') {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-col px-20 py-14 "
        >
          <div className="mb-10 mt-3 flex flex-row justify-between">
            <div>
              <label
                htmlFor="seasons"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Select season
              </label>
              <select
                id="seasons"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleSelect}
                defaultValue={selectedSeason}
              >
                {seasons.map(season => {
                  return (
                    <option key={season.seasonId} value={season.seasonId}>
                      Season {season.seasonId}
                    </option>
                  );
                })}
              </select>
            </div>
            <form>
              <label>
                Search by Username:
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </label>
            </form>
          </div>
          <table className="mb-10  table-auto text-center">
            <thead className="border-collapse border-b border-black text-xl">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rankingsToDisplayPerPage.map(ranking => {
                return (
                  <tr
                    className="border-collapse border-b border-black"
                    key={ranking.userName}
                  >
                    <td className="py-2.5">{ranking.rank}</td>
                    <td className="py-2.5">{ranking.userName}</td>
                    <td className="py-2.5">{ranking.topScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            rankingsPerPage={rankingsPerPage}
            totalRankings={rankings.length}
            paginate={paginate}
          />
        </div>
      );
    }
    console.log('search', search);
    if (search !== '') {
      return (
        <div
          style={style}
          className="my-10 flex h-screen flex-col px-20 py-14 "
        >
          <div className="flex flex-row justify-between">
            <div>
              <label
                htmlFor="seasons"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Select season
              </label>
              <select
                id="seasons"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleSelect}
                defaultValue={selectedSeason}
              >
                {seasons.map(season => {
                  return (
                    <option key={season.seasonId} value={season.seasonId}>
                      Season {season.seasonId}
                    </option>
                  );
                })}
              </select>
            </div>

            <form className="flex flex-row items-end">
              <label>
                Search by Username:
                <input
                  className="mr-2 block min-w-min rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </label>
              <button
                className="h-10 rounded-lg bg-neutral-200 px-2 py-1 text-sm hover:bg-neutral-300"
                onClick={() => setSearch('')}
              >
                Clear
              </button>
            </form>
          </div>

          <table className="table-auto text-center">
            <thead className="border-collapse border-b border-black text-xl">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rankings
                .filter(ranking => {
                  if (search.toLowerCase() !== '') {
                    return ranking.userName.toLowerCase().includes(search);
                  }
                })
                .map(ranking => {
                  return (
                    <tr
                      className="border-collapse border-b border-black"
                      key={ranking.userName}
                    >
                      <td>{ranking.rank}</td>
                      <td>{ranking.userName}</td>
                      <td>{ranking.topScore}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      );
    }
  }
};
export default Rankings;
