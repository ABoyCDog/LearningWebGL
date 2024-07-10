<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <!-- 配置路由出口 -->
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.app-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-color-quattuordecenary);
}
</style>
