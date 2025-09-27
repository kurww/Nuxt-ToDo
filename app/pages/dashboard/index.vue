<script setup>
import { Plus } from "lucide-vue-next";
import { ArrowLeft } from "lucide-vue-next";

definePageMeta({
  middleware: "auth",
});

// Use composables
const { user, logout } = useAuth();
const {
  currentTasklist,
  isLoading: tasklistLoading,
  errorMessage: tasklistError,
  fetchCurrentTasklist,
} = useTaskList();
const {
  tasks,
  isLoading: taskLoading,
  errorMessage: taskError,
  fetchTasks,
} = useTask();

// Fetch tasklist and tasks on mount
onMounted(async () => {
  await fetchCurrentTasklist();
  await fetchTasks();
});

// Computed properties for filtering (adapt to tasks)
const filter = ref("all"); // 'all', 'active', 'completed'
const filteredTasks = computed(() => {
  switch (filter.value) {
    case "active":
      return tasks.value.filter((task) => !task.completed);
    case "completed":
      return tasks.value.filter((task) => task.completed);
    default:
      return tasks.value;
  }
});

const activeCount = computed(
  () => tasks.value.filter((task) => !task.completed).length
);
const completedCount = computed(
  () => tasks.value.filter((task) => task.completed).length
);

// Methods (adapt to tasks; add toggle, delete if needed)
const toggleTask = (id) => {
  // Implement toggle via API if available; for now, local update
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
};
</script>

<template>
  <div class="flex flex-col min-h-screen justify-between bg-gray-100">
    <button
      @click="logout"
      class="absolute top-10 left-5 border-3 rounded-full z-20"
      to="/"
    >
      <ArrowLeft :stroke-width="3" />
    </button>
    <div
      class="min-h-1/4 bg-emerald-400 py-4 px-4 relative overflow-visible text-emerald-400"
    >
      <div class="max-w-md mx-auto">
        <!-- Header -->
        <div class="text-center mt-8 flex flex-col gap-y-6 items-center">
          <img
            src="/man.jpeg"
            alt="Man"
            width="96"
            height="96"
            class="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            Welcome {{ user?.name || "User" }}
          </h1>
          <NuxtLink
            to="/dashboard/create"
            class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors font-medium z-10"
          >
            <Plus :size="20" :stroke-width="3" />
            Add Task
          </NuxtLink>
        </div>
      </div>
      <div
        class="absolute -top-25 -left-5 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
      ></div>
      <div
        class="absolute -top-15 -left-25 z-10 h-40 w-40 rounded-full bg-emerald-600 opacity-50"
      ></div>
      <!-- triangle bottom -->
      <svg
        class="absolute left-0 right-0 -bottom-6 w-full h-12"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="-110,0 50,20 200,0" fill="currentColor" />
      </svg>
      <img
        src="/bicycle.png"
        alt="Bicycle"
        class="absolute left-3/5 -bottom-[250px] transform -translate-x-1/2 z-10 md:hidden"
      />
    </div>
    <div class="min-h-1/4 py-4 px-4 z-20">
      <div class="max-w-md mx-auto min-h-">
        <h1 class="text-xl font-bold text-gray-800 mb-4">
          Tasks in {{ currentTasklist?.title || "My Tasks" }}
        </h1>
        <!-- Loading/Error -->
        <div v-if="tasklistLoading || taskLoading" class="text-center py-12">
          <p class="text-gray-500">Loading...</p>
        </div>
        <p v-if="tasklistError || taskError" class="text-red-500 text-center">
          {{ tasklistError || taskError }}
        </p>
        <!-- Task List -->
        <div class="bg-white p-6 rounded-4xl shadow-md">
          <div
            v-if="filteredTasks.length > 0"
            class="space-y-2 h-48 overflow-scroll"
          >
            <div
              v-for="task in filteredTasks"
              :key="task.id"
              class="bg-white overflow-hidden"
            >
              <div class="flex items-center">
                <button
                  @click="toggleTask(task.id)"
                  class="flex-shrink-0 w-5 h-5 border-2 border-black flex items-center justify-center mr-4 transition-colors"
                  :class="
                    task.completed ? 'bg-emerald-400' : 'hover:border-gray-400'
                  "
                >
                  <svg
                    v-if="task.completed"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>
                <div class="flex-1 min-w-0">
                  <p
                    :class="[
                      'text-lg break-words',
                      task.completed ? 'text-gray-500' : 'text-gray-800',
                    ]"
                  >
                    {{ task.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg
                class="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-700 mb-2">No tasks yet</h3>
            <p class="text-gray-500">Add your first task to get started!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
