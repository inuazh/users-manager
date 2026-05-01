import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchUsers } from '../hooks/useSearchUsers';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const { data: results, isFetching } = useSearchUsers(debouncedQuery);

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFetching && <span> searching...</span>}
      {results && debouncedQuery.length >= 2 && (
        <ul>
          {results.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};