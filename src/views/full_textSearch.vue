<template>
    <div  class="main fine_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <p>< 返回</p>
            </a>
            <h1>面向海量数据的全文
                智能检索</h1>
            <el-input placeholder="请输入内容">
                <el-button slot="append" >搜索</el-button>
            </el-input>
        </div>
        <div class="margin">
            <div class="title">
                搜索结果
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "full_textSearch",
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            }
        }
    }
</script>

<style scoped>

</style>