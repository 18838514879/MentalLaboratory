<template>
    <div class="mine">
        <div class="header">
            <div class="head_t">
               <div @click="testss()" class="span11"><img class="headImg" src="../../../static/images/h_return.png" alt=""></div>
                <!-- <span style="margin-right: .45rem;">标题</span> -->
                 {{msg}}
            </div>
            <div class="white clearfix"><img src="../../../static/images/portrait.png" alt=""></div>
            <!-- <p class="per_one">老鼠爱上猫</p> -->
        </div>
       <div class="btn">
            <!-- <p class="per_thr">您成为最终9人</p>
            <p class="per_for">您战胜了2762人（新纪录）</p>
            <p class="per_five">您获得了3000点积分 </p> -->
            <p class="per_one">
                <!-- <span><i class="fa fa-user" aria-hidden="true"></i></span>
                参与人数：{{peopleCount}}人 -->
            </p>
            <p class="per_two">
                <img src="../../assets/qian.png" alt="">
                奖励积分:{{ points }}
                <img src="../../../static/images/gold.png" alt="">
            </p>
            <button @click="test()">确定</button>
       </div>
        <img class="btn_btn" src="../../../static/images/btn_btn.jpg" alt="">
    </div>
</template>
<script>

export default{
   data () {
      return {
         msg: '',
         points:'0',
        //  peopleCount:'999',
      }
    },
  mounted () {
      this.getResult();
  },
  methods : {
      test () {
          this.$router.push({path:'/test'})
      },
      back () {
//          this.$router.go(-1)
        this.$router.push('/test')
      },
    getResult(){
      this.axios({
        method:"get",
        url:this.$baseurl + "/api/answer/getOver",
        headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
        params:{
          token:localStorage.getItem('token'),
          subjectReviewId: sessionStorage.getItem("subjectReviewId"),
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
          if(res.data.data.points == null){
            this.points = 0;
          }else{
            this.points = res.data.data.points;
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
  },
}

</script>
<style lang="scss" scoped>

//
.per_one{
     font-size: 0.4rem;
     color:#626262;
     font-weight: 700;
     text-align: center;
    //  margin-top: 1.52rem;
    }
  .per_two{
      font-size: 0.38rem;
      color:#2083d1;
       text-align: center;
       margin-top: 0.38rem;
      img{
          width: 0.45rem;
          height: 0.45rem;
          vertical-align: middle;
          margin-left: 0.21rem;
      }
  }
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  .header {
    width: 100%;
    height: 4.93rem;
    position: relative;
    .head_t {
      width: 100%;
      height: 2.16rem;
      line-height: 0.88rem;
      background-color: #2782d7;
      font-size: 0.4rem;
      color: #fff;
      text-align: center;
      .span11{
            display: block;
            width: 0.5rem;
            height: 0.88rem;
            float: left;
            padding-left: 0.25rem;
            padding-top: 0.25rem;
            box-sizing:border-box;
            -webkit-box-sizing: border-box;
             .headImg{
                display: block;
                width: .18rem;
                height: .25rem;
              }
        }
    }
    .white {
      width: 2.13rem;
      height: 2.13rem;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: -27px;
      bottom: 0;
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
    .per_one{
     font-size: 0.4rem;
     color:#626262;
     font-weight: 700;
     text-align: center;
     margin-top: 1.52rem;
 }
  .per_two{
      font-size: 0.38rem;
      color:#2083d1;
       text-align: center;
       margin-top: 0.38rem;
      img{
          width: 0.45rem;
          height: 0.45rem;
          vertical-align: middle;
          margin-left: 0.22rem;
      }
  }
  }
  .btn{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
      .per_thr{
            font-size: .40rem;
            color: #ff8043;
            text-align: center;
            font-weight: 700;
        }
        .per_for{
            margin-top: .38rem;
            font-size: .40rem;
            color: #ff8043;
            text-align: center;
        }
        .per_five{
            font-size: .40rem;
            color: #ff8043;
            text-align: center;
        }
  button{
      height: 0.9rem;
      width: 7rem;
      background-color: #ff8043;
      border-radius: 20px;
      color:#fff;
      font-size: 0.32rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 3rem;

  }

  }
  .btn_btn{
      position: fixed;
      bottom: 0;
  }
}
</style>
