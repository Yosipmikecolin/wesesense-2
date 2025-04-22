export interface User {
  _id: string;
  name: string;
  nit: string;
  perfil: string;
  status: string;
  email: string;
  phone: string;
  creation_date: string;
}

export interface UserPost {
  name: string;
  nit: string;
  perfil: string;
  status: string;
  email: string;
  phone: string;
  creation_date: string;
}

/* export const addUser = async (user: User) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  await tx.store.put(user);
  await tx.done;
};

export const getUsers = async (): Promise<User[]> => {
  const db = await initDB();
  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteUser = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
 */
