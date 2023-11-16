<template>
  <div :class="searchResult.length==' ' ? 'main' : 'main1'" >
    <div class="head">
      <a href="javascript:void(0);" @click="returnMain" class="return">
        <i class="el-icon-arrow-left"></i>
        <p>返回</p>
      </a>
      <h1>用户意图分析与理解</h1>
      <el-input placeholder="请输入内容" v-model="searchValue">
        <el-button slot="append"  icon="el-icon-search" @click="startSearch"></el-button>
      </el-input>
    </div>
    <div class="foot" v-if="searchResult.length!=' '">
      <div class="margin">
        <div class="title">类别</div>
        <div class="text" v-html="userType">
          <!-- <span v-for="item in this.userType" class="list" v-bind:key="item">{{
            item
          }}</span> -->
        </div>
      </div>
      <div class="margin">
        <div class="title">矫正后文本</div>
        <!-- <div class="text">北邮附近小于5km的饭店都有什么？</div> -->
        <div class="text" v-html="searchResult"></div>
        <div class="title">字典</div>
        <div class="text">
          <ul v-for="item in dictionary" v-bind:key="item">
            <li>·{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "search_1",
  data() {
    return {

      searchValue: "",
      userType: "",
      searchResult: "",
      dictionary: [],
    };
  },
  methods: {
    returnMain() {
      this.$router.push({ path: "/mainPage" });
    },
    startSearch() {
      this.axios
        .post(
          // 该处为url
          "https://mock.apifox.com/m1/3018081-0-default/userIntent",
            // "http://192.168.13.26:5001/userIntent/getResult",
          {searchValue:this.searchValue},
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.searchResult = res.data.corrected_sent;
            this.dictionary = res.data.dep_result;
            this.userType = res.data.predict_result;
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
<style>
.text ul li {
  line-height: 40px;
}
</style>