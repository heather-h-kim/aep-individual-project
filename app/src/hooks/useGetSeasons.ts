import { useQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/rankingApi';
import { useSeasonStore } from '../store/seasonStore';

const useGetSeasons = () => {
  interface season {
    seasonId: number;
    startDate: string;
    endDate: string;
  }

  const { seasons, currentSeasonId, updateSeasons, updateCurrentSeasonId } =
    useSeasonStore(state => ({
      seasons: state.seasons,
      currentSeasonId: state.currentSeasonId,
      updateSeasons: state.updateSeasons,
      updateCurrentSeasonId: state.updateCurrentSeasonId,
    }));

  useQuery({
    queryKey: ['Seasons'],
    queryFn: getSeasons,
    onSuccess: data => {
      console.log(data);
      updateSeasons(data);
      updateCurrentSeasonId(Object.values(data[data.length - 1])[0]);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  console.log(seasons);
  console.log(currentSeasonId);

  return {
    seasons,
    currentSeasonId,
  };
};

export default useGetSeasons;
