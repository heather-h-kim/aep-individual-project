import { useQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/rankingApi';
import { useState } from 'react';

const useGetSeasons = () => {
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState({});
  const [currentSeasonId, setCurrentSeasonId] = useState<any>(0);

  useQuery({
    queryKey: ['Seasons'],
    queryFn: getSeasons,
    onSuccess: data => {
      console.log(data);
      setSeasons(data);
      setCurrentSeason(data[data.length - 1]);
      setCurrentSeasonId(Object.values(data[data.length - 1])[0]);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  console.log(seasons);
  console.log(currentSeason);
  console.log(Object.values(currentSeason)[0]);
  console.log(currentSeasonId);

  return {
    seasons,
    currentSeasonId,
  };
};

export default useGetSeasons;
