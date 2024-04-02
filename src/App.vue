<script setup lang="ts">
import ResizableBox from '@/components/resizableBox.vue'
</script>

<template>
  <ResizableBox
    :initialWidth="200"
    :initialHeight="200"
    :minWidth="100"
    :minHeight="100"
    :showDimension="true"
    :showPosition="true"
  >
    <div>
      <img
        width="50%"
        height="100%"
        src="https://api.lostelk.cn/files/808/serve?size=large"
        alt=""
        srcset=""
      />
      <img
        width="50%"
        height="100%"
        src="https://api.lostelk.cn/files/808/serve?size=large"
        alt=""
        srcset=""
      />
    </div>
  </ResizableBox>
</template>

<style scoped></style>
