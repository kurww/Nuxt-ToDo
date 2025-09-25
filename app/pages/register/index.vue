<script setup>
import { ArrowLeft } from "lucide-vue-next";

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
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
        <div class="text-center mb-10 space-y-5">
          <h1 class="text-2xl font-bold">Welcome Onboard!</h1>
          <p class="text-gray-600">Let's help you meet up your task</p>
        </div>
        <form class="flex flex-col items-center text-center space-y-20">
          <div class="flex flex-col items-center space-y-4">
            <TextInput
              v-model="fullName"
              type="text"
              placeholder="Full Name"
              maxlength="100"
            />
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
            <TextInput
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              maxlength="100"
            />
          </div>
          <NuxtLink
            to="/register"
            class="w-[70%] md:w-[50%] py-2 bg-emerald-600 text-white font-bold"
          >
            Get Started
          </NuxtLink>
        </form>
      </div>

      <p class="text-gray-600 font-bold mb-10">
        Already have an account ?
        <NuxtLink to="/login" class="text-emerald-600">Sign In</NuxtLink>
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
