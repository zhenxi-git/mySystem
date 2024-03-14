<template>
    <h3>登录页面</h3>
    <div class="input-box">
        <el-input v-model="userName" style="width: 240px" placeholder="请输入账号" />
        <el-input v-model="passWord" style="width: 240px" placeholder="请输入密码" />
    </div>
    <el-button type="default">登录</el-button>
    <el-button type="default">注册</el-button>
</template>
<script setup>
import { ref } from 'vue'
const userName = ref('')
const passWord = ref('')
</script>
<style lang="less" scoped>
.input-box {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>