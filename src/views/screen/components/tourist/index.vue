<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { reqTouristData } from '@/api/screen';
import type { TouristData } from '@/api/screen/type';
//水球图拓展插件
import 'echarts-liquidfill';

//获取节点
let charts = ref();
let myChart: echarts.ECharts | null = null;
let timer: number | null = null;

// 响应式数据
const touristData = ref<TouristData>({
  current: 0,
  total: 0,
  data: []
});

// 获取实时游客数据
const getTouristData = async () => {
  try {
    const result = await reqTouristData();
    if (result.code === 200 && result.ok) {
      touristData.value = result.data;
      updateChart();
    }
  } catch (error) {
    console.error('获取实时游客数据失败:', error);
  }
};

// 更新图表
const updateChart = () => {
  if (!myChart) return;

  myChart.setOption({
    series: [{
      type: 'liquidFill',
      data: touristData.value.data,
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '78%',
      center: ['50%', '50%'],
      color: ['#0ff', '#0ff', '#0ff'],
      label: {
        show: true,
        position: 'inside',
        formatter: function(params: any) {
          return `{value|${Math.round(params.value * 100)}%}\n{label|当前游客}`;
        },
        rich: {
          value: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff'
          },
          label: {
            fontSize: 16,
            color: 'white'
          }
        }
      },
      backgroundStyle: {
        borderWidth: 1,
        color: 'transparent'
      },
      outline: {
        show: true,
        borderDistance: 3,
        itemStyle: {
          borderColor: '#0ff',
          borderWidth: 2
        }
      }
    }],
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    }
  });
};

onMounted(() => {
  myChart = echarts.init(charts.value);
  getTouristData();
  
  // 30秒自动刷新数据
  timer = setInterval(() => {
    getTouristData();
  }, 30000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>{{ touristData.total }}</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in touristData.current.toString()" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>