import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "~/types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await $fetch("http://localhost:5713/auth/login", {
    method: "POST",
    body: data,
  });
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  return await $fetch("http://localhost:5713/auth/register", {
    method: "POST",
    body: data,
  });
};
