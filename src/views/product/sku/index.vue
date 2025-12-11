<script setup lang="ts">
import { reqCancelSale, reqOnSale, reqSkuInfo, reqSkuList } from '@/api/product/sku';
import type { SkuData, } from '@/api/product/sku/type';
import { reqSpuImageList } from '@/api/product/spu';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>()
const skuTableData = ref<SkuData[]>([])
const drawer = ref<boolean>(false)
const skuInfo = ref<SkuData>()
const getSku = async () => {
  let result: any = await reqSkuList(pageNo.value, pageSize.value)
  // console.log(result)
  if (result.code === 200) {
    skuTableData.value = result.data.records;
    total.value = result.data.total
  }

}
onMounted(() => {
  getSku()
})

const updateSale = async (row: any) => {
  if (row.isSale == 1) {
    let result = await reqCancelSale(row.id)
    console.log(result)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功'
      })
      row.isSale == 0
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败'
      })
    }

  } else {
    let result1 = await reqOnSale(row.id)
    console.log(result1)
    if (result1.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功'
      })
      row.isSale == 1

    } else {
      ElMessage({
        type: 'error',
        message: '上架失败'
      })
    }

  }
  getSku()
}

const edit = (row: any) => {
  ElMessage({
    type: 'info',
    message: '此功能正在开发中',
  })
}

const detail = async (row: SkuData) => {
  drawer.value = true
  let result: any = await reqSkuInfo(row.id as number)
  // let result1:any=await reqSpuImageList(row.tmId as number)
  skuInfo.value = result.data
  // console.log(result1)

}
</script>

<template>
  <el-card>
    <el-table :data="skuTableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column label="图片">
        <template #="{ row, index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 40px;height: 40px;">
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, index }">
          <el-button type="primary" :icon="row.isSale == 0 ? 'Top' : 'Bottom'" size="small" @click="updateSale(row)"
            :title="row.isSale == 0 ? '上架' : '下架'"></el-button>
          <el-button type="primary" icon="Edit" size="small" @click="edit(row)" title="编辑"></el-button>
          <el-button type="primary" icon="InfoFilled" size="small" title="详情" @click="detail(row)"></el-button>
          <el-button type="danger" icon="Delete" size="small" title="删除"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 50]"
      :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @change="getSku()" />
  </el-card>

  <el-drawer v-model="drawer" title="查看商品详细">
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">名称</el-col>
      <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">描述</el-col>
      <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">价格</el-col>
      <el-col :span="18">{{ skuInfo?.price }}</el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">平台属性</el-col>
      <el-col :span="18">
        <el-tag type="primary" v-for="(item, index) in skuInfo?.skuAttrValueList" :key="item.id">{{ item.valueName
        }}</el-tag>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">销售属性</el-col>
      <el-col :span="18">
        <el-tag type="primary" v-for="(item, index) in skuInfo?.skuSaleAttrValueList" :key="item.id">{{
          item.saleAttrValueName }}</el-tag>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0;">
      <el-col :span="6">商品图片</el-col>
      <el-col :span="18">
        <!-- <el-carousel height="150px">
          <el-carousel-item v-for="item in skuInfo?.skuImageList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel> -->

        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in skuInfo?.skuImageList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
