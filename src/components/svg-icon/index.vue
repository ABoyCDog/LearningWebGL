<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed } from "vue";

defineOptions({
  name: "SvgIcon",
});

interface Props {
  // 图标名称
  name: string;
  // 图标前缀
  prefix?: string;
  // 图标大小
  size?: number | string;
  // 图标颜色
  color?: string;
  // 是否旋转
  spin?: boolean;
  // 是否禁用
  disabled?: boolean;
}

// 默认参数
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  size: 16,
  color: "",
  spin: false,
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

// 获取样式
const getStyle = computed((): CSSProperties => {
  const { size, color } = props;
  let s = `${size}`;
  s = `${s.replace("px", "")}px`;
  return {
    width: s,
    height: s,
    color,
  };
});
</script>

<template>
  <svg
    :class="[
      'svg-icon',
      $attrs.class,
      spin && 'svg-icon--spin',
      disabled && 'svg-icon--disabled',
    ]"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;

  &--spin {
    animation: loadingCircle 3s infinite linear;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

@keyframes loadingCircle {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
