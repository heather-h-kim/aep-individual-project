import { useQuery } from '@tanstack/react-query';
import { getGifs } from '../services/giphyApi';

const Giphy = () => {
  const gifQuery = useQuery({
    queryKey: ['Gif'],
    queryFn: getGifs,
  });

  if (gifQuery.data) {
    console.log(gifQuery.data);

    return (
      <div>
        <img src={gifQuery.data.data[0].images.original.url} />
      </div>
    );
  }
};

export default Giphy;
