import { useState } from 'react';
import { useSeasonStore } from '../store/seasonStore';
import { useRankingStore } from '../store/rankingStore';
import Pagination from './Pagination';

const Rankings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingsPerPage, setRankingsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  // global states for the dropdown menu and getting rankings
  const { seasonsToDate, currentSeasonId, updateCurrentSeasonId } =
    useSeasonStore(state => ({
      seasonsToDate: state.seasonsToDate,
      currentSeasonId: state.currentSeasonId,
      updateCurrentSeasonId: state.updateCurrentSeasonId,
    }));

  //global states for rankings
  const rankings = useRankingStore(state => state.rankings);

  const handleSelect = e => {
    updateCurrentSeasonId(e.target.value);
  };

  console.log('rankings', rankings);

  // Get rankings to display per page
  const indexOfLastRanking = currentPage * rankingsPerPage;
  const indexOfFirstRanking = indexOfLastRanking - rankingsPerPage;
  const rankingsToDisplayPerPage = rankings.slice(
    indexOfFirstRanking,
    indexOfLastRanking,
  );

  //Change rankings page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  console.log(search);

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
            >
              <option defaultValue={currentSeasonId}>
                Season {currentSeasonId}
              </option>
              {seasonsToDate.map(season => {
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
              <option defaultValue={currentSeasonId}>
                Season {currentSeasonId}
              </option>
              {seasonsToDate.map(season => {
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
};
export default Rankings;
