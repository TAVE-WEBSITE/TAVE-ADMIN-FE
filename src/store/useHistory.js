import { useQuery } from '@tanstack/react-query';
import { getManagerHistory } from '../api/history';

export function useHistories() {
  return useQuery({
    queryKey: ['histories'],
    queryFn: async () => {
      const data = await getManagerHistory();
      return Array.isArray(data) ? data.slice().reverse() : [];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
