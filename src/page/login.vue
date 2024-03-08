<template>
    <div>
        <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    </div>

</template>
<script setup>
import { ref } from 'vue'
const input = ref('')

</script>
<style lang="less" scoped></style>