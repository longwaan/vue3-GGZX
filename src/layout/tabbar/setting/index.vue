<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import useSettingFoldStore from '@/stores/modules/setting';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import useUserStore from '@/stores/modules/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const useSetting = useSettingFoldStore()
const isfullscreen = ref(false)
const { refresh } = storeToRefs(useSetting)
const UserStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
let dark = ref<boolean>(false)
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

const logout = async () => {
  await UserStore.logoutUser();
  $router.push({ path: '/login', query: { redirect: $route.path } })

}

const changeDark = () => {
  let html = document.documentElement
  dark.value ? html.className = 'dark' : html.className = '';
}


</script>

<template>
  <div class="setting_container">
    <div>
      <el-button icon="refresh" circle @click="updateRefresh"></el-button>
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-popover title="主题设置" :width="200" trigger="hover">
        <el-form label-width="80px">
          <el-form-item label="主题颜色"">A</el-form-item>
            <el-form-item label=" 暗黑模式"">
            <el-switch @change="changeDark" v-model="dark" active-action-icon="Sunny" inactive-action-icon="Moon" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button icon="Setting" circle></el-button>
        </template>
      </el-popover>
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
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
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
