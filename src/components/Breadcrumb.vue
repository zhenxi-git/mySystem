<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :to="{ path: '/' }" :key="index">{{ item.meta.title
      }}</el-breadcrumb-item>
  </el-breadcrumb>

</template>
<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const breadcrumbList = computed(() => {
  console.log(route.matched, "66666666666666")
  return route.matched
})

</script>