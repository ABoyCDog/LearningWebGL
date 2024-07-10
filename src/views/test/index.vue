<template>
  <div>
    <div id="mapCOntainer"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
#mapCOntainer {
  width: 100%;
  height: 100vh;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
