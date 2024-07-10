<template>
  <div class="sider-container">
    <div class="collapse-icon" @click="toggleCollapse">
      <svg-icon size="24" name="menu-open" />
    </div>
    <div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        default-active="3"
        class="el-menu"
        collapse-transition="false"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <svg-icon size="20" name="earth-white" class="svg-class" />
            <span>CesiumJS</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="2">
          <svg-icon size="20" name="earth-1" class="svg-class" />
          <template #title>ThreeJS</template>
        </el-menu-item>
        <el-menu-item index="3">
          <svg-icon size="20" name="earth-2" class="svg-class" />
          <template #title>BabylonJS</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";

// 侧边栏是否折叠
const isCollapse = ref(true);

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  // width: 200px;
  // min-height: 400px;
}

.svg-class {
  margin: 4px;
}

.sider-container {
  // position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #333333;
  .collapse-icon {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
