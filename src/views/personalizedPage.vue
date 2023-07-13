<template>
    <div  class="main p_page">
        <div class="head ">
            <a href="javascript:void(0);" @click="returnMain" class="return">
                <p>< 返回</p>
            </a>
            <h1>面向用户偏好的个性化智能检索</h1>
<!--            <el-input placeholder="请输入内容">-->
<!--                <el-button slot="append" >搜索</el-button>-->
<!--            </el-input>-->

        </div>
      <div class="margin">
<!--        <div class="title bgcolor_2">-->
<!--          用户偏好-->
<!--        </div>-->
         <div class="choices">
             <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select
                v-model="value2"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
           <el-button class="add" @click="add">添加</el-button>
           <el-button class="search" @click="search">搜索</el-button>
         </div>
        <div class="title bgcolor_2">搜索结果</div>
      </div>
      <div class="searchResult">
        <ul>
          <li>
            <h4>Iron Man</h4>
            <img src="../assets/pic_add.png"/>
            <h5><a href="javascript:void(0);">read more >></a></h5>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "personalizedPage",
        data(){
            return{
              options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
        value2: [],
              value1s:[],
              value2s:[]
            }
        },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
          add(){
              if(this.value1.length!=0&&this.value2.length!=0) {
                this.value1s.push(this.value1);
                this.value2s.push(this.value2);
                console.log('v1', this.value1s);
                this.value1 = [];
                this.value2 = [];
              }

          }
        }
    }

</script>

<style scoped>

</style>
<style>
  .p_page .head{
    height: 20% !important;
  }
  .choices{
    margin-top: 30px;
  }
  .choices .el-select{
    width:30%;
    margin-left:30px;
    margin-bottom: 2%;
  }
  .choices .el-button{
    width: 10%;
    margin-left:3% !important;
    /*background-color: #E4C2A2;*/
  }
  .add {
    background-color: #E4C2A2 !important;
    color:#000;
  }
  .search{
    background-color: #B2BAA9 !important;
  }
  .searchResult{
    background-color: #FFF9F0;
    overflow: hidden;
  }
  .searchResult li{
    float:left;
    margin-right:2%;
    margin-top: 20px;
    list-style-type :none;
    height: 360px;
    width: 18%;
    background-color: pink;
  }

  .searchResult li:nth-child(5n+1){
    margin-left: 1%;
  }
   .searchResult li:nth-child(5n+5){
    margin-right: 1%;
  }
   .searchResult li h4{
     margin-top: 3px;
     margin-left:3%;
   }
   .searchResult li img{
     margin-top: 10px;
     height: 280px;
     width: 94%;
     margin-left:3%;
     background-color: yellow;
     box-shadow:5px 5px 5px #6D7074;
   }
   .searchResult li h5{
          margin-top: 5px;
     float:right;
     margin-right:10px;
   }
   .searchResult li h5 a{

      text-decoration: none;
   }
</style>