<template>
    <div class="page2Main" ref="listRef" @scroll="onScroll">
        <!-- 防止滚动条样式变化，当滚动条没有被隐藏时 -->
        <div class="list" ref="itemListRef">
            <el-card v-for="item in visibleData" :key="item.index" class="card" :style="{ height: `${itemHeight}px` }">
                <el-descriptions :title="'User Info' + item.index">
                    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
                    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                    <el-descriptions-item label="Remarks">
                        <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                        Province</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>

        <div :style="{ height: `${totalHeight}px` }"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const listRef=ref(null) //列表容器
const itemListRef=ref(null)
const visibleData=ref([]) //数据数组
const start=ref(0) // 开始位置
const end=ref(10)// 结束位置
const itemHeight=ref(150) // 单个元素高度
const visibleLength=ref(3) // 可见数量
const totalHeight=ref(0) // 总高度
const totalNum=ref(0) //数组总数量
const onScroll = async () => {
    //设置start
    start.value=Math.floor(listRef.value.scrollTop/itemHeight.value) 
    //设置end
    end.value=start.value+visibleLength.value
    //判断end的值
    if(end.value>totalNum.value||listRef.value.scrollTop+listRef.value.clientHeight>=totalHeight.value-10){
        end.value=totalNum.value
        start.value = end.value-visibleLength.value+1
    }
    //请求数据
    const data = await getData(start.value, end.value)
    visibleData.value = data.list
    totalNum.value = data.length
    //设置偏移位置
    itemListRef.value.style.transform=`translateY(${start.value*itemHeight.value}px)`
}

//模拟请求
const getData = (start, end) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let list = []
            for (let i = start; i < end; i++) {
                list.push({
                    index: i,
                })
            }
            resolve({
                list,
                length: 1000
            })
        }, 30)
    })
}


onMounted(async () => {
    const data=await getData(start.value, end.value)
    visibleData.value = data.list
    totalNum.value = data.length
    totalHeight.value = data.length * itemHeight.value
   //设置列表容器高度
    listRef.value.style.height = `${visibleLength.value*itemHeight.value}px`
})








</script>

<style>
.page2Main {
    overflow-y: scroll;
    border: 1px solid red;

    /* 隐藏滚动条 */
    /* Firefox */
    /* scrollbar-width: none; */
    /* IE 10+ */
    /* -ms-overflow-style: none; */
    /* Chrome Safari */
    /*
    ::-webkit-scrollbar {

        display: none;
    }
*/
    .list {
        width: 100%;


        .card {
            margin-bottom: 20px;

        }
    }
}
</style>
