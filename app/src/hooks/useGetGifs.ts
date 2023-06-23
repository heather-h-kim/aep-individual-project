import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';
import { useDemoStore } from '../store/demoStore';

const useGetGifs = () => {
  const updateGif = useDemoStore(state => state.updateGif);
  const gifQuery = useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
  });

  const giphy = () => {
    if (gifQuery.data) {
      console.log(gifQuery.data);
      updateGif(gifQuery.data);
    }
  };

  return {
    giphy,
  };
};

export default useGetGifs;
