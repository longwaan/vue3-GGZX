<script setup lang="ts">
import { reqTradeList } from '@/api/product/trademark'
import type { Record, TradeMarkResponseData } from '@/api/product/trademark/type'
import { onMounted, ref } from 'vue'

const trademarkArr = ref<Record>([])
const pageNO = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>()
const getTradeMarkList = async () => {
  let result: TradeMarkResponseData = await reqTradeList(pageNO.value, pageSize.value)
  console.log(result)
  if (result.code === 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }

}

onMounted(() => {
  getTradeMarkList()
})
const addTrademark = () => {
  console.log(11111111)
}

const change = () => {
  getTradeMarkList()
}
</script>

<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addTrademark" icon="Plus">添加商品品牌</el-button>
      <el-table :data="trademarkArr" style="width: 100%;margin: 20px 0px;" border>
        <el-table-column label="序号" type="index" width="100px" align="center" />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column label="品牌logo">
          <template #="{ row, index }">
            <img :src="row.logoUrl" style="width: 100px;height: 100px;"></img>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #="{ row, index }">
            <el-button type="primary" icon="Edit"></el-button>
            <el-button type="primary" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNO" v-model:page-size="pageSize" :page-sizes="[5, 10, 30, 40]"
        :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @change="change" />

    </el-card>

  </div>
</template>

<style lang="scss" scoped></style>
