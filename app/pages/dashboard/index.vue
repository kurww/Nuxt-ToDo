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
  fetchTaskList,
} = useTaskList();

const {
  isLoading: taskLoading,
  errorMessage: taskError,
  updateTaskStatus,
  deleteTask,
} = useTask();

/* --- Added reactive localTasks and watcher to sync with currentTasklist --- */
const localTasks = ref([]); // Array<Task> inferred

watch(
  currentTasklist,
  (newVal) => {
    localTasks.value = newVal?.tasks ? [...newVal.tasks] : [];
  },
  { immediate: true }
);

/* --- Use localTasks for UI, keep sorting logic via computed --- */
const tasks = computed(() => {
  return [...localTasks.value].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
  });
});

/* --- Toggle task (optimistic update + revert on failure) --- */
const toggleTask = async (id) => {
  const idx = localTasks.value.findIndex((t) => t.id === id);
  if (idx === -1) return;

  const original = { ...localTasks.value[idx] };
  localTasks.value[idx].completed = !localTasks.value[idx].completed; // optimistic

  try {
    await updateTaskStatus(id, { completed: localTasks.value[idx].completed });
    // server will also refresh via composable; watcher will reconcile if needed
  } catch (e) {
    // revert on error
    localTasks.value[idx] = original;
    throw e;
  }
};

/* --- Delete task (optimistic removal + revert if backend fails) --- */
const toggleDelete = async (id) => {
  const idx = localTasks.value.findIndex((t) => t.id === id);
  if (idx === -1) return;

  const backup = [...localTasks.value];
  // optimistic remove
  localTasks.value.splice(idx, 1);

  try {
    await deleteTask(id);
    // success: composable will refresh backend state; watcher keeps in sync
  } catch (e) {
    // revert on error
    localTasks.value = backup;
    throw e;
  }
};

/* --- Fetch on mount --- */
onMounted(async () => {
  await fetchTaskList();
});

/* --- active/completed counts using local tasks --- */
const activeCount = computed(
  () => tasks.value.filter((task) => !task.completed).length
);
const completedCount = computed(
  () => tasks.value.filter((task) => task.completed).length
);
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
        <h1 class="text-xl font-bold text-gray-800 mb-4">Todo Tasks.</h1>
        <!-- Loading/Error -->
        <div v-if="tasklistLoading" class="text-center py-12">
          <p class="text-gray-500">Loading...</p>
        </div>
        <p v-if="tasklistError" class="text-red-500 text-center">
          {{ tasklistError }}
        </p>
        <div v-if="taskError" class="text-red-500 text-center mb-4">
          {{ taskError }}
        </div>
        <!-- Task List -->
        <div class="bg-white p-6 rounded-4xl shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-400">Diary Task.</h2>

            <NuxtLink
              to="/dashboard/create"
              class="flex items-center bg-black mr-4 text-white px-2 py-2 rounded-full hover:bg-white hover:text-black transition-colors font-medium z-10"
            >
              <Plus :size="20" :stroke-width="3" />
            </NuxtLink>
          </div>
          <div v-if="tasks.length > 0" class="space-y-2 h-48 overflow-scroll">
            <div
              v-for="task in tasks"
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
                  ></svg>
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
                <div class="flex-shrink-0 mr-4">
                  <button
                    @click="toggleDelete(task.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
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
