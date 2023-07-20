<template>
    <div  class="main m_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <i class="el-icon-arrow-left"></i> <p>返回</p>
            </a>
            <h1>面向多模态数据的多维度语义检索</h1>
            <el-input placeholder="请输入内容" v-model="searchValue">
                <i slot="suffix" class="el-icon-picture-outline-round " @click="centerDialogVisible = true" ></i>
                <el-button slot="append" @click="startSearch">搜索</el-button>
            </el-input>
        </div>
      <div class="margin">
        <div class="title">检索结果</div>
        <div class="text">
           <el-tabs v-model="activeName" @tab-click="searchResultChoose">
            <el-tab-pane label="图片结果" name="pic">
               <ul>
                    <li v-for="item in searchResult_pic" :key="item.label">
                        <a href="javascript:void(0);" @click="showPic(item)">
                          <h2 class="color_2">No{{item.label}}.</h2><span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="文字结果" name="word">
                <ul>
                    <li v-for="(item,index) in searchResult_word" :key="index">
                        <a href="javascript:void(0);" @click="showMain(item)">
                          <h2 class="color_2">No{{index+1}}.</h2><span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </el-tab-pane>
           </el-tabs>
        </div>
      </div>
<!--      图片获取的弹窗-->
       <el-dialog
                    title="提示"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                <template>
                    <el-alert
                            title="温馨提示：点击即可修改图片，只允许上传.jpg或.png格式"
                            type="warning"
                            :closable="false">
                    </el-alert>
                </template>
                <el-upload
                        class="upload-demo"
                        drag
                        action="#"
                        :headers="headers"
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        show-file-list
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>


                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelUpload()" class="cancel">取 消</el-button>
                    <el-button  @click="confirmUpload()">确 定</el-button>
                </span>
            </el-dialog>
<!--      显示图片的弹窗-->
      <el-dialog
  title="图片预览"
  :visible.sync="pictureDialogVisible"
  width="50%"
  center>
  <img :src="fileUrl" alt="i按错误tu"/>
</el-dialog>
<!--      预览文本的弹窗-->
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
        name: "multimodalPage",
        data() {
            return {
                searchValue:'',
                searchResult_pic:[],
                searchResult_word:[],
                pictureDialogVisible:false,
                centerDialogVisible: false,
                fileDialogVisible:false,
                dialogImageUrl: '',
                dialogVisible: false,
                fileUrl:'',
                fileList:[],
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
              activeName:'',



            }
        },
        methods: {
            returnMain() {
                this.$router.push({path: '/mainPage'})
            },
            search() {
                alert('出发成功');
            },
            cancelUpload(){
                this.centerDialogVisible = false;
            },
            confirmUpload(){
                console.log('filelist',this.fileList);
                this.centerDialogVisible = false;
            },
            //上传图片
            handleChange(file, fileList) { //文件数量改变
              this.fileList = fileList;
              console.log('change',this.fileList)
            },
          handleRemove(file,fileList){
              this.fileList=fileList;
              console.log('remove',this.fileList)
          },
          startSearch(){
              var param=new FormData();
            if(this.fileList.length!=0) {
              console.log(this.fileList);
              this.fileList.forEach((file) => {
                param.append('file', file.raw)
              })
              console.log(param.get('file'));
            }
              this.axios.post(
                  'https://mock.apifox.cn/m1/3018081-0-default/multidimentional',
                  {
                    searchValue:this.searchvalue,
                    param:param
                  }

              ).then(res=>{
                    if(res.status==200){
                      {
                        console.log(res);
                        this.searchResult_pic=res.data.searchResult_pic;
                        this.searchResult_word=res.data.searchResult_word;
                      }
                    }
              })
          },
          searchResultChoose(){
              console.log(this.activeName);
          },
           showMain(item){
                this.fileDialogVisible=true;
                this.fileUrl=item.picUrl;
            },
           showPic(item){
                this.pictureDialogVisible=true;
                this.fileUrl=item.picUrl;
            }

        }
    }
</script>


<style scoped>


</style>
<style>

.el-tabs__active-bar  {
  background-color:#B2BAA9 !important;
}
.el-tabs__item:hover{
  color: #B2BAA9 !important;
}
 .el-tabs__item.is-active {
    color: #B2BAA9 !important;
}
    i{
       font-size:30px;
        padding-top:7px;
        cursor:pointer;
    }
  
    .el-dialog__header{
          background-color: #6D7074;
      }
    .el-dialog__body{
        background-color:#FFF9F0;
    }
    .el-dialog__footer{
        background-color:#FFF9F0;
    }
    .cancel{
        background-color: #E4C2A2 !important;
    }

    .el-dialog  a{
        display:block;
        margin-left:10%;
        width: 80%;
        height: 200px;
        background-color: #D7D7D7;
        text-decoration: none;
        position:relative;

    }

    .el-dialog  a img{
        width: 100%;
        height:100%;
    }

    .el-dialog a p{
        position:absolute;
        top:40%;
        left:20%;
        font-size: 25px;
        text-align: center;
        color:#fff;

    }

    .el-dialog .el-upload{
        width: 80% !important;
        margin-left: 10%;
    }
    .el-dialog .el-upload .el-upload-dragger{
        width: 100% !important;
    }
    .el-dialog img{
      width: 80%;
      margin-left: 10%;
    }




</style>