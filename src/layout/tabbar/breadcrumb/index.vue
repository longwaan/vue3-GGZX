<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';


</script>

<template>
  <div class="breadcrumb_container">
    <div class="folder_container">
      <el-icon>
        <Fold />
      </el-icon>
    </div>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb_container {
  display: flex;


  .folder_container{
    margin-right: 10px;
  }
}
</style>
