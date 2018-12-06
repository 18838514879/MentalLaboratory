<template>

       <div class="footer">
          <ul class="clearfix">
            <li>
              <router-link to="./test">
              <img :src="src1" alt="">
               <span v-if="shows1">实验</span><span v-if="!shows1" style="color:#2083d1">实验</span>
              </router-link>          
              </li>
            <li>
              <router-link to="./new">
              <img :src="src2" alt="">
               <span v-if="shows2">新闻</span><span v-if="!shows2" style="color:#2083d1">新闻</span>
              </router-link>
              </li>
            <li>
              <router-link to="./study">
              <img :src="src3" alt="">
               <span v-if="shows3">研究</span><span v-if="!shows3" style="color:#2083d1">研究</span>
              </router-link>
              </li>
            <li>
              <router-link to="./personal">
              <img :src="src4" alt="">
              <span v-if="shows4">我的</span><span v-if="!shows4" style="color:#2083d1">我的</span>
              </router-link>
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
      shows1:true,
      shows2:true,
      shows3:true,
      shows4:true,
    };
  },
  watch: {},
  mounted:function () {
    var that = this;
    
     if(that.$route.path=="/test"){
        that.jump(0);
      }else if(that.$route.path=="/new"){
        that.jump(1);
      }else if(that.$route.path=="/study"){
        that.jump(2);
      }else if(that.$route.path=="/personal"){
        that.jump(3);
      }
  },
 
  methods: {
    jump (idx) {
      var that = this;
      if(idx == 0){
        that.shows1=false
        that.shows2=true
        that.shows3=true
        that.shows4=true
        that.src1 = "./static/images/test_11.png";
        that.src2 = "./static/images/new.png";
        that.src3 = "./static/images/study.png";
        that.src4 = "./static/images/mine.png";
      }else if(idx == 1){
        that.shows2=false
        that.shows1=true
        that.shows3=true
        that.shows4=true
        that.src2 = "./static/images/new_11.png";
        that.src1 = "./static/images/test.png";
        that.src3 = "./static/images/study.png";
        that.src4 = "./static/images/mine.png";
      }else if(idx == 2){
        that.shows3=false
        that.shows2=true
        that.shows1=true
        that.shows4=true
        that.src3 = "./static/images/study_11.png";
        that.src2 = "./static/images/new.png";
        that.src1 = "./static/images/test.png";
        that.src4 = "./static/images/mine.png";
      }else if(idx == 3){
        that.shows4=false
        that.shows2=true
        that.shows3=true
        that.shows1=true
        that.src4 = "./static/images/mine_11.png";
        that.src2 = "./static/images/new.png";
        that.src3 = "./static/images/study.png";
        that.src1 = "./static/images/test.png";
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