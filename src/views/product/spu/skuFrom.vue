<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { SkuData, SpuImage } from '@/api/product/spu/type';
import { ElMessage, type TableInstance } from 'element-plus';
import { reactive, ref } from 'vue';
let $emit = defineEmits(['changeScene'])
let skuAttr = ref<any>([])
let skuSale = ref<any>([])
let imgAttr = ref<any>([])
const multipleTableRef = ref<any>()
const multipleSelection = ref<SpuImage[]>([])

let skuParam = reactive<SkuData>({
  category3Id: '', // 三级分类的ID
  spuId: '', // 已有的SPU的ID
  tmId: '',// SPU 品牌ID
  skuName: '', // SKU 名字
  price: "", // SKU 价格
  weight: "", // SKU 重量
  skuDesc: "", // SKU 描述
  skuAttrValueList: [], // 平台属性
  skuSaleAttrValueList: [
    {
      saleAttrId: '', // 销售属性ID
      saleAttrValueId: '', // 销售属性值ID
    }
  ], // 销售属性
  skuDefaultImg: "", // 售卖SKU图片地址
})

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
  skuParam.category3Id = spu.category3Id;
  skuParam.spuId = spu.id;
  skuParam.tmId = spu.tmId;
  let result = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1 = await reqSpuHasSaleAttr(spu.id)
  let result2 = await reqSpuImageList(spu.id)
  skuAttr.value = result.data
  skuSale.value = result1.data
  imgAttr.value = result2.data
}

const handleSelectionChange = (val: SpuImage[]) => {
  multipleSelection.value = val
}

const toggleSelection = (row: any) => {
  imgAttr.value.forEach((item: any) => {
    multipleTableRef.value.toggleRowSelection(item, false)
  })
  multipleTableRef.value.toggleRowSelection(row, true);
  skuParam.skuDefaultImg = row.imgUrl
}


const save = async () => {

  skuParam.skuAttrValueList = skuAttr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])

  skuParam.skuSaleAttrValueList = skuSale.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":")
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])

  const result = await reqAddSku(skuParam)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: 'sku添加成功'
    })

    $emit('changeScene', { flag: 0 ,params:''})
  } else {
    ElMessage({
      type: 'error',
      message: 'sku添加失败'
    })
  }
}

const cancel = () => {
  $emit('changeScene', { flag: 0,params:'' })
}

defineExpose({ initSkuData })
</script>

<template>
  <el-form ref="formRef" :model="skuParam" label-width="100px">
    <el-form-item label="sku名称">
      <el-input v-model="skuParam.skuName" placeholder="请输入sku名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuParam.price" placeholder="请输入价格(元)" type="number" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input v-model="skuParam.weight" placeholder="请输入重量(克)" type="number" />
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input v-model="skuParam.skuDesc" placeholder="请输入sku描述" type="textarea" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :model="skuAttr" label-width="auto" :inline="true">
        <el-form-item :label="item.attrName" v-for="(item, index) in skuAttr" :key="item.id">
          <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
            <el-option v-for="(item1, index) in item.attrValueList" :key="item.id" :label="item1.valueName"
              :value="`${item.id}:${item1.id}`" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :model="skuSale" label-width="auto" :inline="true">
        <el-form-item :label="item.saleAttrName" v-for="(item, index) in skuSale" :key="item.id">
          <el-select v-model="item.saleIdAndValueId" placeholder="请选择">
            <el-option v-for="(item1, index) in item.spuSaleAttrValueList" :label="item1.saleAttrValueName"
              :value="`${item.id}:${item1.id}`" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="multipleTableRef" :data="imgAttr" row-key="id" style="width: 100%"
        @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" />
        <el-table-column label="图片" width="120">
          <template #="{ row, index }">
            <img :src="row.imgUrl" style="width: 50px;height: 50px;">
          </template>
        </el-table-column>
        <el-table-column property="imgName" label="名称" />
        <el-table-column label="操作">
          <template #="{ row, index }">
            <el-button type="warning" @click="toggleSelection(row)">设置默认值</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-select {
  width: 100px;
}
</style>
