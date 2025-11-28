<script setup lang="ts">
import logo from "@/layout/logo/index.vue"
import menus from "@/layout/menu/index.vue"
import useUserStore from "@/stores/modules/user";
import tabbar from '@/layout/tabbar/index.vue'
import useSettingFoldStore from "@/stores/modules/setting";
let useStore = useUserStore()
let useSettingStore = useSettingFoldStore()
</script>

<template>
  <el-container>
    <el-aside :class="{ fold: useSettingStore.fold ? true : false }">
      <logo :fold="useSettingStore.fold"></logo>
      <el-scrollbar>
        <menus :collapse="useSettingStore.fold ? true : false" :menuList="useStore.menuRoutes"></menus>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header :class="{ fold: useSettingStore.fold ? true : false }">
        <tabbar></tabbar>
      </el-header>
      <el-main :class="{ fold: useSettingStore.fold ? true : false }">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  overflow: hidden;
}

.el-aside {
  background-color: gray;
  width: 15%;
  overflow: hidden;

  &.fold {
    width: $base-min-menu-width;
    transition: all 0.3s;
  }



  .el-scrollbar {
    height: calc(100vh - $base-menu-1ogo-height);
  }
}

.el-main {
  padding: 20px;

  &.fold {
    width: calc(100vw - $base-min-menu-width);
    transition: all 0.3s;
  }
}

.el-header {
  padding: 10px 20px;

  &.fold {
    width: calc(100vw - $base-min-menu-width);
    transition: all 0.3s;
  }

}
</style>
