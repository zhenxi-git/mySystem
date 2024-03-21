<template>
    <div class="pageBox">

        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :size="large" label-width="auto"
            class="demo-ruleForm">
            <h1>登录页面</h1>
            <el-form-item label="账号" prop="checkPass">
                <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
            </el-form-item>


            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>


            <el-form-item>
                <el-button style="width: 50%;margin-left: 100px;" type="primary"
                    @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>


<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
const router = useRouter()
const ruleFormRef = ref()
const ruleForm = reactive({
    pass: '',
    userName: '',
})

const validateUseName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        if (ruleForm.userName !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('userName', () => null)
        }
        callback()
    }
}
const validatePass = (rule, value, callback) => {
    console.log("1111", value)
    if (value === '') {
        callback(new Error('请输入密码'))
    }else {
        callback()
    }
}
const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    userName: [{ validator: validateUseName, trigger: 'blur' }],
})

const submitForm = (formEl) => {

    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
         sessionStorage.setItem("token","464d6sa46d")
            router.push('/home/page1')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>
<style lang="less" scoped>
.pageBox {
    background-color: cadetblue;
    height: 100%;
    width: 100%;
    display: flex;

    .demo-ruleForm {
        min-width: 400px;
        margin: auto;

        h1 {
            text-align: center;
            margin-bottom: 50px;
        }
    }

}
</style>