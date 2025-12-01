<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import useSettingFoldStore from '@/stores/modules/setting';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import useUserStore from '@/stores/modules/user';
const useSetting = useSettingFoldStore()
const isfullscreen = ref(false)
const { refresh } = storeToRefs(useSetting)
const UserStore=useUserStore()
const updateRefresh = () => {
  refresh.value = !refresh.value
  // console.log('1111')
}

const fullScreen = () => {
  if (!isfullscreen.value) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  isfullscreen.value = !isfullscreen.value
}



</script>

<template>
  <div class="setting_container">
    <div>
      <el-button icon="refresh" circle @click="updateRefresh"></el-button>
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button icon="Setting" circle></el-button>
    </div>
    <div class="avatar_container">
      <el-avatar :src="UserStore.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
        {{ UserStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item >退出登录</el-dropdown-item>
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
