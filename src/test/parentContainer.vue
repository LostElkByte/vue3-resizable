<template>
  <ResizableBox
    :minWidth="100"
    :minHeight="100"
  >
    <div>这是一些可以自动调整大小的内容。</div>
  </ResizableBox>
</template>

<script setup lang="ts">
import ResizableBox from '@/components/resizableBox.vue'
</script>

<style lang="scss" scoped></style>
