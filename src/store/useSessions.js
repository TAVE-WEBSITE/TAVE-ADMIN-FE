import { useQuery } from '@tanstack/react-query';
import { getSession } from '../api/session';

export function useSessions() {
    return useQuery({
        queryKey: ['sessions'],
        queryFn: getSession,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
