<script setup lang="ts">
import useSettingFoldStore from '@/stores/modules/setting';

import { nextTick, ref, watch } from 'vue';
const flag = ref(true)
let useSetting = useSettingFoldStore()
watch(() => useSetting.refresh, () => {
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  })
})

</script>

<template>
  <RouterView v-slot="{ Component }">

    <Transition  name="fade">
      <component :is="Component" v-if="flag"></component>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
