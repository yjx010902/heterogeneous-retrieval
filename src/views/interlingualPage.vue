<template>
    <div  class="main u_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <p>< 返回</p>
            </a>
            <h1>面向复杂文档数据的跨语种信息检索</h1>
            <el-input placeholder="请输入内容">
                <el-button  slot="append" >搜索</el-button>
            </el-input>
        </div>
        <div class="margin">
            <div class="title">文本翻译</div>
            <div class="text">
                <span v-for="item in this.userType">{{item}}</span>
            </div>
        </div>
        <div class="margin">
            <div class="title">检索结果</div>
            <div class="text">
               <ul>
                    <li v-for="(key,value) in searchResult">
                        <a href="javascript:void(0);" @click="showMain(value)">
                          <h2 class="color_1">No{{value+1}}.</h2><span>{{key}}</span><h3 class="color_1">{{value}}%</h3>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "interlingualPage",
        data(){
          return{
            userType:['态势分析','测试评估','可信防护','攻击行为'],
            searchResult:['信息服务可信防护设备使用说明','信息服务可信防护设备使用注意事项','网络安全防护设备技术参数','信息网络安全设备']
          }


        },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            }
        }
    }
</script>

<style scoped>

</style>