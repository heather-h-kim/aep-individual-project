import { useQuery } from '@tanstack/react-query';
import { getRankings, getSeasons } from '../services/rankingApi';
import { useEffect, useState } from 'react';
import useGetSeasons from '../hooks/useGetSeasons';

const Rankings = () => {
  interface ranking {
    userName: string;
    topScore: number;
  }

  const { seasons, currentSeasonId, setCurrentSeasonId } = useGetSeasons();
  const [rankingArray, setRankingArray] = useState<ranking[]>([]);

  useQuery({
    queryKey: ['Rankings', currentSeasonId],
    queryFn: () => getRankings(currentSeasonId),
    onSuccess: data => {
      console.log(data);
      setRankingArray(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  const handleClick = () => {
    console.log('clicked');
    setCurrentSeasonId(3);
  };

  const handleSelect = e => {
    setCurrentSeasonId(e.target.value);
  };

  console.log(seasons);
  console.log(rankingArray);
  console.log('currentSeasonId is', currentSeasonId);

  return (
    <div>
      <label
        htmlFor="countries"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select season
      </label>
      <select
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={handleSelect}
      >
        <option selected>Season {currentSeasonId}</option>
        {seasons.map(season => {
          return (
            <option key={season.seasonId} value={season.seasonId}>
              Season {season.seasonId}
            </option>
          );
        })}
      </select>
      <button onClick={handleClick}>Rankings</button>
      <div>
        {rankingArray.map(ranking => {
          return (
            <div key={ranking.userName}>
              <h2>{ranking.userName}</h2>
              <p>{ranking.topScore}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Rankings;
