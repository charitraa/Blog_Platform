// src/hooks/useCurrentUser.ts
import { useUser } from './User';

export const useCurrentUser = () => {
  const { user } = useUser();
  return user;
};
