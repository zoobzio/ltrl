<script setup lang="ts">
defineProps<{
  variant: LtrlValue<"buttonVariants">[number];
}>();
const label = useNuxtLtrl("buttonLabels");
</script>

<template>
  <button>
    {{ label.resolve(variant) }}
  </button>
</template>
