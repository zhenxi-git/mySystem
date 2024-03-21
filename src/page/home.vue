<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside width="200px" class="left">
                <el-menu :default-active="defaultSelect" @close="handleClose"  class="el-menu-vertical-demo"
                    mode="vertical"  @select="selectTap" :unique-opened="false">

                    <template v-for="item in menu" :index="item.path">
                        <el-menu-item :index="item.path" v-if="!item.children || item.children.length <= 0">
                            <span>{{ item.name }}</span>
                        </el-menu-item>
                        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
                            <template #title>
                                <span>{{ item.name }}</span>
                            </template>
                            <el-menu-item v-for="childrenItem in item.children" :index="childrenItem.path">
                                <span>{{ childrenItem.name }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </template>

                </el-menu>

            </el-aside>
            <el-container>
                <el-header class="top">
                    <Breadcrumb></Breadcrumb>
                </el-header>
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
import Breadcrumb from "../components/Breadcrumb.vue";
const store = useStore()
const router = useRouter()
const route = useRoute()
const defaultSelect = ref('')
const menu = ref([])


menu.value = store.getters.getMenu.filter(item => {
    if (!item.isHidden) {
        return item
    }
})
console.log(menu, "路由")
onMounted(() => {
    getIndex(route.path)
})
const selectTap = (path) => {
    router.push(path)
}
const getIndex = (path) => {
    menu.value.forEach(element => {
        if (path.includes(element.path)) {
            defaultSelect.value = path
        }
        if (element.children && element.children.length > 0) {
            element.children.forEach(ele => {
                if (path.includes(ele)) {
                    defaultSelect.value = ele.path
                }
            })

        }

    })
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