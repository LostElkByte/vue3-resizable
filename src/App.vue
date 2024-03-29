<script setup lang="ts">
import ResizableBox from '@/components/resizableBox.vue'
</script>

<template>
  <ResizableBox
    :initialWidth="200"
    :initialHeight="200"
    :minWidth="100"
    :minHeight="100"
    :maxWidth="300"
    :maxHeight="300"
  ></ResizableBox>
</template>

<style scoped></style>
