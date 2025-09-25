import { login } from "~/services/authService";
import type { LoginRequest, LoginResponse } from "~/types/auth";

export const useAuth = () => {
  const errorMessage = ref("");
  const isLoading = ref(false);

  const handleLogin = async (data: LoginRequest) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response: LoginResponse = await login(data);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigateTo("/dashboard");
      }
    } catch (error) {
      errorMessage.value = "Invalid email or password. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    errorMessage,
    isLoading,
    handleLogin,
  };
};
