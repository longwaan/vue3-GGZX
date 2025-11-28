<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import useSettingFoldStore from '@/stores/modules/setting';
let useSettingStore = useSettingFoldStore()

const changeIcon=()=>{
  useSettingStore.fold=!useSettingStore.fold
}

</script>

<template>
  <div class="breadcrumb_container">
    <div class="folder_container">
      
      <el-icon>
        <component :is="useSettingStore.fold?'Expand':'Fold'" @click="changeIcon"></component>
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
