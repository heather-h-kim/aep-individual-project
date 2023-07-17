import { useQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/rankingApi';
import { useSeasonStore } from '../store/seasonStore';

const useGetSeasons = () => {
  interface season {
    seasonId: number;
    startDate: string;
    endDate: string;
  }

  const {
    seasons,
    currentSeason,
    currentSeasonId,
    updateSeasons,
    updateCurrentSeason,
    updateCurrentSeasonId,
  } = useSeasonStore(state => ({
    seasons: state.seasons,
    currentSeason: state.currentSeason,
    currentSeasonId: state.currentSeasonId,
    updateSeasons: state.updateSeasons,
    updateCurrentSeason: state.updateCurrentSeason,
    updateCurrentSeasonId: state.updateCurrentSeasonId,
  }));

  useQuery({
    queryKey: ['Seasons'],
    queryFn: getSeasons,
    onSuccess: data => {
      console.log(data);
      updateSeasons(data);
      updateCurrentSeason(data[data.length - 1]);
      updateCurrentSeasonId(Object.values(data[data.length - 1])[0]);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  console.log(seasons);
  console.log(currentSeasonId);
  console.log('currentSeason', currentSeason);

  return {
    seasons,
    currentSeasonId,
  };
};

export default useGetSeasons;
