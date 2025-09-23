<script setup>
// Set page title and meta tags for better mobile experience
useHead({
  title: "Todo App - Stay Organized",
  meta: [
    {
      name: "description",
      content: "A beautiful and responsive todo app built with Nuxt 3",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
    { name: "theme-color", content: "#3B82F6" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "apple-mobile-web-app-title", content: "Todo App" },
  ],
  link: [{ rel: "apple-touch-icon", href: "/favicon.ico" }],
});
</script>

<template>
  <div class="app-container">
    <main class="min-h-screen">
      <slot />
    </main>
  </div>
</template>

<style>
/* Ensure proper touch targets and mobile optimization */
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevent zoom on input focus on iOS */
input,
textarea,
select {
  font-size: 16px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
