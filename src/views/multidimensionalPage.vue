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
<!--        显示图片-->
        <div class="text" v-if="imgShow=true">
               <ul>
                    <li v-for="(item,index) in searchResult_pic" :key="index">
                        <a href="javascript:void(0);" @click="showPic(item)">
                          <h2 class="color_2">No{{index+1}}.</h2><span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>
        </div>
<!--        显示文本-->
        <div class="text" v-if="fileShow=true">
<!--          <span v-html="fileData"></span>-->
           <ul>
                    <li v-for="(item,index) in searchResult_word" :key="index">
                        <a href="javascript:void(0);" >
                          <h2 class="color_2">No{{index+1}}.</h2><span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>
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
                        action="http://10.112.168.139:5005/multidimensionalPage/getResult/img"
                        name="param"
                        :file-list="fileList"
                        :on-success="uploadSuccess"
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
        <img :src="fileUrl" alt="不正常"/>
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
                activeName:'',
                imgShow:false,
                fileShow:false,
                fileData:'',
                // headers:{'Content-Type':'multipart/form-data' }
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
          uploadSuccess(response,file,fileList){
              console.log('开始执行');
              this.imgShow=false;
              this.fileShow=true;
              console.log('imgshow_false',this.imgShow);
              console.log(file);
              console.log(fileList);
              console.log(response);
              this.searchResult_word=response.searchResult_word;
              console.log(this.searchResult_word);
          },
          //文本搜索
          startSearch(){
              this.imgShow=true;
              this.fileShow=false;
              let that=this;
              this.axios.post(
                  // 'https://mock.apifox.cn/m1/3018081-0-default/multidimentional',
                  'http://10.112.168.139:5005/multidimensionalPage/getResult/word',
                  {
                    searchValue:this.searchValue,
                  },
                  {headers:{'Content-Type':'application/x-www-form-urlencoded' }}
              ).then(res=>{
                    if(res.status==200){
                      {
                        console.log('imgshow_true',that.imgShow);
                        console.log('txtshow_false',that.fileShow);
                        console.log(res);
                        this.searchResult_pic=res.data.searchResult_pic
                      }
                    }
              })
          },
          searchResultChoose(){
              console.log(this.activeName);
          },
          arrayBufferToBase64(buffer) {
            //第一步，将ArrayBuffer转为二进制字符串
            var binary = "";
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            //将二进制字符串转为base64字符串
            return window.btoa(binary);
          },
           showPic(item){
                this.pictureDialogVisible=true;
                this.fileUrl=item.picUrl;

                var that=this;
                this.axios({
                  headers:{'Content-Type':'application/x-www-form-urlencoded' },
                  method:"post",
                  url:"http://10.112.168.139:5005/multidimensionalPage/getPic",
                  data:{picUrl:item.picUrl},
                  responseType:"arraybuffer",
                }).then(
                    res=>{
                      that.fileUrl=
                          "data:image/jpeg;base64," + that.arrayBufferToBase64(res.data);
                    }
                )
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