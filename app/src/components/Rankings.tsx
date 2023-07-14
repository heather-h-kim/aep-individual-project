import { useQuery } from '@tanstack/react-query';
import { getRankings, getSeasons } from '../services/rankingApi';
import { useEffect, useState } from 'react';
import useGetSeasons from '../hooks/useGetSeasons';

const Rankings = () => {
  const [season, setSeason] = useState(3);
  useGetSeasons();
  useQuery({
    queryKey: ['Rankings', season],
    queryFn: () => getRankings(season),
    onSuccess: data => console.log(data),
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  const handleClick = () => {
    setSeason(4);
  };

  return (
    <div>
      <h1>Rankings page</h1>
      <button onClick={handleClick}>Rankings</button>
    </div>
  );
};
export default Rankings;
