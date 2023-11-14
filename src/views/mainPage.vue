<template>
    <div class="main page0">
        <div class="head">
            <h1>国产化平台异构库检索分析处理系统</h1>
        </div>
        <div class="foot">
            <div class="btn c1">
                <a href="javascript:void(0)" @click="moveToPage(1)">
                    <p>用户检索意图分析</p>
                </a>
            </div>
            <div class="btn c2">
                <a href="javascript:void(0)" @click="moveToPage(2)">
                    <p>面向多模态数据的<br/>多维度语义检索</p>
                </a>
            </div>
            <div class="btn c3">
                <a href="javascript:void(0)" @click="moveToPage(3)">
                    <p>面向大规模复杂文档数据<br/>的细粒度分析</p>
                </a>
            </div>
            <div class="btn c1">
                <a href="javascript:void(0)" @click="moveToPage(4)">
                    <p>面向复杂文档数据的<br/>跨语种信息检索</p>
                </a>
            </div>
            <div class="btn c2">
                <a href="javascript:void(0)" @click="moveToPage(5)">
                    <p>面向用户偏好的<br/>个性化智能检索</p>
                </a>
            </div>
            <div class="btn c3">
                <a href="javascript:void(0)" @click="moveToPage(6)">
                    <p>面向海量数据的<br/>全文智能检索</p>
                </a>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "mainPage",
        methods:{
            moveToPage(num){
                switch (num) {
                    case 1:
                        this.$router.push({path:'/userIntent'});
                        break;
                    case 2:
                        this.$router.push({path:'/multidimensionalPage'});
                        break;
                    case 3:
                        this.$router.push({path:'/fine_grainedAnalysis'});
                        break;
                    case 4:
                        this.$router.push({path:'/interlingualPage'});
                        break;
                    case 5:
                        this.$router.push({path:'/personalizedPage'});
                        break;
                    case 6:
                        this.$router.push({path:'/full_textSearch'});
                        break;
                }
            }
        }
    }

</script>

<style scoped>


</style>
<style>
    .head{
        height: 30% !important;
    }
    .head h1{
        text-align: center;
        font-size:40px;
        /*float:left;*/
        /*background-color: #6D7074;*/
        border-radius: 8px;
        color:#fff;
        padding-top:10%;
    }
    .foot{
        height: 55%;
        background-color: rgba(255,255,255,50%);
        border:3px solid #fff;
        margin-left:10%;
        width:80%;
        border-radius: 25px;
    }
    .btn{
        /*外观设置*/
        display:block;
        background-color: #f8f9fd;
        height: 30%;
        width: 22%;
        border-radius: 10px;
        /*位置设置*/
        float:left;
        margin-left:5%;
        margin-right: 7%;
        margin-top:4%;
    }
    .btn:nth-child(3),.btn:nth-child(6){
        margin-right: 0;
    }
    .btn a{
        display: block;
        /*background-color: #fff;*/
        width: 100%;
        height: 100%;
        border-radius: 10px;
        font-size: 30px;
        /*font-family: 华文楷体;*/
        text-decoration: none;
        color:#000;
        text-align: center;

    }
    .btn a p{
        padding-top:30px;
    }
    .btn a:hover{
      background-color: #409eff;
    }
    /*.c1 a{*/
    /*    background-color: #E4C2A2;*/
    /*}*/
    /*.c1 a:hover{*/
    /*    background-color: #DDB087;*/
    /*}*/
    /*.c2 a{*/
    /*    background-color: #B2BAA9;*/
    /*}*/
    /*.c2 a:hover{*/
    /*    background-color: #88937D;*/
    /*}*/
    /*.c3 a{*/
    /*    background-color: #E5A19E;*/
    /*}*/
    /*.c3 a:hover{*/
    /*    background-color: #C0837F;*/
    /*}*/

</style>