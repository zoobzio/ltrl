<script setup lang="ts">
const { data: variants } = await useAsyncData("variants", () =>
  $fetch("/api/variants"),
);
</script>

<template>
  <div>
    <Button v-for="v in variants" :variant="v" />
  </div>
</template>
