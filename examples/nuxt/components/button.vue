<script setup lang="ts">
import type { ButtonOptions } from '#build/types/ltrl';


defineProps<{
  variant: LtrlButtonVariants[number];
}>();
const label = useNuxtLtrl("buttonLabels");
const test: ButtonOptions.
</script>

<template>
  <button>
    {{ label.resolve(variant) }}
  </button>
</template>
