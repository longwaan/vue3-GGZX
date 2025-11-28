<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'

</script>

<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabbar_right">
      <setting></setting>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
