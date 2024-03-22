<template>
    <div class="tarBox">
        <div class="ul">
            <div :class="['li', activePath == item.path ? 'activeLi' : '']" @click="goPath(item.path)"
                v-for="item in tarList" :index="item.path">
                {{ item.name }}
                <el-icon class="icon" :size="14" @click.stop="deleteIcon(item.path)">
                    <Close />
                </el-icon>

            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { Close } from "@element-plus/icons-vue"
const route = useRoute()
const router = useRouter()
const tarList = ref([])
const activePath = ref('')
onMounted(() => {
    resSet()

})
const shopTarList = watch(route, (newValue) => {
    initTar()
    activePath.value = newValue.path
})
const initTar = () => {
    const index = tarList.value.findIndex(ele => route.path == ele.path)
    if (index < 0) {
        tarList.value.push({
            name: route.name,
            path: route.path
        })
    }
    console.log(route, "-----------------")
    sessionStorage.setItem("tarList", JSON.stringify(tarList.value))
}
const deleteIcon = (path) => {
    if (tarList.value.length <= 1) {
        ElMessage({
            message: '最后一个不可删除',
            grouping: true,
            type: 'warning',
        })
    } else if (path == activePath.value) {
        ElMessage({
            message: '当前选择页面不能删除',
            grouping: true,
            type: 'warning',
        })
    } else {
        const index = tarList.value.findIndex(ele => path == ele.path)
        tarList.value.splice(index, 1)
    }
}
const goPath = (path) => {
    activePath.value = path
    router.push(path)
}
//页面刷新不丢失
const resSet = () => {
    if (sessionStorage.getItem("tarList")) {
        tarList.value = JSON.parse(sessionStorage.getItem("tarList"))
    }
    activePath.value = route.path
    initTar()
}

</script>
<style lang="less" scoped>
.tarBox {
    width: 100%;
    height: 40px;
    box-shadow: 1px 1px 10px #999;

    .ul {
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .li {
            height: 20px;
            width: auto;
            padding: 2px 8px;
            border: 1px solid #998;
            margin-left: 10px;
            line-height: 20px;
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 700;
            color: #909399;
            background-color: #f4f4f5;

            &:hover {
                transform: scale(1.1);
                border-color: aqua;
            }
            .icon{
                margin-left:5px ;
            }
            .icon:hover{
                background-color: red;
                border-radius: 50%;
            }
        }

        .activeLi {
            border-color: #409eff;
            background-color: #d9ecff;
            color: #409eff;
        }

    }
}
</style>