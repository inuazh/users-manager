import { useState } from "react";
import { UserList } from "./components/UserList";
import { UserDetail } from "./components/UserDetail";
import { CreateUserForm } from "./components/CreateUserForm";
import { EditUserForm } from "./components/EditUserForm";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Users Manager</h1>
      <SearchBar/>
      <CreateUserForm />
      <UserList
        onSelectUser={setSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <UserDetail userId={selectedUserId} />
      {selectedUserId && <EditUserForm key={selectedUserId} userId={selectedUserId} />}
    </div>
  );
}

export default App;
