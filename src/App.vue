<script setup lang="ts">
import ResizableBox from '../dist/elk-resize.js'
import '../dist/style.css'
</script>

<template>
  <ResizableBox
    :initialWidth="500"
    :initialHeight="500"
    :minWidth="300"
    :minHeight="300"
    :showDimension="true"
    :showPosition="true"
  >
    <div
      style="display: flex; flex-direction: column; width: 600px; height: 600px"
    >
      <h2>Harbin - Harbin</h2>
      <p>
        Central Street is a famous pedestrian street located in Harbin, China.
        It was built in 1900 and was originally named "China Street" with a
        total length of about 1,400 meters. It is one of the most historical and
        cultural commercial streets in Harbin and the longest pedestrian street
        in Asia. Central Street is famous for its unique European architectural
        style.
      </p>
      <img
        style="
          flex: 1;
          max-width: 500px;
          max-height: 500px;
          width: 100%;
          height: 100%;
        "
        src="https://api.lostelk.cn/files/808/serve?size=large"
        alt=""
        srcset=""
      />
    </div>
  </ResizableBox>
</template>

<style scoped></style>
