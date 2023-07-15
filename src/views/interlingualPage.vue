<template>
    <div  class="main u_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <i class="el-icon-arrow-left"></i> <p>返回</p>
            </a>
            <h1>面向复杂文档数据的跨语种信息检索</h1>
            <el-input placeholder="请输入内容" v-model="searchValue">
                <el-button  slot="append" @click="startSearch">搜索</el-button>
            </el-input>
        </div>
        <div class="margin">
            <div class="title">文本翻译</div>
            <div class="text" v-html="this.translation">
<!--                <span v-for="item in this.userType" v-bind:key="item">{{item}}</span>-->
            </div>
        </div>
        <div class="margin">
            <div class="title">检索结果</div>
            <div class="text">
               <ul>
                    <li v-for="item in searchResult" :key="item.label">
                        <a href="javascript:void(0);" @click="showMain(item)">
                          <h2 class="color_1">No{{item.label}}.</h2><span>{{item.name}}</span><h3 class="color_1">{{item.percent}}%</h3>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      <el-dialog
        title="文件预览"
        :visible.sync="fileDialogVisible"
        width="50%"
        center>
        <el-scrollbar style="height:60vh;">
<!--  <span>需要注意的是内容是默认不居中的</span>-->
          <iframe frameborder="0" width="100%" height="410" :src="fileUrl"></iframe>
        </el-scrollbar>

  </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "interlingualPage",
        data(){
          return{
            userType:['态势分析','测试评估','可信防护','攻击行为'],
            fileDialogVisible:false,
            searchValue:'',
            translation:'',
            fileUrl:'',
            searchResult:['信息服务可信防护设备使用说明','信息服务可信防护设备使用注意事项','网络安全防护设备技术参数','信息网络安全设备']
          }


        },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
          startSearch(){
              this.axios.post(
                  "https://mock.apifox.cn/m1/3018081-0-default/interlingual",
                  {searchValue:this.searchValue}
              ).then(res=>{
                if(res.status==200){
                  console.log(res);
                  this.translation=res.data.translation;
                  this.searchResult=res.data.searchResult;
                }
              })
          },
          showMain(item){
                this.fileDialogVisible=true;
                this.fileUrl=item.picUrl;
            }
        }
    }
</script>

<style scoped>

</style>