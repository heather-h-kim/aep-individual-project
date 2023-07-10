import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';
import { useDistractionStore } from '../store/distractionStore';

const useGetGifs = () => {
  const updateGif = useDistractionStore(state => state.updateGif);

  return useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
    onSuccess: data => updateGif(data),
    refetchOnWindowFocus: false,
  });
};

export default useGetGifs;
