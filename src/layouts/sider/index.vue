<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { basicRoutes as menus } from '@/router/modules/basic';

// 监听路由变化，修改菜单激活栏
const route = useRoute();
const router = useRouter();

const isCollapse = ref(true); // 侧边栏是否折叠
const activePath = ref();

watch(
  () => route.meta.activePath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      activePath.value = newPath;
    }
  },
  {
    immediate: true,
  },
);

const defaultOpenArr = menus.map((item) => item.path);

const linkTo = (name: string | any, path: string | any) => {
  activePath.value = path;
  router.push({ name });
};

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<template>
  <div :class="['sider-container', isCollapse ? 'sider-collapse' : 'sider-open']">
    <div class="collapse-icon" @click="toggleCollapse">
      <svg-icon size="24" name="menu-open" />
    </div>
    <div class="collapse-content">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu"
        :collapse="isCollapse"
        :default-active="activePath"
        :default-openeds="defaultOpenArr"
      >
        <el-sub-menu v-for="item in menus" :key="item.path" :index="item.path">
          <template #title>
            <svg-icon size="24" :name="item.meta.icon" class="svg-class" />
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-if="item.children">
            <el-menu-item
              v-for="el in item.children"
              :key="el.meta?.acitvePath"
              @click="linkTo(el.name, el.path)"
              :index="el.meta?.activePath"
              >{{ el.meta?.title }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

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
  height: 100%;
  // min-height: 100vh;
  // left: 0;
  // top: 0;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  .collapse-icon {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .collapse-content {
    .el-menu {
      background-color: #000000;
      border-right: none;
    }
    .el-menu-item-group__title {
      padding: 0;
    }
  }
}
</style>
