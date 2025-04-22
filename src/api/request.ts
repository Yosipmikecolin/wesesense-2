import { User, UserPost } from "@/db/user";
import { axiosConfig } from "./config";
import {
  FormDataCarrier,
  FormDataCarrierPost,
} from "@/views/view-create-carrier/interfaces";
import { Requester, RequesterPost } from "@/db/requester";
import {
  RequestPost,
  RequestTable,
} from "@/views/view-create-request/interfaces";
import axios from "axios";

//* USERS

export const getUsers = async () => {
  return (await axiosConfig.get<User[]>("/users")).data;
};

export const addUser = async (user: UserPost) => {
  return await axiosConfig.post("/users/", user);
};

export const updatedUser = async (user: User) => {
  return await axiosConfig.put(`/users/${user._id}`, user);
};

export const deleteUser = async (id: string) => {
  return (await axiosConfig.delete(`/users/${id}`)).data;
};

//* PORTADORES

export const getCarriers = async () => {
  return (await axiosConfig.get<FormDataCarrier[]>("/carriers")).data;
};

export const addCarrier = async (carrier: FormDataCarrierPost) => {
  return await axiosConfig.post("/carriers/", carrier);
};

export const updatedCarrier = async (carrier: FormDataCarrier) => {
  return await axiosConfig.put(`/carriers/${carrier._id}`, carrier);
};

export const deleteCarrier = async (id: string) => {
  return (await axiosConfig.delete(`/carriers/${id}`)).data;
};

//* REQUIRENTES

export const getRequesters = async () => {
  return (await axiosConfig.get<Requester[]>("/requesters")).data;
};

export const addRequester = async (requester: RequesterPost) => {
  return await axiosConfig.post("/requesters/", requester);
};

export const updatedRequester = async (requester: Requester) => {
  return await axiosConfig.put(`/requesters/${requester._id}`, requester);
};

export const deleteRequester = async (id: string) => {
  return (await axiosConfig.delete(`/requesters/${id}`)).data;
};

//* SOLICITUDES

export const getRequest = async () => {
  return (await axiosConfig.get<RequestTable[]>("/requests")).data;
};

export const addRequest = async (request: RequestPost) => {
  return await axiosConfig.post("/requests/", request);
};

export const updatedRequest = async (request: RequestTable) => {
  return await axiosConfig.put(`/requests/${request._id}`, request);
};

//* PORTADORES

export const getCarriersAPI = async () => {
  return (
    await axios.get<{
      grid: {
        rows: {
          id: string;
          first_name: string;
          surname: string;
          email: string;
          line_1: string;
          line_2: string;
          line_3: string;
          city: string;
          county: string;
          telephone: string;
        }[];
      };
    }>("/api/buddie?method=setup.wearer.grid")
  ).data;
};
