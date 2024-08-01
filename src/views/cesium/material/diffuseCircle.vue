<script setup lang="ts">
import * as Cesium from 'cesium';
import { onMounted, onUnmounted } from 'vue';
import CircleDiffusion from '@/utils/diffuse';
import { useCesiumStore } from '@/stores/modules/cesium';

const cesiumStore = useCesiumStore();

const COORDINATE: any = [120.36, 36.09];

const initMap = () => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOGIwNmNlNS05NzQ1LTQyNDAtYjhjZS0wMTcwMDA5ZDM5YTEiLCJpZCI6MjExMTc5LCJpYXQiOjE3MTQwMzQyNTh9.d5T9KCyDmcOxYGbUnu6aKbCBBvXmDdBGuXaOvgGwXKE';
  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    timeline: false, // 是否显示时间线控件
    baseLayerPicker: false, // 是否显示底图
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    }),
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: 'http://data.marsgis.cn/terrain',
    // }),
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //   requestVertexNormals: true, //Needed to visualize slope
    // }),
    // 指定上下文
    // contextOptions: {
    //   requestWebgl1: true,
    // },
  });
  // 去除logo
  (viewer.cesiumWidget.creditContainer as any).style.display = 'none';
  // 显示帧率
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;

  cesiumStore.setViewer(viewer);

  viewer.camera.setView({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(COORDINATE[0], COORDINATE[1], 10000),
  });
};

// 扩散圆
const render = () => {
  const viewer = cesiumStore.viewer;
  const circleDiffusion = new CircleDiffusion(viewer);
  circleDiffusion.add([...COORDINATE, 10], {
    scanColor: '#F7EB08',
    maxRadius: 2000,
    duration: 3000,
  });
};

const clear = () => {
  const viewer = cesiumStore.viewer;
  const circleDiffusion = new CircleDiffusion(viewer);
  circleDiffusion.clear();
};

onMounted(() => {
  initMap();
});
onUnmounted(() => {
  clear();
});
</script>

<template>
  <div id="cesiumContainer" ref="viewerDivRef">
    <div class="btn">
      <el-button type="primary" @click="render">渲染</el-button>
      <el-button type="primary" @click="clear">清除</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
#cesiumContainer {
  width: cacl(100vw - 64px);
  height: 100vh;
}
.btn {
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 99;
}
</style>
