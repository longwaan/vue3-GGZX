<script setup lang="ts">
import { reqAgeData } from '@/api/screen';
import type { AgeItem } from '@/api/screen/type';
import * as echarts from 'echarts'
import { nextTick, onMounted, ref } from 'vue';

const charts = ref()
const ageData = ref<AgeItem[]>([])
const getAgeData = async () => {
  let result = await reqAgeData()
  if (result.code === 200) {
    ageData.value = result.data
  }
}
const initCharts = async () => {
  await nextTick(getAgeData)
  if (!charts.value) return;
  const myChart = echarts.init(charts.value)

  const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    right: '10',
    orient :'vertical',
    textStyle:{
      fontSize:16,
      color:'white',
    }
  },
  series: [
    {
      name: '年龄比例',
      type: 'pie',
      radius: ['40%', '70%'],
      // avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
      },
      label: {
        show: true,
        position: 'inner',
        fontSize:14,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 34,
          // fontWeight: 'bold'
          color:'white',
        }
      },
      labelLine: {
        show: false
      },
      data: ageData.value
    }
  ]
}

  myChart.setOption(option)




}

onMounted(() => {
  initCharts()
})
</script>

<template>
  <div class="box1">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt=""></img>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scoped>
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
}

.title {
  color: white;

}
.charts{
  height: 260px;
}
</style>
