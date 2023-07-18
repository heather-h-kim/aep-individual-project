import { useQuery } from '@tanstack/react-query';
import { getAllSeasons } from '../services/rankingApi';
import { useSeasonStore } from '../store/seasonStore';

const useGetSeasons = () => {
  interface season {
    seasonId: number;
    startDate: string;
    endDate: string;
  }

  const {
    allSeasons,
    seasonsToDate,
    currentSeason,
    currentSeasonId,
    updateAllSeasons,
    updateSeasonsToDate,
    updateCurrentSeason,
    updateCurrentSeasonId,
  } = useSeasonStore(state => ({
    allSeasons: state.allSeasons,
    seasonsToDate: state.seasonsToDate,
    currentSeason: state.currentSeason,
    currentSeasonId: state.currentSeasonId,
    updateAllSeasons: state.updateAllSeasons,
    updateSeasonsToDate: state.updateSeasonsToDate,
    updateCurrentSeason: state.updateCurrentSeason,
    updateCurrentSeasonId: state.updateCurrentSeasonId,
  }));

  useQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
    onSuccess: data => {
      console.log(data);
      updateAllSeasons(data);
      const array = [];
      for (const season of data) {
        if (new Date(season.startDate).getTime() < Date.now()) {
          array.push(season);
        }
      }
      updateSeasonsToDate(array);
      updateCurrentSeason(array[array.length - 1]);
      updateCurrentSeasonId(Object.values(array[array.length - 1])[0]);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });
};

export default useGetSeasons;
