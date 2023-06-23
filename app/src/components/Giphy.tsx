import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';
import { useDemoStore } from '../store/demoStore';

export const Giphy = () => {
  const gif = useDemoStore(state => state.gif);
  const updateGif = useDemoStore(state => state.updateGif);

  const gifQuery = useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
  });

  if (gifQuery.data) {
    // console.log(gifQuery.data);
    updateGif(gifQuery.data);
  }

  //   return (
  //     <div>
  //       <img src={gifQuery.data.data[0].images.original.url} />
  //     </div>
  //   );
  // }
};

// export default Giphy;
