<script setup lang="ts">
import { useAttrs } from "vue";

// 带有鼠标悬浮效果容器的svg图标组件
// 参数透传给svg-icon组件

defineOptions({
  name: "SvgHover",
});

defineProps({
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const $attrs = useAttrs();
const { onClick, ...attrs } = $attrs;
</script>

<template>
  <div
    class="svg-wrapper inline-flex p-6 cursor-pointer border-rd-4 hover:bg-[var(--bg-color-octonary)]"
    :class="{ disabled }"
  >
    <svg-icon v-bind="attrs" :name="name" />
  </div>
</template>

<style lang="less" scoped>
.svg-wrapper {
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
