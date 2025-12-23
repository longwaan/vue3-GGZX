<script setup lang="ts">
import { reqSexData } from '@/api/screen';
import * as echarts from 'echarts'
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const charts = ref()

const sexData = ref({
  female: 0,
  male: 0,
})

const getSexData = async () => {
  let result = await reqSexData()
  if (result.code === 200) {
    sexData.value = result.data
  }

}


const initCharts = async () => {
  await nextTick(getSexData)
  if (!charts.value) return
  //图标实例化
  const myChart = echarts.init(charts.value)
  const male = sexData.value.male
  const female = sexData.value.female

  const option = {
    title: {
      text: '男女比例',
      textStyle: {
        fontSize: 16,
        color: 'white',
        fontStyle: 'normal',
      },
      left:'40%',
      bottom:'70'

    },
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [male],
        z: 10,
        barWidth: 20,
        itemStyle: {
          borderRadius: 20,
          color: 'skyblue',
        },
      },
      {
        type: 'bar',
        data: [100],
        barGap: '-100%',
        barWidth: 20,
        itemStyle: {
          borderRadius: 20,
          color: 'pink',
        }

      }
    ],
    grid: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    }


  }

  myChart.setOption(option)

}

onMounted(() => {
  initCharts()
  // getSexData()

})

onUnmounted(() => {

})


</script>

<template>
  <div class="box1">
    <div class="title">
      <p>性别比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex-container">
      <div class="man">
        <img src="../../images/man.png" alt=""></img>
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt=""></img>
      </div>
    </div>
    <div class="rate">
      <p>男生{{ sexData.male }}%</p>
      <p>女生{{ sexData.female }}%</p>
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
  margin: 20px 0px;

  .title {

    p {
      
      color: white;
    }
  }

  .sex-container {
    display: flex;
    justify-content: center;
          margin: 20px;

    .man {
      // margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .woman {
      // margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    color: white;
    display: flex;
    justify-content: space-between;
  }

  .charts {
    height: 100px;
  }
}
</style>
