import { useQuery } from "@tanstack/react-query";
import { getCarriers, getCarriersAPI, getRequest, getRequesters, getUsers } from "./request";

export const useQueryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useQueryCarriers = () => {
  return useQuery({
    queryKey: ["carriers"],
    queryFn: () => getCarriers(),
  });
};

export const useQueryRequesters = () => {
  return useQuery({
    queryKey: ["requesters"],
    queryFn: () => getRequesters(),
  });
};

export const useQueryRequest = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: () => getRequest(),
  });
};


export const useQueryCarriersApi = () => {
  return useQuery({
    queryKey: ["carriers"],
    queryFn: () => getCarriersAPI(),
  });
};