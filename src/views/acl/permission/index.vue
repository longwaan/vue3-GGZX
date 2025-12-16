<script setup lang="ts">
import { reqAddOrUpdateMenu, reqGetMenuList, reqRemoveMenu } from '@/api/acl/menu';
import type { MenuParams, Permisstion, PermisstionList } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const menuData = ref<PermisstionList>([])
const dialogVisible = ref<boolean>(false)
const menuInfo = reactive<MenuParams>({
  name: '',
  code: '',
  level: 0,
  pid: 0,
})
const getMenuList = async () => {
  let result = await reqGetMenuList()
  // console.log(result)
  if (result.code = 200) {
    menuData.value = result.data
  }

}
onMounted(() => {
  getMenuList()
})

const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuInfo, row)
}

const addPermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  menuInfo.level = row.level + 1
  menuInfo.pid = row.id
  Object.assign(menuInfo, {
    id: 0,
    name: '',
    code: '',
    level: 0,
    pid: 0,
  })


}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = async () => {
  let result: any = await reqAddOrUpdateMenu(menuInfo)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: menuInfo.id ? '更新成功' : '新增成功',
    })
    getMenuList()
    dialogVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: menuInfo.id ? '更新失败' : '新增失败',
    })
    getMenuList()
    dialogVisible.value = false

  }


}

const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getMenuList()
  } else {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getMenuList()
  }
}
</script>

<template>
  <el-table :data="menuData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button @click="addPermisstion(row)" type="primary" size="small">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button @click="updatePermisstion(row)" type="primary" size="small">编辑</el-button>


        <el-popconfirm :title="`你确定要删除${row.name}吗？`" width="260px" @confirm="removeMenu(row.id)">
          <template #reference>
            <el-button type="primary" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="新增菜单" width="500">
    <el-form ref="menuFormRef" :model="menuInfo" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="menuInfo.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="权限值">
        <el-input v-model="menuInfo.code" placeholder="请输入权限值" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
