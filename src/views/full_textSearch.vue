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
             <div class="noResult" v-if="searchResult.length==0">结果为空</div>
               <ul>
                    <li v-for="(item,index) in searchResult" :key="index">
                        <a href="javascript:void(0);" @click="showMain(item)">
                          <h2 class="color_3">No{{index+1}}.</h2><span>{{item.name}}</span>
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
          <span v-html="file_text"></span>
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
            searchResult:[],
            file_text:'',
          }
      },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
           showMain(item){
                this.fileDialogVisible=true;
                this.fileUrl=item.picUrl;
                this.axios.post(
                    "http://192.168.13.26:5004/full_textSearch/getTxt",
                    {picUrl:item.picUrl},
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(
                    res=>{
                      if(res.status==200){
                        console.log(res);
                        this.file_text=res.data.content;
                      }
                    }
                )
            },
          startSearch(){
                this.axios.post(
                    // "https://mock.apifox.cn/m1/3018081-0-default/fine_grained",
                    "http://192.168.13.26:5004/full_textSearch/getResult",
                    // "http://10.112.168.139:5004/full_textSearch/getTxt",
                    {searchValue:this.searchValue},
                     {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                ).then(res=>{
                  console.log(res);
                  if(res.status==200) {
                    this.searchResult = res.data.fileResult;
                    console.log(this.searchResult)
                  }

                })
            },
        }
    }
</script>

<style scoped>

</style>