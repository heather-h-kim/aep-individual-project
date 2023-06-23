import { useQuery } from '@tanstack/react-query';
import { getRandomFacts } from '../services/randomFactApi';
import { useDemoStore } from '../store/demoStore';

const useRandomFacts = () => {
  const updateRandomFact = useDemoStore(state => state.updateRandomFact);
  const randomFactsQuery = useQuery({
    queryKey: ['Random'],
    queryFn: getRandomFacts,
  });

  const randomFacts = () => {
    if (randomFactsQuery.data) {
      console.log(randomFactsQuery.data);
      updateRandomFact(randomFactsQuery.data);
    }
  };

  return {
    randomFacts,
  };
};

export default useRandomFacts;
