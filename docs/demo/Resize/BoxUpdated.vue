<template>
  <div class="container">
    <LResize
      @boxUpdated="handleBoxUpdated"
      :initialWidth="200"
      :initialHeight="200"
      :initialTop="100"
      :initialLeft="100"
      :minWidth="200"
      :minHeight="200"
    >
      <div class="content">
        <div>Width: {{ boxState.width }}</div>
        <div>Height: {{ boxState.height }}</div>
        <div>Top: {{ boxState.top }}</div>
        <div>Left: {{ boxState.left }}</div>
      </div>
    </LResize>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const boxState = ref({} as any)

const handleBoxUpdated = (newBoxState) => {
  boxState.value = newBoxState
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  color: #fff;
  background-color: #409eff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
