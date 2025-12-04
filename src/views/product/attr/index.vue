<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttr } from '@/api/product/attr';
import type { AttrList, Attr, AttrResponseData } from '@/api/product/attr/type';
import Category from '@/components/Category/index.vue'
import { reactive, ref, watch } from 'vue';
import useCategoryStore from '@/stores/modules/category';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let attrData = ref<AttrList>([])
let attrParam = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})

watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getAttr()
  }
})

const getAttr = async () => {
  let result = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id)
  // console.log(result)
  attrData.value = result.data
}

const addAttr = () => {
  Object.assign(attrParam, {
    attrName: '',
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: [],
  })

  scene.value = 1;

}

const cancel = () => {
  scene.value = 0;

}

const addAttrValue = () => {
  attrParam.attrValueList.push({
    valueName: '',
  })
}

const editAttr = (row: Attr) => {
  scene.value = 1
  console.log(row)
  Object.assign(attrParam, row)
}

const saveAttr = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParam)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParam.id ? '编辑成功' : '添加成功'
    })
    scene.value = 0
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParam.id ? '编辑失败' : '添加失败'
    })
    scene.value = 0
    getAttr()
  }
}
</script>

<template>
  <div>
    <Category></Category>
    <el-card style="margin-top: 20px;">
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" @click="addAttr"
          :disabled="categoryStore.c3Id ? false : true">添加平台属性</el-button>
        <el-table :data="attrData" style="width: 100%" border>
          <el-table-column label="序号" width="100" type="index" align="center" />
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column label="属性名称值">
            <template #="{ row, index }">
              <el-tag type="primary" v-for="(item, index) in row.attrValueList" style="margin-left: 5px;">{{
                item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, index }">
              <el-button type="warning" icon="Edit" @click="editAttr(row)"></el-button>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form>
          <el-form-item label="属性名称" prop="name">
            <el-input v-model="attrParam.attrName" placeholder="请输入" />
          </el-form-item>
          <el-form-item>
            <el-button icon="Plus" type="primary" :disabled="attrParam.attrName ? false : true"
              @click="addAttrValue">添加属性值</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
          <el-table :data="attrParam.attrValueList" style="width: 100%">
            <el-table-column label="序号" width="100" type="index" />
            <el-table-column label="属性值名称">
              <template #="{ row, index }">
                <el-input v-model="row.valueName" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <el-button icon="Delete"></el-button>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary" @click="saveAttr">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
