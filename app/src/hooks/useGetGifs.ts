import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';
import { useDistractionStore } from '../store/distractionStore';

const useGetGifs = () => {
  const updateGif = useDistractionStore(state => state.updateGif);

  return useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
    onSuccess: data => updateGif(data),
    onError: error =>
      console.log('something went wrong while getting gifs', error),
    refetchOnWindowFocus: false,
  });
};

export default useGetGifs;
