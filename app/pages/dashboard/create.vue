<script setup>
import { ArrowLeft } from "lucide-vue-next";

definePageMeta({
  middleware: "auth",
});

const task = ref("");
// Use the composable instead of direct logic
const { addTask, isLoading, errorMessage } = useTask();
const { currentTasklist, fetchCurrentTaskList } = useTaskList();

// Ensure we have a current tasklist
onMounted(async () => {
  await fetchCurrentTaskList();
});

const onSubmit = () => {
  if (!currentTasklist.value) {
    errorMessage.value = "No task list available";
    return;
  }
  addTask({
    title: task.value,
    completed: false,
    taskListId: currentTasklist.value.id,
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <NuxtLink
      class="absolute top-10 left-5 border-3 rounded-full z-20"
      to="/dashboard"
    >
      <ArrowLeft :stroke-width="3" />
    </NuxtLink>
    <div
      class="flex flex-col items-center min-h-screen justify-between z-20 pt-30"
    >
      <div>
        <div class="text-center mb-7 space-y-5">
          <h1 class="text-2xl font-bold">Welcome Onboard!</h1>
        </div>
        <form
          @submit.prevent="onSubmit"
          class="flex flex-col items-center text-center space-y-7"
        >
          <div class="flex flex-col items-center space-y-4">
            <img class="md:h-44 w-auto" src="/sit.png" />
            <p class="text-gray-500 font-bold">
              Add what you want to do later on.
            </p>
            <TextInput
              v-model="task"
              type="text"
              placeholder="Enter your task title"
              maxlength="100"
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading || !task.trim()"
            class="w-[70%] md:w-[50%] py-2 bg-emerald-600 text-white font-bold disabled:opacity-50"
          >
            {{ isLoading ? "Creating..." : "Add to list" }}
          </button>
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </form>
      </div>
    </div>

    <div
      class="absolute -top-25 -left-5 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
    <div
      class="absolute -top-15 -left-25 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
    ></div>
  </div>
</template>
