<template>
    <div  class="main m_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <p>< 返回</p>
            </a>
            <h1>面向多模态数据的多维度语义检索</h1>
            <el-input placeholder="请输入内容" v-model="searchvalue">
                <i slot="suffix" class="el-icon-picture-outline-round " @click="centerDialogVisible = true" ></i>
                <el-button slot="append" >搜索</el-button>
            </el-input>


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


        </div>
    </div>
</template>

<script>
    export default {
        name: "multimodalPage",
        data() {
            return {
                searchvalue: '',
                centerDialogVisible: false,
                dialogImageUrl: '',
                dialogVisible: false,

                dialogOfUpload:false,
                fileList:[],
                headers: {
                    'Content-Type': 'multipart/form-data'
                }



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
          }


        }
    }
</script>

<style scoped>

</style>
<style>
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





</style>