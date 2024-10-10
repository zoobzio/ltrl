<script setup lang="ts">
const variants = useNuxtLtrl("buttonVariants");
</script>

<template>
  <div>
    <Button v-for="v in variants.value" :variant="v" />
  </div>
</template>
