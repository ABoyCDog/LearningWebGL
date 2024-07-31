<script lang="ts" setup>
import { computed, onMounted } from 'vue';

// 主页面
defineOptions({
  name: 'LayoutMain',
});
</script>

<template>
  <section class="app-main">
    <router-view></router-view>
  </section>
</template>

<style lang="less" scoped>
.app-main {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
