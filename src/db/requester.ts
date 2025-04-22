interface RequesterBase {
  fullName: string;
  lastName: string;
  middleName: string;
  email: string;
  run: string;
  phone: string;
  userType: string;
  institution: string;
  identificationNumber: string;
  region: string;
  address: string;
  accessAreas: string;
  identityVerification: string;
  securityQuestion: string;
  registrationDate: string;
  observations: string;
}

export interface Requester extends RequesterBase {
  _id: string;
}

export type RequesterPost = RequesterBase;

/* export const addRequester = async (request: Requester) => {
  const db = await initDB();
  const tx = db.transaction("requester", "readwrite");
  await tx.store.put(request);
  await tx.done;
};

export const getRequester = async (): Promise<Requester[]> => {
  const db = await initDB();
  const tx = db.transaction("requester", "readonly");
  const store = tx.objectStore("requester");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteRequester = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("requester", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
 */
