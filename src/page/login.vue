<template>
    <h1>登录页面</h1>
    <div class="input-box">
        <el-input v-model="userName" style="width: 240px" placeholder="请输入账号" />
        <el-input v-model="passWord" :type="isShow?'text':'password'" style="width: 240px" placeholder="请输入密码">
            <template #append>
                <el-button :icon="isShow ? View : Hide" @click="lookPassWord" />
            </template>
        </el-input>
    </div>
    <div class="btnList">
        <el-button type="default" @click="goHome">登录</el-button>
        <el-button type="default">注册</el-button>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { View, Hide } from '@element-plus/icons-vue'
const userName = ref('')
const passWord = ref('')
const router = useRouter()
const isShow = ref(false)
const goHome = () => {
    if (userName.value == '小明' && passWord.value == '123456') {
        sessionStorage.setItem("token", "dif46das")
        debugger
        router.push('/home/page1')
    } else {
        ElMessage.error("密码或者账号错误")
    }
}
const lookPassWord = () => {
    isShow.value = !isShow.value
}
</script>
<style lang="less" scoped>
h1 {
    text-align: center;
    margin-top: 200px;
}

.input-box {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 100px;
}

.btnList {
    display: flex;
    justify-content: center;
}
</style>