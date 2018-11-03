<template>
    <div class="mine">
     <div class="header clearfix"><a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
        <div class="integral">
                <ul class="top clearfix">
                    <li class="top_fir"><img src="../../../static/images/myjifen_3.png" alt=""><p class="integral_text">全部积分</p><p class="integral_num">{{all}}</p></li>
                    <li class="top_sec"><img src="../../../static/images/myjifen_2.png" alt=""><p class="integral_text">可用积分</p><p class="integral_num">{{usable}}</p></li>
                    <li class="top_thr"><img src="../../../static/images/myjifen_1 .png" alt=""><p class="integral_text">已用积分</p><p class="integral_num">{{used}}</p></li>
                </ul>
                <ul class="btn">
                    <li class="detail" @click="myIntegralDati()"><div class="detail_text">积分明细</div><div class="detail_img"><img src="../../../static/images/m_return.png" alt=""></div></li>
                    <li class="detail" @click="creditsExchanges()"><div class="detail_text">积分兑换</div><div class="detail_img"><img src="../../../static/images/m_return.png" alt=""></div></li>
                </ul>
        </div>

    </div>
</template>
<script>

export default {
  data() {
    return {
         mgs:'我的积分',
         all:'100',
         usable:'20',
         used:'80',
    };
  },

   created() {
    console.log("created"),
      this.axios({
          method:"get",
           url:this.$baseurl + "/api/member/getMemberPoints",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            data:{
                    points:this.all,
                    pointsFalse:this.used,
                    pointsTrue:this.usable,
                  }
       }).then((res)=>{
        if(res.data.code=="401"){
          this.$Toast({
            message: '登录已经过期',
            position: 'bottom'
          });
          this.$router.push("/login")
        }else if(res.data.code=="402"){
          this.$Toast({
            message: '您还未登录',
            position: 'bottom'
          });
          this.$router.push("/login")
        }else if(res.data.code=="0"){
          console.log(res);
          this.text=res.data.aboutUsconsole.log(res);
          this.all=res.data.data.points;
          this.used=res.data.data.pointsFalse;
          this.usable=res.data.data.pointsTrue;
          if(res.data.data.pointsTrue == null){
            this.all = 0;
          }
          if(res.data.data.points == null){
            this.used = 0;
          }
          if(res.data.data.pointsTrue == null){
            this.usable = 0;
          }
          var usedIntegral = res.data.data.pointsTrue;
          localStorage.setItem('usedIntegral', usedIntegral);
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

  methods: {
      back () {
          this.$router.go(-1);
      },
      myIntegralDati () {
          this.$router.push({path: '/myIntegralDatil'})
      },
      creditsExchanges () {
          this.$router.push({path: '/creditsExchange'})
      }
  }

};
</script>
<style lang="scss" scoped>
.mine{
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
   .header{
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.36rem;
        background-color: #2083d1;
        color:#fff;
        text-align: center;
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        a{
            display: block;
            width: 0.4rem;
            height: 0.5rem;
            float: left;
            padding-left: 0.25rem;
            box-sizing:border-box;
            -webkit-box-sizing: border-box;
        }

    }

  .integral{
      margin-top: 0.88rem;
      .top{
          margin-top: 0.22rem;
          margin-bottom: 0.18rem;
          height: 2.65rem;
          font-size: 0.28rem;
          background-color: #fff;
          padding-top: 0.54rem;
          padding-bottom: 0.48rem;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          li{
              float: left;
              width: 33.333%;
              text-align: center;
              img{
                  width: 0.54rem;
                  height: 0.6rem;
              }
              .integral_text{
                  margin-top: 0.2rem;
                  margin-bottom: 0.28rem;
              }
              .integral_num{
                  font-size: 0.2rem;
              }
          }
          .top_fir{
              color: #2083d1;
          }
          .top_sec{
              color: #ea8f46;
          }
          .top_thr{
              color: #9c9c9c;
          }

      }
      .btn{
          background-color: #fff;
          padding-left: 0.25rem;
          padding-right: 0.22rem;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          .detail{
              height: 1.08rem;
              line-height: 1.08rem;
              font-size: 0.32rem;
              text-align: center;
              border-bottom:1px solid #f3f3f3 ;
              .detail_text{
                  float: left;

              }
              .detail_img{
                  float: right;
                  img{
                      width: 0.22rem;
                      height: 0.30rem;
                  }

              }

          }

      }
  }

}
</style>

