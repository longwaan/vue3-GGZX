<script setup lang="ts">
import category from '@/components/Category/index.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import useCategoryStore from '@/stores/modules/category';
import { reqRemoveSpu, reqSkuList, reqSpu } from '@/api/product/spu';
import spuForm from './spuForm.vue';
import skuFrom from './skuFrom.vue';
import type { HasSpuResponseData, SkuData, SpuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let spuAttr = ref<SpuData[]>([])
let spu = ref<any>()
let sku = ref<any>()
let total = ref<number>()
let scene = ref<number>(0)//0：显示已有SPU 1：添加或者修改已有SPU  2：添加SKU的结构
let dialogVisible = ref<boolean>(false)
let skuDataList = ref<SkuData>()
const getCategory = () => {
  categoryStore.getC1()
}
onMounted(() => {
  getCategory()
})
const getSpu = async (page = 1) => {
  pageNo.value = page
  let result: HasSpuResponseData = await reqSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  spuAttr.value = result.data.records
  // console.log(result)
  total.value = result.data.total

}

watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getSpu();
  }
})

const pageChange = () => {
  getSpu(pageNo.value)
}


const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
  // console.log(row)
}

//切换场景
const changeScene = (obj: any) => {
  scene.value = obj.flag;
  if (obj.params == 'update') {
    getSpu(pageNo.value)
  } else {
    getSpu()
  }

}

//添加sku
const addSku = (row: SpuData) => {
  scene.value = 2
  // console.log(row)
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

const findSku = async (row: any) => {
  let result = await reqSkuList(row.id)
  skuDataList.value = result.data
  if (result.code === 200) {
    dialogVisible.value = true

  }
}

const deleteSpu = async (id: any) => {
  let result = await reqRemoveSpu(id)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
  getSpu(pageNo.value)
}

//路由组件销毁前，情况仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>

<template>
  <div>
    <category></category>
    <el-card style="margin-top: 20px;">
      <div v-show="scene === 0">
        <el-button icon="Plus" type="primary" @click="addSpu"
          :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
        <el-table :data="spuAttr" style="width: 100%;margin: 20px 0px;" border>
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="spuName" label="SPU名称" />
          <el-table-column prop="description" label="SPU描述" show-overflow-tooltip />
          <el-table-column label="操作">
            <template #="{ row, index }">
              <el-button icon="Plus" @click="addSku(row)" title="添加sku" type="primary" size="small"></el-button>
              <el-button icon="Edit" @click="updateSpu(row)" title="修改spu" type="warning" size="small"></el-button>
              <el-button icon="View" title="查看spu列表" type="info" size="small" @click="findSku(row)"></el-button>
              <el-popconfirm :title="`你确定要删除${row.spuName}?`" @confirm="deleteSpu(row.id)" width="200px">
                <template #reference>
                  <el-button icon="Delete" title="删除spu" type="danger" size="small"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 30, 40]"
          :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total" @change="pageChange" />
      </div>

      <spu-form ref="spu" v-show="scene === 1" @changeScene="changeScene"></spu-form>
      <sku-from ref="sku" v-show="scene === 2" @changeScene="changeScene"></sku-from>
    </el-card>


    <el-dialog v-model="dialogVisible" title="sku列表">
      <el-table :data="skuDataList" style="width: 100%">
        <el-table-column prop="skuName" label="SKU名称" />
        <el-table-column prop="price" label="SKU价格" " />
          <el-table-column  prop=" weight" label=" SKU重量" />
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 40px;height: 40px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
