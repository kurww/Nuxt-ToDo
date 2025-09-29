import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "~/types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const config = useRuntimeConfig();
  return await $fetch(`${config.public.apiBase}/auth/login`, {
    method: "POST",
    body: data,
  });
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const config = useRuntimeConfig();
  return await $fetch(`${config.public.apiBase}/auth/register`, {
    method: "POST",
    body: data,
  });
};
