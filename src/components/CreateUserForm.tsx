import { useState } from 'react';
import { useCreateUser } from '../hooks/useCreateUser';

export const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { mutate, isPending, isError, error, isSuccess, reset } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, email, phone },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPhone('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Create user</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>

      {isSuccess && (
        <p style={{ color: 'green' }}>
          user created <button onClick={() => reset()}>Ok</button>
        </p>
      )}
      {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
};