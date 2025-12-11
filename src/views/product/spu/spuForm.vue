<script setup lang="ts">
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqSpuHasSaleAttr, reqSpuImageList, reqTradeMark } from '@/api/product/spu';
import type { AllTradeMark, HasSaleAttr, SaleAttr, SpuData, SpuImage, TradeMark, SaleAttrValue, HasSaleAttrResponseData } from '@/api/product/spu/type';
import useUserStore from '@/stores/modules/user';
import { ElMessage, type InputInstance, type UploadProps } from 'element-plus';
import { computed, nextTick, ref } from 'vue';
let userStore = useUserStore()
const headers = { Token: userStore.token }
let $emit = defineEmits(['changeScene'])

//存储已有的SPU这些数据
let AllTradeMark = ref<TradeMark[]>([]);
//商品图片
let imgList = ref<SpuImage[]>([]);
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//tag
const inputValue = ref('')
// const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
//存储已有的SPU对象
let SpuParams = ref<SpuData>({
  category3Id: "",
  spuName: "",
  description: "",
  tmId: "",
  spuSaleAttrList: [],
  spuImageList: [],

})



//编辑spu
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  let result: AllTradeMark = await reqTradeMark()
  let result1 = await reqSpuImageList(spu.id as number)
  let result2 = await reqSpuHasSaleAttr(spu.id as number)
  let result3 = await reqAllSaleAttr()
  AllTradeMark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles)
  const result: any = uploadFile.response
  if (result.code === 200)
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
}

// 图片预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 图片上传前校验
const handleUpdate: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/png') {
    if (rawFile.size / 1024 / 1024 < 3)
      return true
    else {
      ElMessage({
        type: 'warning',
        message: '图片大小不能超过3MB'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'warning',
      message: '请上传png、jpg、gif格式的图片'
    })
    return false
  }
}

//计算未选的销售值
const unSelectSaleAttr = computed(() => {
  let unSelectSaleArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectSaleArr

})

let saleAttrIdAndValueName = ref<string>("")


//新增销售属性
const addSaleAttr = () => {


  //分割格式赋值
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')

  let newSale: SaleAttr = {
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName: String(saleAttrName),
    spuSaleAttrValueList: [],
  }

  saleAttr.value.push(newSale);

  //清空选择
  saleAttrIdAndValueName.value = ''
}


//tag
const handleClose = (row: any, index: number) => {
  row.spuSaleAttrValueList.splice(index, 1)
}

// const showInput = (row:any) => {
//   row.flag = true
//   nextTick(() => {
//     InputRef.value!.input!.focus()
//   })
// }

const showInput = (row: any) => {
  row.flag = true
  inputValue.value = ''; // 清空输入框
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}


const handleInputConfirm = (row: any) => {
  // console.log(row)
  const newSaleAttrValue = {
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: inputValue.value
  }

  const repeat = row.spuSaleAttrValueList.find((item: any) => {
    return item.saleAttrValueName === inputValue.value
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性不能重复'
    })
    return
  }

  if (inputValue.value && inputValue.value.trim()) {
    if (!row.spuSaleAttrValueList) {
      row.spuSaleAttrValueList = [];
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    // console.log(inputValue.value, row.baseSaleAttrId)
  }

  row.flag = false;
  inputValue.value = ''
}

const save = async () => {

  SpuParams.value.spuImageList = imgList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.url
    }
  })
  SpuParams.value.spuSaleAttrList = saleAttr.value

  let result: any = await reqAddOrUpdateSpu(SpuParams.value)

  // 检查 result 是否存在
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景为0，展示有的SPU的数据
    $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' })
  } else {
    ElMessage({
      type: 'error',
      message: result?.message || (SpuParams.value.id ? '更新失败' : '添加失败'),
    })
  }

}



const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

//新增spu
const initAddSpu = async (c3Id: number | string) => {
  //清空
  Object.assign(SpuParams.value, {
    category3Id: "",
    spuName: "",
    description: "",
    tmId: "",
    spuSaleAttrList: [],
    spuImageList: [],
    id: undefined,
  });

  saleAttr.value = []
  imgList.value = []
  // saleAttrIdAndValueName.value=''
  SpuParams.value.category3Id = c3Id;
  let result: AllTradeMark = await reqTradeMark();
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr();
  //存储全部品牌的数据
  AllTradeMark.value = result.data;
  //存储全部的销售属性
  allSaleAttr.value = result1.data;


}


defineExpose({ initHasSpuData, initAddSpu })

</script>

<template>
  <div>
    <el-form ref="formRef" :model="SpuParams" label-width="100px">
      <el-form-item label="SPU名称">
        <el-input v-model="SpuParams.spuName" placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SpuParams.tmId" placeholder="请选择SPU品牌">
          <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="name">
        <el-input v-model="SpuParams.description" placeholder="请输入SPU描述" type="textarea" />
      </el-form-item>
      <el-form-item label="SPU图片" prop="name">
        <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :headers="headers"
          :before-upload="handleUpdate">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <div style="display: flex;">
          <el-select v-model="saleAttrIdAndValueName"
            :placeholder="unSelectSaleAttr.length ? `还有${unSelectSaleAttr.length}个` : '无'"
            style="width: 200px;margin-right: 10px;">
            <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
              :value="`${item.id}:${item.name}`" />
          </el-select>
          <el-button icon="Plus" type="primary" @click="addSaleAttr"
            :disabled="saleAttrIdAndValueName ? false : true">添加销售属性</el-button>
        </div>

      </el-form-item>
      <el-form-item>
        <el-table :data="saleAttr" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="saleAttrName" label="销售属性名称" />
          <el-table-column label="销售属性值">
            <template #="{ row, index }">
              <el-tag style="margin-right: 10px;" v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id"
                closable :disable-transitions="false" @close="handleClose(row, index)">
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.flag == true" ref="InputRef" v-model="inputValue" class="w-20" size="small"
                @keyup.enter="handleInputConfirm(row)" @blur="handleInputConfirm(row)" />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)" icon="Plus">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button size="small" type="danger" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>