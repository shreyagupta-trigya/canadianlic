export const findNameByIdUsers = (id, users) => {
  const user = users.find(user => user.id === id);
  return user ? user.name : 'Unknown';
};

export const columnMapping = (col) => col.key;
