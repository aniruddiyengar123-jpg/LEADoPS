import { api } from "../../../lib/api";
import type { User } from "../../../types/api";

export type AuthResponse = {
  user: User;
  token: string;
};

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: { name: string; email: string; password: string; role: User["role"] }) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}
