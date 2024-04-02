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
      <span>lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk</span>
      <img
        width="100px"
        height="100px"
        src="https://api.lostelk.cn/files/808/serve?size=large"
        alt=""
        srcset=""
      />
    </div>

    <!-- <div style="width: 300px; height: 300px;">
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
    </div> -->

    <!-- <img
      src="https://api.lostelk.cn/files/808/serve?size=large"
      alt=""
    /> -->

    <!-- <span>lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk   lostElk</span> -->
  </ResizableBox>
</template>

<style scoped></style>
