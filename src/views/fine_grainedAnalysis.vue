<template>
    <div  class="main fine_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <i class="el-icon-arrow-left"></i> <p>返回</p>
            </a>
            <h1>面向大规模复杂文档数据的细粒度检索</h1>
            <el-input placeholder="请输入内容" v-model="searchValue">
                <el-button slot="append" @click="startSearch">搜索</el-button>
            </el-input>
        </div>
      <div class="margin">
    <div class="title">检索结果</div>
    <div class="text">
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
          <iframe frameborder="0" width="100%" height="410" :src="fileUrl"></iframe>
        </el-scrollbar>

  </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "fine_grainedAnalysis",
      data(){
          return{
            fileUrl:'https://chi101linglingshih.files.wordpress.com/2018/01/dang-ni-lao-le_lyrics-in-chinese-and-pinyin.pdf',
            fileDialogVisible:false,
            searchResult:[],
            searchValue:'',
          };
      },

        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
            startSearch(){
                this.axios.post(
                    "https://mock.apifox.cn/m1/3018081-0-default/fine_grained",
                    {searchValue:this.searchValue}
                ).then(res=>{
                  console.log(res);
                  if(res.status==200) {
                    this.searchResult = res.data.fileResult;
                    console.log(this.searchResult)
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
<style>

</style>