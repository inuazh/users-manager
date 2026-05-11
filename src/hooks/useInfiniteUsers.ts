import { useInfiniteQuery } from '@tanstack/react-query';
import { getUsersPaginated } from '../api/users.api';
import type { User } from '../api/users.api';

const PAGE_SIZE = 3;

export const useInfiniteUsers = () => {
  return useInfiniteQuery<
  User[],
  Error,
  {pages: User[][]; pageParams: number[]},
  string[],
  number>
  ({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam }) => getUsersPaginated(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
  });
};