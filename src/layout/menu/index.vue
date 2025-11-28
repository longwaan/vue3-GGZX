<script setup lang="ts">
import Menus from '@/layout/menu/index.vue'
defineProps(['menuList'])
</script>

<template>
  <el-menu unique-opened router>
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由的菜单 -->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <div>
              {{ item.meta.title }}
            </div>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由,但是只有一个子路由的菜单 -->
      <template v-else-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由,有多个子路由的菜单 -->
      <el-sub-menu v-else-if="item.children && item.children.length > 1" :index="item.path" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
        <!-- 使用当前组件的名称递归渲染子菜单 -->
        <Menus :menuList="item.children"></Menus>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu{
  // background-color:transparent;
  background-color:#808080;
  --el-menu-border-color:transparent;
}

</style>