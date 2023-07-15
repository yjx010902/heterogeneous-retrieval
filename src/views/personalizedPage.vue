<template>
  <div class="main p_page">
    <div class="head">
      <a href="javascript:void(0);" @click="returnMain" class="return">
        <i class="el-icon-arrow-left"></i>
        <p>返回</p>
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
        <el-select v-model="value1" placeholder="请选择喜好">
          <el-option
            v-for="item in option1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="value2"  placeholder="请选择等级">
          <el-option
            v-for="item in option2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button class="add" @click="add">添加</el-button>
        <el-button class="search" @click="startSearch">搜索</el-button>
      </div>
      <div class="title bgcolor_2">搜索结果</div>
    </div>
    <div class="searchResult">
      <ul v-for="item in movies" :key="item.title">
        <li>
          <h4>{{ item.title }}</h4>
          <img src="item.poster_path"/>
          <h5><a href="item.movie_url">read more >></a></h5>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
    export default {
        name: "personalizedPage",
        created:function(){
          this.getOptions();
        },
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
        searchValue:[],
        value1: [],
        value2: [],
        option1:[],
        option2:[],
        movies:[],
            }
        },
        methods:{
            returnMain(){
                this.$router.push({path:'/mainPage'})
            },
            add(){
              if(this.value1.length!=0&&this.value2.length!=0) {
                this.searchValue.push({name:this.value1,label:this.value2});
                console.log('v1', this.searchValue);
                this.value1 = [];
                this.value2 = [];
              }
          },
          // 进入页面时获取个性化选项
           getOptions(){
              console.log('函数执行了');
              this.axios.get(
              'https://mock.apifox.cn/m1/3018081-0-default/personalizedPage1'
            //       需要的后端data格式：
            //  {
            //   "option1": [
            //     "qui officia ipsum culpa"
            //   ],
            //   "option2": [
            //     "reprehenderit commodo",
            //     "elit minim anim",
            //     "voluptate",
            //     "aliqua veniam occaecat elit"
            //   ]
            // }
              ).then(res=>{
                console.log(res);
                  if(res.status==200){
                    if(this.option1 === undefined) {
  this.potion1 = []
}
                    for(var i=0;i<res.data.option1.length;i++) {
                      this.option1.push({value:res.data.option1[i],label:res.data.option1[i]});
                    }
                     for(i=0;i<res.data.option2.length;i++) {
                      this.option2.push({value:res.data.option2[i],label:res.data.option2[i]})
                    }
                  }
              });
          },
          startSearch(){
              this.axios.post(
                  'https://mock.apifox.cn/m1/3018081-0-default/personalizedPage2',
                  // 要求的接口data样式：
//             [
//     {
//         "title": "加效政中",
//         "poster_path": "https://image.tmdb.org/t/p/w50a/5VTNOpR8gcgV3EPUHHfMGnJYN9L.jpg",
//         "movie_url": "http://inqeltt.kn/jnxmhuxoi"
//     },
//     {
//         "title": "能见值等",
//         "poster_path": "https://image.tmdb.org/t/p/w500/bRDAC4GogyS9ci3ow7UnInOcrin.jpg",
//         "movie_url": "http://nfbg.mc/hsxb"
//     },
//     {
//         "title": "识斗再清并展",
//         "poster_path": "https://image.tmdb.org/t/p/w500/bRDAC4GogyS9ci3ow7UnInocriN.ipg",
//         "movie_url": "http://llrmgflf.tp/ekkeuiii"
//     },
//     {
//         "title": "时记属龙非效争",
//         "poster_path": "https://image.tmdb.org/t/p/w50a/5VTNOpR8gcgV3EPUHHfMGnJYN9L.jpg",
//         "movie_url": "http://wfydo.do/letvocuzd"
//     }
// ]
                  {searchValue:this.searchValue}
              ).then(res=>{
                console.log(res);
                  this.movies=res.data;
              })

          }
        },

    }

</script>

<style scoped>
</style>
<style>
.p_page .head {
  height: 20% !important;
}
.choices {
  margin-top: 30px;
}
.choices .el-select {
  width: 30%;
  margin-left: 30px;
  margin-bottom: 2%;
}
.choices .el-button {
  width: 10%;
  margin-left: 3% !important;
  /*background-color: #E4C2A2;*/
}
.add {
  background-color: #e4c2a2 !important;
  color: #000;
}
.search {
  background-color: #b2baa9 !important;
}
.searchResult {
  background-color: #fff9f0;
  overflow: hidden;
}
.searchResult li {
  float: left;
  margin-right: 5%;
  margin-top: 30px;
  list-style-type: none;
  height: 360px;
  width: 20%;
  /*background-color: #797979;*/
  /* box-shadow:5px 5px 5px #BBC5AF;*/
}

.searchResult li:nth-child(4n + 1) {
  margin-left: 2%;
}
.searchResult li:nth-child(4n + 4) {
  margin-right: 3%;
}
.searchResult li h4 {
  margin-top: 3px;
  margin-left: 3%;
  color: #000;
}
.searchResult li img {
  margin-top: 10px;
  height: 280px;
  width: 94%;
  margin-left: 3%;
  background-color: #bbc5af;
}
.searchResult li h5 {
  margin-top: 5px;
  float: right;
  margin-right: 10px;
}
.searchResult li h5 a {
  color: #000;
  text-decoration: none;
}
</style>