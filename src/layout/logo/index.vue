<script setup lang="ts">
import { ref } from "vue";
import logoImg from "../../../public/logo.png"
let logo = ref(logoImg);
</script>

<template>
  <div class="logo_container">
    <img :src="logo" alt="">
    <h1 style="color: white;">硅谷甄选</h1>
  </div>
</template>

<style lang="scss" scoped>
.logo_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $base-menu-1ogo-height;

  img {
    width: 40px;
    margin-right: 10px;
  }
}
</style>
