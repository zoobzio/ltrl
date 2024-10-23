<script setup lang="ts">
defineProps<{
  variant: LtrlTupleItem<"buttonVariants">;
}>();
const label = useNuxtLtrl("buttonLabels");
</script>

<template>
  <button>
    {{ label.resolve(variant) }}
  </button>
</template>
