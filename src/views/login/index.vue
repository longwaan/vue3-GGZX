<script setup lang="ts">
import { reqLogin } from '@/api/user';
import type { loginFromData } from '@/api/user/type';
import { reactive, ref } from 'vue';
import useUserStore from '@/stores/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import { getTime } from '@/utils/time';

let $router = useRouter()
let useStore = useUserStore()
let loading = ref(false)
const loginForms = ref<FormInstance>()
const loginFrom = reactive({
  username: 'admin',
  password: '111111',
})



const login = async () => {
  await loginForms.value?.validate()
  loading.value = true;
  try {
    await useStore.userLogin(loginFrom)
    $router.push('/')
    ElNotification({
      message: '登录成功',
      type: 'success',
      title: getTime() + '好'
    })
    loading.value = false;
  } catch (error) {
    loading.value = false
    ElNotification({
      message: (error as Error).message,
      type: 'error',
    })
  }

}

const validateusername = (rule: any, value: any, callback: any) => {
  if(value.length>=5){
      callback()
  }else{
    callback(new Error('用户名不少于5个字符'))
  }

}
const validatepassword = (rule: any, value: any, callback: any) => {
  if(value.length>=6){
      callback()
  }else{
    callback(new Error('密码不少于6个字符'))
  }
}
const rules = reactive<FormRules<loginFromData>>({
  username: [{ trigger: 'blur', validator: validateusername, required: true }],
  password: [{ trigger: 'blur', validator: validatepassword, required: true }]
})


</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form class="login_form" :model="loginFrom" ref="loginForms" :rules="rules">
          <h1>HELLO</h1>
          <h4>欢迎来到硅谷甄选</h4>
          <el-form-item prop="username">
            <el-input v-model="loginFrom.username" placeholder="请输入账号" prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginFrom.password" placeholder="请输入密码" prefix-icon="Lock" type="password"
              show-password></el-input>
          </el-form-item>



          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>


</template>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    margin-bottom: 10px;
  }

  h4 {
    margin-bottom: 10px;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
