<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import type { AttrList } from '@/api/product/attr/type';
import Category from '@/components/Category/index.vue'
import { ref, watch } from 'vue';
import useCategoryStore from '@/stores/modules/category';
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let attrData = ref<AttrList>([])

watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getAttr()
  }
})

const getAttr = async () => {
  let result = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id)
  console.log(result)
  attrData.value = result.data
}

const addAttr = () => {
  scene.value = 1;

}

const cancel = () => {
  scene.value = 0;

}
</script>

<template>
  <div>
    <Category></Category>
    <el-card style="margin-top: 20px;">
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" @click="addAttr">添加平台属性</el-button>
        <el-table :data="attrData" style="width: 100%" border>
          <el-table-column label="序号" width="100" type="index" align="center"/>
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column label="属性名称值">
            <template #="{ row, index }">
              <el-tag type="primary" v-for="(item, index) in row.attrValueList" style="margin-left: 5px;">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button type="warning" icon="Edit"></el-button>
            <el-button type="danger" icon="Delete"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form ref="formRef" :model="form">
          <el-form-item label="属性名称" prop="name">
            <el-input v-model="input" placeholder="请输入" />
          </el-form-item>
          <el-form-item>
            <el-button icon="Plus" type="primary">添加属性值</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号" width="100" />
            <el-table-column prop="name" label="属性值名称" />
            <el-table-column prop="address" label="操作">
              <el-button icon="Delete"></el-button>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
