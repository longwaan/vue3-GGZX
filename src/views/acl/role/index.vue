<script setup lang="ts">
import { reqAddOrUpdateRole, reqGetRole } from '@/api/acl/role';
import type { RoleData, RoleResponseData } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const keyword = ref<string>('')
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const roleData = ref<RoleResponseData>()
const total = ref<number>()
const dialogVisible = ref<boolean>(false)
const roleFormRef = ref()
const roleParams = reactive<RoleData>({
  roleName: '',
})



const getRoleInfo = async () => {
  let result = await reqGetRole(pageNo.value, pageSize.value, keyword.value)
  console.log(result)
  roleData.value = result.data.records
  total.value = result.data.total

}

onMounted(() => {
  getRoleInfo()
})

const search = () => {
  getRoleInfo()
}

const reset = () => {
  keyword.value = ''
  getRoleInfo()
}

const addRole = () => {
  dialogVisible.value = true
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  nextTick(() => {
    roleFormRef.value.clearValidate('roleName')
  })

}

const updateRole = (row: any) => {
  dialogVisible.value = true
  Object.assign(roleParams, row)
  nextTick(() => {
    roleFormRef.value.clearValidate('roleName')
  })
}

const cancel = () => {
  dialogVisible.value = false
}

const validateName = (rule: any, value: any, callback: any) => {
  if (!value||value.trim().length < 2) {
    callback(new Error('职位角色名称不可少于2位'))
  } else {
    callback()
  }

}

const rules = ({
  roleName: [{ validator: validateName, trigger: 'blur', required: true }]
})

const save = async () => {
  await roleFormRef.value.validate()
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '新增成功'
    })
    dialogVisible.value = false
    getRoleInfo()
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '新增失败'
    })
    dialogVisible.value = false
    getRoleInfo()
  }
}


</script>

<template>
  <el-card style="margin-bottom: 10px;">
    <el-form :inline="true" class="search-top">
      <el-form-item label="职位搜索">
        <el-input v-model="keyword" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card>
    <el-button icon="Plus" type="primary" @click="addRole">添加职位</el-button>
    <el-table :data="roleData" style="width: 100%">
      <el-table-column type="index" label="序号" width="80px"></el-table-column>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="roleName" label="职位名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="address" label="操作">
        <template #="{ row, $index }">
          <el-button type="primary" icon="User" size="small" @click="setPermisstion(row)">分配权限</el-button>
          <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑</el-button>

          <el-popconfirm :title="`你确定要删除${row.roleName}吗？`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" icon="Delete" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 20]"
      :background="true" layout=" prev, pager, next, jumper,->,total, sizes," :total="total" @change="getRoleInfo" />
  </el-card>

  <el-dialog v-model="dialogVisible" :title="roleParams.id ? '添加职位' : '更新职位'">
    <el-form ref="roleFormRef" :model="roleParams" label-width="auto" :rules="rules">
      <el-form-item label="职位名称" prop="roleName">
        <el-input v-model="roleParams.roleName" placeholder="请输入职位名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search-top {
  display: flex;
  justify-content: space-between;
}
</style>
