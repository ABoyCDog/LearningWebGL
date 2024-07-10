<script setup lang="ts">
import { router } from "@/router";
import { ref } from "vue";

// import { defineProps } from "vue";

const count = ref(0);

const goToTest = () => {
  console.log("goToTest");
  router.push({ name: "testIndex" });
};
</script>

<template>
  <h1>WebGLLearing Home Page</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="goToTest()">test组件</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
