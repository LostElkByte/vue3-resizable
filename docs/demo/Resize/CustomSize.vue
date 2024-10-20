<template>
  <div class="container">
    <LResize
      :minWidth="100"
      :minHeight="100"
      :maxWidth="400"
      :maxHeight="300"
      :initialWidth="300"
      :initialHeight="200"
      :initialTop="50"
      :initialLeft="50"
    >
      <div class="content">自定义尺寸和位置</div>
    </LResize>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 400px;
  position: relative;
}
.content {
  color: #fff;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
