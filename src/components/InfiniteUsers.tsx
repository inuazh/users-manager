import { useEffect, useRef } from 'react';
import { useInfiniteUsers } from '../hooks/useInfiniteUsers';
import type { User } from '../api/users.api';

export const InfiniteUsers = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteUsers();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Infinite users</h3>
      {data?.pages.map((page, i) => (
        <ul key={i}>
          {page.map((u: User) => <li key={u.id}>{u.name}</li>)}
        </ul>
      ))}
      <div ref={loaderRef}>
        {isFetchingNextPage && 'Loading more...'}
        {!hasNextPage && 'No more users'}
      </div>
    </div>
  );
};