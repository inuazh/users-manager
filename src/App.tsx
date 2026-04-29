import { useState } from 'react';
import { UserList } from './components/UserList';
import { UserDetail } from './components/UserDetail';

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Users Manager</h1>
      <UserList
        onSelectUser={setSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <UserDetail userId={selectedUserId} />
    </div>
  );
}

export default App;