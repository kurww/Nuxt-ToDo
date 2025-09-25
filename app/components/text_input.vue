<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  maxlength: { type: [String, Number], default: 100 },
  classes: {
    type: String,
    default:
      "rounded-2xl bg-white text-black placeholder:text-gray-600 font-bold py-3 px-4 w-80",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :class="classes"
    :value="modelValue"
    @input="(e) => emit('update:modelValue', e.target.value)"
  />
</template>
