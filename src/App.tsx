import  { useState } from 'react';
import Login from './components/Login';
import KanbanBoard from './components/KanbanBoard';
import { User } from './types';
import { store } from './store';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    store.logout();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <KanbanBoard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
 