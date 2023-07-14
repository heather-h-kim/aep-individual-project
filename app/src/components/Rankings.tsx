import { useQuery } from '@tanstack/react-query';
import { getRankings, getSeasons } from '../services/rankingApi';
import { useEffect, useState } from 'react';
import useGetSeasons from '../hooks/useGetSeasons';

const Rankings = () => {
  const { seasons, currentSeasonId } = useGetSeasons();
  const [rankingArray, setRankingArray] = useState([]);

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
  };

  console.log(rankingArray);

  return (
    <div>
      <h1>Rankings page</h1>
      <button onClick={handleClick}>Rankings</button>
    </div>
  );
};
export default Rankings;
