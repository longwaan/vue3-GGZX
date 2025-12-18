<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import Map from '@/views/screen/components/map/index.vue'
import Tourist from '@/views/screen/components/tourist/index.vue'
import Sex from '@/views/screen/components/sex/index.vue'
import Age from '@/views/screen/components/age/index.vue'
import Couter from '@/views/screen/components/couter/index.vue'
import Rank from '@/views/screen/components/rank/index.vue'
import Year from '@/views/screen/components/year/index.vue'
import Top from '@/views/screen/components/top/index.vue'
import Line from '@/views/screen/components/line/index.vue'

let drawTiming: any = null; // 防抖定时器
// 配置基准参数
const baseWidth = 1920;
const baseHeight = 1080;
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5)); // 1.77778
// * 默认缩放值 - 修复类型定义
const scale = {
  width: 1,
  height: 1,
};

// 动态计算逻辑
function calcRate() {
  const appRef = document.querySelector(".screen");
  // 添加null检查
  if (!appRef) return;

  const currentRate = parseFloat(
    (window.innerWidth / window.innerHeight).toFixed(5)
  );

  if (currentRate > baseProportion) {
    // 宽屏模式：保持高度基准，横向自适应
    scale.width = (window.innerHeight * baseProportion) / baseWidth;
    scale.height = window.innerHeight / baseHeight;
  } else {
    // 高屏模式：保持宽度基准，纵向自适应
    scale.height = window.innerWidth / baseProportion / baseHeight;
    scale.width = window.innerWidth / baseWidth;
  }

  // 添加类型断言确保appRef有style属性
  (appRef as HTMLElement).style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`;
}

// 屏幕分辨率变化时候触发（防抖处理）
function resize() {
  clearTimeout(drawTiming);
  drawTiming = setTimeout(() => {
    calcRate();
  }, 200);
}

onMounted(() => {
  // 初始化计算
  calcRate();
  // 监听窗口变化
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  // 清理事件监听
  window.removeEventListener("resize", resize);
  console.log("组件卸载");
});
</script>

<template>
  <div class="parent-container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
}

.screen {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  // transform-origin: left top;
  width: 1920px;
  height: 1080px;

}

.top {
  width: 100%;
  height: 40px;
}

.bottom {
  display: flex;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;

    .tourist {
      flex: 1.2;

    }

    .sex {
      flex: 1;
    }

    .age {
      flex: 1;
    }
  }

  .center {
    flex: 2;
    display: flex;
    flex-direction: column;

    .map {
      flex: 3;

    }

    .line {
      flex: 1;
    }
  }

  .right {
    flex: 1;

    .rank {
      flex: 1.2;
    }

    .year {
      flex: 1;
    }

    .couter {
      flex: 1;
    }

  }
}
</style>