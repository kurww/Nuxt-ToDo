import { login, register } from "~/services/authService";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "~/types/auth";

export const useAuth = () => {
  const errorMessage = ref("");
  const isLoading = ref(false);
  const token = useCookie("access_token");
  const user = useCookie("user");

  const handleLogin = async (data: LoginRequest) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: LoginResponse = await login(data);
      if (response.status === 200) {
        token.value = response.data.access_token;
        user.value = response.data.user;
        navigateTo("/dashboard");
      }
    } catch (error) {
      errorMessage.value = "Invalid email or password. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: RegisterResponse = await register(data);
      if (response.status === 200) {
        // After register, redirect to login or auto-login
        navigateTo("/login");
      }
    } catch (error) {
      errorMessage.value = "Registration failed. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo("/login");
  };

  return {
    errorMessage,
    isLoading,
    handleLogin,
    handleRegister,
    logout,
    user,
  };
};
