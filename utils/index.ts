import { USER_ID_KEY } from 'consts';
import { nanoid } from 'nanoid';

export const getUser = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  if (userId) {
    return userId;
  }

  // Generate a random id for user if it doesn't exist
  const generatedId = nanoid(8);
  localStorage.setItem(USER_ID_KEY, generatedId);
  return generatedId;
};
