<script setup lang="ts">
import { onMounted, } from 'vue';
import useCategoryStore from '@/stores/modules/category';

let categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})

const getC1 = () => (
  categoryStore.getC1()
)

const handler = () => {
  categoryStore.getC2()
}

const handler2 = () => {
  categoryStore.getC3()
}


</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true" style="width: 100%;">
        <el-form-item label="一级分类" prop="name">
          <el-select v-model="categoryStore.c1Id" placeholder="请选择" @change="handler">
            <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="zone">
          <el-select v-model="categoryStore.c2Id" placeholder="请选择" @change="handler2">
            <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" prop="time">
          <el-select v-model="categoryStore.c3Id" placeholder="请选择">
            <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-select {
  width: 240px;
}
</style>
