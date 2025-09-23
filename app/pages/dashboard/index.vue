<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Plus } from "lucide-vue-next";

// Reactive data
const todos = ref([]);
const newTodo = ref("");
const filter = ref("all"); // 'all', 'active', 'completed'

// Computed properties
const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.completed);
    case "completed":
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});

const activeCount = computed(
  () => todos.value.filter((todo) => !todo.completed).length
);
const completedCount = computed(
  () => todos.value.filter((todo) => todo.completed).length
);

// Methods
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false,
      createdAt: new Date(),
    });
    newTodo.value = "";
  }
};

const toggleTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

const clearCompleted = () => {
  todos.value = todos.value.filter((t) => !t.completed);
};

const toggleAll = () => {
  const allCompleted = todos.value.every((todo) => todo.completed);
  todos.value.forEach((todo) => {
    todo.completed = !allCompleted;
  });
};

// Load todos from localStorage on mount
onMounted(() => {
  const savedTodos = localStorage.getItem("nuxt-todos");
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});

// Save todos to localStorage whenever todos change
watch(
  todos,
  (newTodos) => {
    localStorage.setItem("nuxt-todos", JSON.stringify(newTodos));
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col min-h-screen justify-between bg-gray-100">
    <div
      class="min-h-1/4 bg-emerald-400 py-4 px-4 relative overflow-visible text-emerald-400"
    >
      <div class="max-w-md mx-auto">
        <!-- Header -->
        <div class="text-center mt-8 flex flex-col gap-y-6">
          <img
            src="/man.jpeg"
            alt="Man"
            width="96"
            height="96"
            class="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Welcome Name</h1>
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
        <!-- Add Todo Form -->
        <div class="bg-white p-6 rounded-4xl shadow-md">
          <form @submit.prevent="addTodo" class="mb-6">
            <div class="flex gap-2">
              <input
                v-model="newTodo"
                type="text"
                placeholder="Diary Task."
                class="flex-1 pt-3 border-b-2 border-gray-300 focus:outline-none focus:border-transparent text-lg font-bold placeholder-gray-400"
                maxlength="100"
              />
              <button
                type="submit"
                class="px-2 py-2 bg-black rounded-full text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors font-medium"
                :disabled="!newTodo.trim()"
              >
                <Plus :size="25" :stroke-width="3" />
              </button>
            </div>
          </form>

          <!-- Todo List -->
          <div class="mb-6 space-y-2 h-48 overflow-scroll">
            <div
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="bg-white overflow-hidden"
            >
              <div class="flex items-center">
                <!-- Checkbox -->
                <button
                  @click="toggleTodo(todo.id)"
                  class="flex-shrink-0 w-5 h-5 border-2 border-black flex items-center justify-center mr-4 transition-colors"
                  :class="
                    todo.completed ? 'bg-emerald-400 ' : 'hover:border-gray-400'
                  "
                >
                  <svg
                    v-if="todo.completed"
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

                <!-- Todo Text -->
                <div class="flex-1 min-w-0">
                  <p
                    :class="[
                      'text-lg break-words',
                      todo.completed ? 'text-gray-500 ' : 'text-gray-800',
                    ]"
                  >
                    {{ todo.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredTodos.length === 0 && todos.length > 0"
            class="text-center py-8"
          >
            <div class="text-gray-400 mb-4">
              <svg
                class="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p class="text-gray-500 text-lg">
              {{
                filter === "active" ? "No active tasks" : "No completed tasks"
              }}
            </p>
          </div>

          <div v-if="todos.length === 0" class="text-center py-12">
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
            <h3 class="text-xl font-medium text-gray-700 mb-2">No todos yet</h3>
            <p class="text-gray-500">Add your first task to get started!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
