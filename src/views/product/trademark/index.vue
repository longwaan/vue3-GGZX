<script setup lang="ts">
import { reqAddOrUpdateTradeMark, reqDeleteTradeMark, reqTradeList } from '@/api/product/trademark'
import type { Record, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type'
import { ElMessage, type FormRules, type UploadProps } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import { id } from 'element-plus/es/locales.mjs'
const trademarkArr = ref<Record>([])
const pageNO = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>()
const useStore = useUserStore()
const headers = { Token: useStore.token }
const getTradeMarkList = async () => {
  let result: TradeMarkResponseData = await reqTradeList(pageNO.value, pageSize.value)
  // console.log(result)
  if (result.code === 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }

}

const dialogFormVisible = ref<boolean>(false)

const tradeform = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
onMounted(() => {
  getTradeMarkList()
})
const addTrademark = () => {

  dialogFormVisible.value = true
  //清空表单项及校验结果
  // await nextTick()
  // await tradeMarkForm.value.resetFields()
  tradeMarkForm.value.clearValidate(['logoUrl', 'tmName'])
  tradeform.logoUrl = ''
  tradeform.tmName = ''
  tradeform.id = 0
}

const change = () => {
  getTradeMarkList()
}


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // console.log(response, uploadFile)
  tradeform.logoUrl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小不能超过4M'
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '请上传png | jpg | gif格式图片'
    });
    return false;
  }
}

const tradeMarkForm = ref()
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();

  } else {
    callback(new Error('品牌名称位数大于等于两位'));
  }
}


const validateLogo = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('品牌图片不能为空'));
  }
}
const FormRules = reactive<FormRules<typeof tradeform>>({
  tmName: [{ validator: validateName, trigger: 'blur', required: true }],
  logoUrl: [{ validator: validateLogo, trigger: 'blur', required: true }],
})


const cancle = () => {
  dialogFormVisible.value = false
}

const comfirm = async () => {
  await tradeMarkForm.value.validate()
  let result: any = await reqAddOrUpdateTradeMark(tradeform)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: tradeform.id ? '编辑成功' : '添加成功'
    })
    dialogFormVisible.value = false
    getTradeMarkList()
  } else {
    ElMessage({
      type: 'error',
      message: tradeform.id ? '编辑失败' : '添加失败',
    })
    dialogFormVisible.value = false
  }

}


const updateTradeMark = (row: any) => {

  dialogFormVisible.value = true
  // await nextTick()
  // tradeMarkForm.value.resetFields()
  tradeMarkForm.value.clearValidate(['logoUrl', 'tmName'])

  Object.assign(tradeform, row)
}

const remove = async (id: number) => {
  // console.log(row)
  let result = await reqDeleteTradeMark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getTradeMarkList()
  } else {
    return Promise.reject(new Error(result.message))
  }
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
            <el-button type="primary" icon="Edit" @click="updateTradeMark(row)"></el-button>

            <el-popconfirm :title="`你确定要删除` + `${row.tmName}?`" @confirm="remove(row.id)" width="200px">
              <template #reference>
                <el-button type="primary" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNO" v-model:page-size="pageSize" :page-sizes="[5, 10, 30, 40]"
        :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @change="change" />

    </el-card>



    <el-dialog v-model="dialogFormVisible" :title="tradeform.id ? '编辑商品品牌' : '添加商品品牌'" width="500">
      <el-form ref="tradeMarkForm" :model="tradeform" label-width="100px" :rules="FormRules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="tradeform.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers">
            <img v-if="tradeform.logoUrl" :src="tradeform.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>

        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="comfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
