<template>

       <div class="footer">
          <ul class="clearfix">
            <li @click="jump(0)">
              <router-link to="./test">
              <img :src="src1" alt="">
              <!-- <span>实验</span>  -->
               <span v-if="shiyan!=0">实验</span><span v-if="shiyan==0" style="color:#2083d1">实验</span>
              </router-link>          
              </li>
            <li @click="jump(1)">
              <router-link to="./new">
              <img :src="src2" alt="">
              <!-- <span>新闻</span> -->
               <span v-if="xinwen!=1">新闻</span><span v-if="xinwen==1" style="color:#2083d1">新闻</span>
              </router-link>
              </li>
            <li @click="jump(2)">
              <router-link to="./study">
              <img :src="src3" alt="">
              <!-- <span>研究</span> -->
               <span v-if="yanjiu!=2">研究</span><span v-if="yanjiu==2" style="color:#2083d1">研究</span>
              </router-link>
              </li>
            <li @click="jump(3)">
              <router-link to="./personal">
              <img :src="src4" alt="">
              </router-link>
              <!-- <span>我的</span> -->
              <span v-if="wode!=3">我的</span><span v-if="wode==3" style="color:#2083d1">我的</span>
              </li>
          </ul>
        </div>

</template>
<script>
export default {
  data() {
    return {
      src1: "./static/images/test.png",
      src2: "./static/images/new.png",
      src3: "./static/images/study.png",
      src4: "./static/images/mine.png",
      shiyan:4,
      xinwen:4,
      yanjiu:4,
      wode:4,
    };
  },
  watch: {},
  mounted:function () {
    var that = this;
    that.jump();
    
  },
 
  methods: {
    jump (idx) {
      var that = this;
      if(that.$route.path=="/test"){
        that.shiyan=0
        that.src1 = "./static/images/test_11.png";
      }else if(that.$route.path=="/new"){
        that.xinwen=1
        that.src2 = "./static/images/new_11.png";
      }else if(that.$route.path=="/study"){
        that.yanjiu=2
        that.src3 = "./static/images/study_11.png";
      }else if(that.$route.path=="/personal"){
        that.wode=3
        that.src4 = "./static/images/mine_11.png";
      }
    }
   
  }
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 0.98rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  ul {
    li {
      width: 25%;
      height: 100%;
      font-size: 0.28rem;
      color: #a4a4a4;
      text-align: center;
      float: left;
      margin-top: 0.1rem;
      img {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 auto;
      }
    }
  }
}
</style>