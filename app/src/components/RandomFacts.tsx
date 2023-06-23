import { useQuery } from '@tanstack/react-query';
import { getRandomFacts } from '../services/randomFactApi';
import { useDemoStore } from '../store/demoStore';

export const RandomFacts = () => {
  const randomFact = useDemoStore(state => state.randomFact);
  const updateRandomFact = useDemoStore(state => state.updateRandomFact);

  const randomFactsQuery = useQuery({
    queryKey: ['Random'],
    queryFn: getRandomFacts,
  });

  if (randomFactsQuery.data) {
    // console.log(randomFactsQuery.data);
    updateRandomFact(randomFactsQuery.data);

    // return (
    //   <div>
    //     <h1>{randomFactsQuery.data}</h1>
    //   </div>
    // );
  }
};

// export default RandomFacts;
