import { useUsers } from '../hooks/useUsers';

export const UserList = () => {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return <p>loading users...</p>;
  }

  if (isError) {
    return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  }

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email} ({user.address.city})
        </li>
      ))}
    </ul>
  );
};