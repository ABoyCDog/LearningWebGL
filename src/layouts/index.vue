<template>
  <div class="layouts">
    <!-- 侧边栏 -->
    <Sider />
    <!-- 主体内容 -->
    <Main />
  </div>
</template>

<script setup lang="ts">
import Sider from "./sider/index.vue";
import Main from "./main/index.vue";
</script>

<style lang="less" scoped>
.layouts {
  display: flex;
}
</style>
