import { useQuery } from '@tanstack/react-query';
import { getRandomFacts } from '../services/randomFactApi';

const RandomFacts = () => {
  const randomFactsQuery = useQuery({
    queryKey: ['Random'],
    queryFn: getRandomFacts,
  });

  if (randomFactsQuery.data) {
    console.log(randomFactsQuery.data);

    return (
      <div>
        <h1>{randomFactsQuery.data}</h1>
      </div>
    );
  }
};

export default RandomFacts;
