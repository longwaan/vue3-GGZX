<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import useSettingFoldStore from '@/stores/modules/setting';
import { useRoute } from 'vue-router';
let useSettingStore = useSettingFoldStore()
let $route =useRoute()
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
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin-left: 5px;">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
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
