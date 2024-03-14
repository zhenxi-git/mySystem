<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside width="200px" class="left">
                <el-menu @select="selectTap" :default-active="defaultSelect" :unique-opened="false"
                    class="el-menu-vertical-demo" active-text-color="#ffd04b" @close="handleClose">
                    <el-menu-item :index="item.path" v-for="(item, index) in menu" :key="index">
                        <span>{{ item.name }}</span>
                    </el-menu-item>

                </el-menu>

            </el-aside>
            <el-container>
                <el-header class="top">Header</el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!route.meta.keepAlive"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { useStore } from "vuex"
import { onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router";
const store = useStore()
const router = useRouter()
const route = useRoute()
const defaultSelect = ref('')
const menu = ref([])
console.log(route.meta, "路由")

menu.value = store.getters.getMenu.filter(item => {
    if (item.isHidden) {
        return item
    }
})
 onMounted(() => {
    defaultSelect.value = menu.value[0].path
})
const selectTap = (key) => {
    router.push(menu.value[key].path)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.common-layout {
    width: 100%;
    height: 100vh;

    .container {
        height: 100%;

        .left {

            .el-menu-vertical-demo {
                height: 100%;
            }
        }

        // .top {
        //     background-color: bisque;


        // }

        // .main {
        //     background-color: red;


        // }
    }

}
</style>