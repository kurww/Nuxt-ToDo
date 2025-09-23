<script setup></script>
<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-6">
    <div
      class="absolute -top-25 -left-5 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
    <div
      class="absolute -top-15 -left-25 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
    <img src="/sofa.png" class="mt-20 mb-10" />
    <div class="text-center mb-7 space-y-10">
      <h1 class="text-2xl font-bold">Get things done with TODo</h1>
    </div>
    <div class="flex flex-col items-center text-center space-y-15 w-[70%]">
      <p class="max-w-md font-bold">
        Lorem ipsum dolor sit amet, consectetur adipisicing. Maxime, tempore!
        Animi nemo aut atque, deleniti nihil dolorem repellendus.
      </p>
      <NuxtLink
        to="/register"
        class="w-full md:w-[50%] py-2 bg-emerald-600 text-white font-bold"
      >
        Get Started
      </NuxtLink>
    </div>
  </div>
</template>
