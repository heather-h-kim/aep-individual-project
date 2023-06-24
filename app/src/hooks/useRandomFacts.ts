import { useQuery } from '@tanstack/react-query';
import { getRandomFacts } from '../services/randomFactApi';
import { useDemoStore } from '../store/demoStore';

const useRandomFacts = () => {
  const updateRandomFact = useDemoStore(state => state.updateRandomFact);

  return useQuery({
    queryKey: ['Random'],
    queryFn: getRandomFacts,
    onSuccess: data => updateRandomFact(data),
    refetchOnWindowFocus: false,
  });
};

export default useRandomFacts;
