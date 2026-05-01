import { api } from "./axios";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
  };
  company: {
    name: string;
  };
}

export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const getUser = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export const createUser = async (dto: CreateUserDto): Promise<User> => {
  const { data } = await api.post<User>("/users", dto);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const updateUser = async (
  id: number,
  dto: UpdateUserDto,
): Promise<User> => {
  const { data } = await api.put<User>(`/users/${id}`, dto);
  return data;
};
