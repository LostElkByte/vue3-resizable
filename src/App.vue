<script setup lang="ts">
import ResizableBox from '@/components/resizableBox.vue'
</script>

<template>
  <ResizableBox
    :initialWidth="200"
    :initialHeight="200"
    :minWidth="100"
    :minHeight="100"
    :maxWidth="500"
    :maxHeight="500"
    :showDimension="true"
    :showPosition="true"
  >
    <img
      style="width: 600px; height: 600px"
      src="https://api.lostelk.cn/files/808/serve?size=large"
      alt=""
      srcset=""
    />
  </ResizableBox>
</template>

<style scoped></style>
