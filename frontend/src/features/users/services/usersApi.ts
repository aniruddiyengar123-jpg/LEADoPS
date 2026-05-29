import { api } from "../../../lib/api";
import type { User, UserRole } from "../../../types/api";

export async function getUsers() {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function createUser(payload: { name: string; email: string; password: string; role: UserRole }) {
  const { data } = await api.post<User>("/users", payload);
  return data;
}

export async function updateUser(id: string, payload: Partial<Pick<User, "name" | "role" | "isActive">>) {
  const { data } = await api.patch<User>(`/users/${id}`, payload);
  return data;
}

