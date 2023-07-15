<template>
    <div  class="main fine_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <i class="el-icon-arrow-left"></i> <p>返回</p>
            </a>
            <h1>面向海量数据的全文
                智能检索</h1>
            <el-input placeholder="请输入内容" v-model="searchValue">
                <el-button slot="append" @click="startSearch">搜索</el-button>
            </el-input>
        </div>
        <div class="margin">
            <div class="title">
                搜索结果
            </div>
           <div class="text">
               <ul>
                    <li v-for="item in searchResult" :key="item.label">
                        <a href="javascript:void(0);" @click="showMain(item)">
                          <h2 class="color_3">No{{item.label}}.</h2><span>{{item.name}}</span><h3 class="color_3">{{item.percent}}%</h3>
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
        name: "full_textSearch",
      data(){
          return{
            fileDialogVisible:false,
            searchValue:'',
            searchResult:['信息服务可信防护设备使用说明','信息服务可信防护设备使用注意事项','网络安全防护设备技术参数','信息网络安全设备']

          }
      },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
           showMain(item){
                this.fileDialogVisible=true;
                this.fileUrl=item.picUrl;
            },
          startSearch(){
                this.axios.post(
                    "https://mock.apifox.cn/m1/3018081-0-default/getResult",
                    {searchValue:this.searchValue}
                ).then(res=>{
                  console.log(res);
                  if(res.status==200) {
                    this.searchResult = res.data;
                    console.log(this.searchResult)
                  }

                })
            },
        }
    }
</script>

<style scoped>

</style>