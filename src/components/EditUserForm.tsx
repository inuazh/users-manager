import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import type { User } from '../api/users.api';

interface Props {
  userId: number;
}

export const EditUserForm = ({ userId }: Props) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <p>Loading form...</p>;
  if (!user) return null;

  return <EditUserFormInner user={user} />;
};

const EditUserFormInner = ({ user }: { user: User }) => {
  const { mutate, isPending, isError, error, isSuccess } = useUpdateUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: user.id, dto: { name, email, phone } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h3>Edit user</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
      {isSuccess && <p style={{ color: 'green' }}>Saved!</p>}
      {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
};