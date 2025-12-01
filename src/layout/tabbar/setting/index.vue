<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import useSettingFoldStore from '@/stores/modules/setting';
import { storeToRefs } from 'pinia';
const useSetting=useSettingFoldStore()
const {refresh}=storeToRefs(useSetting)
const updateRefresh = () => {
  refresh.value=!refresh.value
  // console.log('1111')
}



</script>

<template>
  <div class="setting_container">
    <div>
      <el-button icon="refresh" circle @click="updateRefresh"></el-button>
      <el-button icon="FullScreen" circle></el-button>
      <el-button icon="Setting" circle></el-button>
    </div>
    <div class="avatar_container">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.setting_container {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
}
</style>
