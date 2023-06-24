import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';
import { useDemoStore } from '../store/demoStore';

const useGetGifs = () => {
  const updateGif = useDemoStore(state => state.updateGif);

  return useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
    onSuccess: data => updateGif(data),
    refetchOnWindowFocus: false,
  });
};

export default useGetGifs;
