import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../api/users.api';

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['users', 'search', query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 2,
  });
};