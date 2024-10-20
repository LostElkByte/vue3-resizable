<template>
  <div class="container">
    <LResize
      :showDimension="true"
      :showPosition="true"
      :initialWidth="366"
      :initialHeight="251"
    >
      <div class="content">
        <img
          style="width: 100%; height: 100%"
          src="https://api.lostelk.cn/files/798/serve?size=large"
          alt="示例图片"
        />
      </div>
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
