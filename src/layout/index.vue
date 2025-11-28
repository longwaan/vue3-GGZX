<script setup lang="ts">
import logo from "@/layout/logo/index.vue"
import menus from "@/layout/menu/index.vue"
import useUserStore from "@/stores/modules/user";
let useStore =useUserStore()
</script>

<template>
  <el-container>
    <el-aside>
      <logo></logo>
      <el-scrollbar>
       <menus :menuList="useStore.menuRoutes"></menus>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: gray;
  width: 15%;
  .el-scrollbar{
    height: calc(100vh - $base-menu-1ogo-height);
  }
}

.el-main {
  padding: 20px;
}
</style>
