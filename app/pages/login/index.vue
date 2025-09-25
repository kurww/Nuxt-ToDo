<script setup>
import { ArrowLeft } from "lucide-vue-next";

definePageMeta({
  middleware: "guest",
});

const email = ref("");
const password = ref("");
const { errorMessage, isLoading, handleLogin } = useAuth();

const onSubmit = () => {
  handleLogin({ email: email.value, password: password.value });
};
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <NuxtLink class="absolute top-10 left-5 border-3 rounded-full z-20" to="/">
      <ArrowLeft :stroke-width="3" />
    </NuxtLink>
    <div
      class="flex flex-col items-center min-h-screen justify-between z-20 pt-30"
    >
      <div>
        <div class="text-center mb-7 space-y-5">
          <h1 class="text-2xl font-bold">Welcome Back!</h1>
        </div>
        <form
          @submit.prevent="onSubmit"
          class="flex flex-col items-center text-center space-y-7"
        >
          <div class="flex flex-col items-center space-y-4">
            <img class="md:h-44 w-auto" src="/standing.png" />
            <TextInput
              v-model="email"
              type="text"
              placeholder="Email Address"
              maxlength="100"
            />
            <TextInput
              v-model="password"
              type="password"
              placeholder="Password"
              maxlength="100"
            />
          </div>
          <p class="text-gray-600 font-bold mb-5">
            Forgot Password?
            <NuxtLink to="/register" class="text-emerald-600">Reset</NuxtLink>
          </p>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-[70%] md:w-[50%] py-2 bg-emerald-600 text-white font-bold disabled:opacity-50 :hover:bg-emerald-700 rounded-lg"
          >
            {{ isLoading ? "Signing In..." : "Sign In" }}
          </button>
          <!-- Display error message if login fails -->
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </form>
      </div>

      <p class="text-gray-600 font-bold mb-10">
        Don't have an account ?
        <NuxtLink to="/register" class="text-emerald-600">Sign up</NuxtLink>
      </p>
    </div>

    <div
      class="absolute -top-25 -left-5 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
    <div
      class="absolute -top-15 -left-25 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
  </div>
</template>
