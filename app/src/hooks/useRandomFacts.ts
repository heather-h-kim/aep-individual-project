import { useQuery } from '@tanstack/react-query';
import { getRandomFacts } from '../services/randomFactApi';
import { useDistractionStore } from '../store/distractionStore';

const useRandomFacts = () => {
  const updateRandomFact = useDistractionStore(state => state.updateRandomFact);

  return useQuery({
    queryKey: ['Random'],
    queryFn: getRandomFacts,
    onSuccess: data => updateRandomFact(data),
    refetchOnWindowFocus: false,
  });
};

export default useRandomFacts;
