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
                    <li v-for="(item,index) in searchResult" :key="index">
                        <a href="javascript:void(0);" @click="showMain(item)">
                          <h2 class="color_1">No{{index+1}}.</h2><span>{{item.name}}</span>
<!--                          <h3 class="color_1">{{item.percent}}%</h3>-->
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
<!--          <iframe frameborder="0" width="100%" height="410" :src="fileUrl"></iframe>-->
          <span v-html="fileData"></span>
        </el-scrollbar>

  </el-dialog>
    </div>
</template>
<script>
    export default {

        name: "interlingualPage",
        data(){
          return{
            fileDialogVisible:false,
            searchValue:'',
            translation:'',
            fileUrl:'',
            searchResult:[],
            searchResult1:[],
            fileData:''
          }


        },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
          startSearch(){
              this.axios.post(
                  // "https://mock.apifox.cn/m1/3018081-0-default/interlingual",
                  "http://192.168.13.26:5006/interlingualPage/getResult",
                  {searchValue:this.searchValue},
                  {
                    headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                  }
                  }
              ).then(res=>{
                if(res.status==200){
                  console.log(res);
                  this.translation=res.data.translation;
                  this.searchResult=res.data.searchResult;
                  for(var i=0;i<this.searchResult.length;i++)
                  {

                    var name = this.searchResult[i].substring(this.searchResult[i].lastIndexOf("/") + 1);

                    this.searchResult1.push({url:this.searchResult[i],name:name})
                  }
                  console.log(this.searchResult1);
                }
              })
          },
          showMain(item){
                this.fileDialogVisible=true;
                this.axios.post(
                  "http://192.168.13.26:5006/interlingualPage/getTxt",
                  {picUrl:item.picUrl},
                  {headers: {'Content-Type': 'application/x-www-form-urlencoded'
                  }
                  }
              ).then(
                  (res)=>{
                    console.log(res);
                    this.fileData=res.data.content;
                  }
              )
            },


        }
    }
</script>

<style scoped>

</style>