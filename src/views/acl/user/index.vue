<script setup lang="ts">
import { reqAddOrUpdateUser, reqDeleteUser, reqDoRole, reqGetUser, reqRemoveUser, reqToRole } from '@/api/acl/user';
import type { RoleData, SetRoleData, User, UserResponseData } from '@/api/acl/user/type';
import { ElMessage, type CheckboxValueType, type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';


const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>()
const userInfo = ref<User[]>([])
const keywords = ref<string>('')
const drawer = ref(false)
const drawer1 = ref(false)
const allRoleList = ref<RoleData[]>([])
const userRole = ref<RoleData[]>([])
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const multipleSelection = ref<any>([])
const userForm = reactive<User>({
  username: '',
  name: '',
  password: ''
})

const userFormRef = ref<any>()

onMounted(() => {
  getUserInfo()
})

const getUserInfo = async () => {
  let result = await reqGetUser(pageNo.value, pageSize.value, keywords.value)
  if (result.code === 200) {
    userInfo.value = result.data.records
    total.value = result.data.total
  }

}

const reset = () => {
  keywords.value = ''
  getUserInfo()
}

const addUser = () => {
  drawer.value = true
  Object.assign(userForm, {
    id: 0,
    username: '',
    name: '',
    password: ''
  })
  userFormRef.value.clearValidate()

}
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 4) {
    return callback(new Error('用户姓名不可少于4位'))
  } else {
    callback()
  }
}
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 4) {
    return callback(new Error('用户昵称不可少于4位'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 6) {
    return callback(new Error('密码不可少于6位'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof userForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

const cancelClick = () => {
  drawer.value = false
}

const confirmClick = async () => {
  await userFormRef.value.validate()
  try {
    let result: UserResponseData = await reqAddOrUpdateUser(userForm)
    console.log(result)
    if (result.code === 200) {
      drawer.value = false
      ElMessage({
        type: 'success',
        message: userForm.id ? '更新成功' : '新增成功'
      })
      getUserInfo()
    } else {
      ElMessage({
        type: 'error',
        message: userForm.id ? '更新失败' : '新增失败'
      })
      drawer.value = false
      getUserInfo()
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '网络错误'
    })
    drawer.value = false
    getUserInfo()
  }
}

const updateUser = (row: any) => {
  drawer.value = true
  Object.assign(userForm, row)

}

const setRole = async (row: any) => {
  drawer1.value = true
  Object.assign(userForm, row)
  let result = await reqToRole(row.id)
  // console.log(result)
  if (result.code === 200) {
    allRoleList.value = result.data.allRolesList
    userRole.value = result.data.assignRoles

  }
}
const handleCheckAllChange = (val: CheckboxValueType) => {
  // console.log(val)
  userRole.value = val ? allRoleList.value : []
  isIndeterminate.value = false
}
const handleCheckedChange = (value: CheckboxValueType[]) => {
  // console.log('11',value)
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoleList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoleList.value.length
}

const cancel = () => {
  drawer1.value = false
}
const confirm = async () => {
  console.log(userForm.id)
  let data: SetRoleData = {
    userId: (userForm.id as number),
    roleIdList: userRole.value.map(item => {
      return (item.id as number)
    }),

  }

  let result: any = await reqDoRole(data)
  if (result.code === 200) {
    drawer1.value = false
    ElMessage({
      type: 'success',
      message: '分配角色成功'
    })
    getUserInfo()
  } else {
    drawer1.value = false;
    ElMessage({
      type: 'error',
      message: '分配角色失败'
    })
  }
}


const deleteUser = async (id: number) => {
  let result = await reqRemoveUser(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getUserInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
    getUserInfo()
  }
}

//当选择项发生变化时会触发该事件
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val.map((item) => {
    return item.id
  })
  // console.log(val)
  console.log(multipleSelection.value)
}

const batchRemove = async () => {
  let result = await reqDeleteUser(multipleSelection.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功'
    })
    getUserInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    })
    getUserInfo()
  }

}

</script>

<template>
  <el-card style="margin-bottom: 10px;">
    <el-form :inline="true" class="header-card">
      <el-form-item label="用户名">
        <el-input v-model="keywords" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserInfo()">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="addUser">新增用户</el-button>
    <el-button type="danger" @click="batchRemove">批量删除</el-button>
    <el-table ref="multipleTableRef" :data="userInfo" row-key="id" style="width: 100%;margin: 10px 0;"
      @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" />
      <el-table-column type="index" label="#" align="center" />
      <el-table-column label="id" prop="id" align="center"></el-table-column>
      <el-table-column property="name" label="用户名字" align="center" />
      <el-table-column property="username" label="用户名称" align="center" />
      <el-table-column property="roleName" label="用户角色" align="center" />
      <el-table-column property="createTime" label="创建时间" align="center" />
      <el-table-column property="updateTime" label="更新时间" align="center" />
      <el-table-column label="操作" width="400px">
        <template #="{ row, $index }">
          <div style="display: flex;">
            <el-button type="primary" icon="Avatar" @click="setRole(row)" size="small">分配角色</el-button>
            <el-button type="primary" icon="Edit" @click="updateUser(row)" size="small">编辑</el-button>
            <el-popconfirm :title="`你确定要删除${row.name}吗？`" width="260px" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 40]"
      :background="true" layout="prev, pager, next, jumper,->,total, sizes," :total="total" @change="getUserInfo()" />
  </el-card>

  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userForm.id?'更新用户':'新增用户' }}</h4>
    </template>
    <template #default>
      <el-form ref="userFormRef" :model="userForm" label-width="100px" :rules="rules">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userForm.id">
          <el-input v-model="userForm.password" placeholder="请输入用户密码" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <template #default>
      <el-form ref="userFormRef" :model="userForm" label-width="100px" :rules="rules">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userForm.username" disabled />
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" :indeterminate="isIndeterminate" @change="handleCheckedChange">
            <el-checkbox v-for="(item, index) in allRoleList" :key="item.id" :label="item">
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.header-card {
  display: flex;
  justify-content: space-between;
}
</style>
