/* import { FormDataCarrier } from "@/views/view-create-carrier/interfaces";
import { initDB } from "./db";

export const addCarrier = async (request: FormDataCarrier) => {
  const db = await initDB();
  const tx = db.transaction("carrier", "readwrite");
  await tx.store.put(request);
  await tx.done;
};

export const getCarrier = async (): Promise<FormDataCarrier[]> => {
  const db = await initDB();
  const tx = db.transaction("carrier", "readonly");
  const store = tx.objectStore("carrier");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteCarrier = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("carrier", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
 */