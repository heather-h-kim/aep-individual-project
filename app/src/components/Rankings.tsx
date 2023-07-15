import { useQuery } from '@tanstack/react-query';
import { getRankings, getSeasons } from '../services/rankingApi';
import { useEffect, useState } from 'react';
import useGetSeasons from '../hooks/useGetSeasons';
import { useSeasonStore } from '../store/seasonStore';
import { useRankingStore } from '../store/rankingStore';
import Pagination from './Pagination';

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingsPerPage, setRankingsPerPage] = useState(5);

  // global states for the dropdown menu and getting rankings
  const { seasons, currentSeasonId, updateCurrentSeasonId } = useSeasonStore(
    state => ({
      seasons: state.seasons,
      currentSeasonId: state.currentSeasonId,
      updateCurrentSeasonId: state.updateCurrentSeasonId,
    }),
  );

  //global states for rankings
  const { rankings, updateRankings } = useRankingStore(state => ({
    rankings: state.rankings,
    updateRankings: state.updateRankings,
  }));

  //query to get rankings for the current season
  useQuery({
    queryKey: ['Rankings', currentSeasonId],
    queryFn: () => getRankings(currentSeasonId),
    onSuccess: data => {
      console.log(data);
      updateRankings(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  const handleSelect = e => {
    updateCurrentSeasonId(e.target.value);
  };

  // console.log('rankings', rankings);
  // console.log('currentSeasonId is', currentSeasonId);

  // Get rankings to display per page
  const indexOfLastRanking = currentPage * rankingsPerPage;
  const indexOfFirstRanking = indexOfLastRanking - rankingsPerPage;
  const rankingsToDisplayPerPage = rankings.slice(
    indexOfFirstRanking,
    indexOfLastRanking,
  );

  //Change rankings page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <label
        htmlFor="countries"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        Select season
      </label>
      <select
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={handleSelect}
      >
        <option defaultValue={currentSeasonId}>Season {currentSeasonId}</option>
        {seasons.map(season => {
          return (
            <option key={season.seasonId} value={season.seasonId}>
              Season {season.seasonId}
            </option>
          );
        })}
      </select>
      <div>
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
    </div>
  );
};
export default Rankings;
