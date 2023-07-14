import { useQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/rankingApi';

const useGetSeasons = () => {
  useQuery({
    queryKey: ['Seasons'],
    queryFn: getSeasons,
    onSuccess: data => console.log(data),
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });
};

export default useGetSeasons;
