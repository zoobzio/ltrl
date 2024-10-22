<script setup lang="ts">
defineProps<{
  variant: LtrlTupleItem<"buttonVariants">;
}>();
const label = useNuxtEnum("buttonLabels");
</script>

<template>
  <button>
    {{ label.resolve(variant) }}
  </button>
</template>
