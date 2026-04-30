import { useUsers } from '../hooks/useUsers';
import { useDeleteUser } from '../hooks/useDeleteUser';

interface Props {
  onSelectUser: (id: number) => void;
  selectedUserId: number | null;
}

export const UserList = ({ onSelectUser, selectedUserId }: Props) => {
  const { data: users, isLoading, isError, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const handleDelete = (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation(); // чтобы клик по кнопке не выбирал юзера
    if (window.confirm(`Delete user "${name}"?`)) {
      deleteUser(id);
    }
  };

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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <strong>{user.name}</strong> — {user.email} ({user.address.city})
          </span>
          <button
            onClick={(e) => handleDelete(e, user.id, user.name)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};