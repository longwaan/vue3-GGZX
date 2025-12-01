<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/stores/modules/user';
let UserStore=useUserStore()
onMounted(()=>{
  UserStore.getUserInfo()
})

</script>

<template>
  <div>
    首页
  </div>
</template>

<style lang="scss" scoped></style>
