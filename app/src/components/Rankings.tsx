import { useState } from 'react';
import { useSeasonStore } from '../store/seasonStore';
import { useRankingStore } from '../store/rankingStore';
import Pagination from './Pagination';
import { useQuery } from '@tanstack/react-query';
import { getRankings } from '../services/rankingApi';
import useGetSeasons from '../hooks/useGetSeasons';
import { getSeasonsToDate } from '../services/seasonApi';

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingsPerPage, setRankingsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const { currentSeasonId, updateCurrentSeasonId } = useSeasonStore(state => ({
    currentSeasonId: state.currentSeasonId,
    updateCurrentSeasonId: state.updateCurrentSeasonId,
  }));

  const [selectedSeason, setSelectedSeason] = useState(currentSeasonId);

  const {
    data: seasons,
    isSuccess: isSuccessSeasons,
    isLoading: isLoadingSeasons,
  } = useQuery({
    queryKey: ['SeasonsToDate'],
    queryFn: getSeasonsToDate,
    onSuccess: data => {
      console.log('seasons todate', data);
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
    onSuccess: data => {
      console.log(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });

  const handleSelect = e => {
    e.preventDefault();
    console.log('in handleSelect');
    setSelectedSeason(e.target.value);
  };

  console.log('season', selectedSeason);
  console.log('rankings', rankings);

  if (isLoadingRankings || isLoadingSeasons) {
    return <div>Loading...</div>;
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
        <div>
          <div className="flex flex-row justify-evenly">
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
                {/*<option defaultValue={selectedSeason}>*/}
                {/*  Season {currentSeasonId}*/}
                {/*</option>*/}
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
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </label>
            </form>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rankingsToDisplayPerPage.map(ranking => {
                return (
                  <tr key={ranking.userName}>
                    <td>{ranking.rank}</td>
                    <td>{ranking.userName}</td>
                    <td>{ranking.topScore}</td>
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

    if (search !== '') {
      return (
        <div>
          <div className="flex flex-row justify-evenly">
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
              >
                <option defaultValue={seasons[0].seasonId}>
                  Season {seasons[0].seasonId}
                </option>
                {seasons.map(season => {
                  return (
                    <option key={season.seasonId} value={season.seasonId}>
                      Season {season.seasonId}
                    </option>
                  );
                })}
              </select>
            </div>
            <form className="flex flex-row items-center">
              <label>
                Search by Username:
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </label>
              <button onClick={() => setSearch('')}>back</button>
            </form>
          </div>
          <table className="table-auto">
            <thead>
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
                    <tr key={ranking.userName}>
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
