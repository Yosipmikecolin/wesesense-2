/* import { FormDataRequest } from "@/views/view-create-request/interfaces";
import { initDB } from "./db";

export const addRequest = async (user: FormDataRequest) => {
  const db = await initDB();
  const tx = db.transaction("request", "readwrite");
  await tx.store.put(user);
  await tx.done;
};

export const getRequest = async (): Promise<FormDataRequest[]> => {
  const db = await initDB();
  const tx = db.transaction("request", "readonly");
  const store = tx.objectStore("request");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteRequest = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("request", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
 */