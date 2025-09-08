export {};

import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return { user, login, logout };
};
