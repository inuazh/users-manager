import { useUsers } from '../hooks/useUsers';

interface Props {
  onSelectUser: (id: number) => void;
  selectedUserId: number | null;
}

export const UserList = ({ onSelectUser, selectedUserId }: Props) => {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {users?.map((user) => (
        <li
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          style={{
            padding: '8px',
            cursor: 'pointer',
            background: selectedUserId === user.id ? '#eef' : 'transparent',
            borderBottom: '1px solid #eee',
          }}
        >
          <strong>{user.name}</strong> — {user.email} ({user.address.city})
        </li>
      ))}
    </ul>
  );
};