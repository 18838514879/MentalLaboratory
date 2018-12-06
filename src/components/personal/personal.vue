<template>
    <div class="mine">
         <div class="header">{{mine}}</div>
          <div class="head_b">
              <div class="test_head"></div>
              <div class="mid clearfix"><span class="name">{{name}}</span><span class="test">实验积分：</span><span class="integral">{{integral}}</span></div>
              <div class="white"><img :src="src" alt=""></div>
          </div>
        <div class="conter">
            <div class="btn" @click="myIntegral()" style="margin-top:1.04rem;">
                <ul>
                   <li class="jifen clearfix" ><a  class="clearfix"><img src="../../../static/images/integral.png" alt="" class="img_le"><span class="tex_m">我的积分</span><img src="../../../static/images/m_return.png" alt="" class="img_ri"></a></li>
                </ul>
            </div>

             <div class="btn" @click="myAchievement()">
                <ul>
                   <li class="jifen clearfix"><a  class="clearfix"><img src="../../../static/images/achieve.png" alt="" class="img_le"><span class="tex_m">我的成就</span><img src="../../../static/images/m_return.png" alt="" class="img_ri"></a></li>
                </ul>
            </div>

             <div class="btn" @click="mySet()">
                <ul>
                   <li class="jifen clearfix"><a  class="clearfix"><img src="../../../static/images/set.png" alt="" class="img_le"><span class="tex_m">我的设置</span><img src="../../../static/images/m_return.png" alt="" class="img_ri"></a></li>
                </ul>
            </div>

             <div class="btn" @click="about()">
                <ul>
                   <li class="jifen clearfix"><a  class="clearfix"><img src="../../../static/images/about.png" alt="" class="img_le"><span class="tex_m">关于我们</span><img src="../../../static/images/m_return.png" alt="" class="img_ri"></a></li>
                </ul>
            </div>
             <div class="btn" @click="opinion(phone)">
                <ul>
                   <li class="jifen clearfix"><a  class="clearfix"><img src="../../../static/images/about.png" alt="" class="img_le"><span class="tex_m">意见反馈</span><img src="../../../static/images/m_return.png" alt="" class="img_ri"></a></li>
                </ul>
            </div>
        </div>
        <Footerone></Footerone>
    </div>
</template>
<script>
import Footerone from "../account/footer.vue";
export default {
  data() {
    return {
      mine: "我的",
      name: "",
      integral: "",
      src: ""
    };
  },
  components: { Footerone },
  methods: {
    myAchievement() {
      this.$router.push({ path: "/myAchievement" });
    },
    myIntegral() {
      this.$router.push({ path: "/myIntegral" });
    },
    mySet() {
      this.$router.push({ path: "/mySet" });
    },
    about() {
      this.$router.push({ path: "/about" });
    },
    opinion(phone){
       this.$router.push({ path: "/opinion?phone=" + this.phone });
    }
  },
  created() {
    console.log("created"),
      this.axios({
          method:"get",
           url:this.$baseurl + "/api/member/getMemberInfo",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                   phone:this.$route.query.phone,
                  }
       }).then((res)=>{
        if(res.data.code=="401"){
          this.$Toast({
            message: '登录已经过期',
            position: 'bottom'
          });
          localStorage.setItem('token' ,'')
          this.$router.push("/login")
        }else if(res.data.code=="402"){
          this.$Toast({
            message: '您还未登录',
            position: 'bottom'
          });
          this.$router.push("/login")
        }else if(res.data.code=="0"){
          console.log(res);
          this.name = res.data.member.nickname;
          this.src = res.data.member.imgUrl;
          this.integral = res.data.member.pointsTrue;
          this.phone = res.data.member.phone;
          if(res.data.member.pointsTrue == null){
            this.integral = 0;
          }
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }

       }).catch(err => {
         console.log(err);
       });

  },
};
</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
   .header {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size:0.36rem;
    background-color: #2083d1;
    color:#fff;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
      }
    .head_b {
      width: 100%;
      background-color: #fff;
      position: relative;
      top:0.88rem;
      .test_head{
        height: 1.28rem;
        background-color: #2083d1;
      }
      .mid {
        width: 100%;
        background-color: #fff;
        text-align: center;
        margin-top: 1.22rem;
        .name {
          display: block;
          font-size: 0.4rem;
          line-height: 0.64rem;
          text-align: center;
          color: #000;
        }
        .test {
          display: block;
          font-size: 0.28rem;
          line-height: 0.76rem;
          color: #9c9c9c;
          float: left;
          padding-left: 2.49rem;
          padding-right: 0.32rem;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        .integral {
          display: block;
          font-size: 0.25rem;
          line-height: 0.76rem;
          color: #2083d1;
          float: right;
          padding-right: 2.68rem;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
      }

     .white {
      width: 2.13rem;
      height: 2.13rem;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: .42rem;
      // bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      padding: 0.16rem;
      box-sizing: border-box;
      text-align: center;
      img {
        width: 1.82rem;
        height: 1.82rem;
        border-radius: 50%;
        float: left;
      }
    }

    }
  .conter {
    width: 100%;
    height: auto;
    background-color: #e9e9e9;
    .btn {
      margin-top: 0.16rem;
      background-color: #fff;
      .jifen {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        margin-top: 0.16rem;
        background-color: #fff;
        a {
          display: block;
          width: 100%;
          height: 100%;
          .img_le {
            float: left;
            width: 0.36rem;
            height: 0.36rem;
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
            margin-left: 0.3rem;
          }
          .tex_m {
            display: block;
            float: left;
            font-size: 0.3rem;
            margin-left: 0.2rem;
          }
          .img_ri {
            float: right;
            width: 0.2rem;
            height: 0.3rem;
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
