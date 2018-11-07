<template>
    <div class="mine">
        <div class="header">
            <div class="head_t">
                <span @click="testss()" class="span11"><img src="../../../static/images/h_return.png" alt=""></span>
                <span style="margin-right: .45rem;">标题</span>
            </div>
            <div class="white clearfix"><img src="../../../static/images/portrait.png" alt=""></div>
            <p class="per_one">
                <!-- <span><i class="fa fa-user" aria-hidden="true"></i></span>
                参与人数：{{people}}人 -->
            </p>
            <p class="per_two">
                <img src="../../assets/qian.png" alt="">
                奖励积分:{{ points }}
                <img src="../../../static/images/gold.png" alt="">
            </p>
        </div>
       <div class="btn">
            <button class="back" @click="Sumit()">本剧回顾</button><button class="exit" @click="testss()">继续挑战</button>
       </div>
    </div>
</template>
<script>

export default{
   data () {
      return {
         points:'',
        //  people:'999',
      }
    },
  components:{

    },
    methods: {
        testss () {
            this.$router.push({path: '/Solo?modeId='+1})
        },
        Sumit () {
            this.$router.push({path: '/Sumit'})
        },
        back () {
            this.$router.go(-1);
        }
    },
    created () {
        this.axios({
            method:"get",
            url:this.$baseurl + "/api/answer/getOver",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{

                subjectReviewId:  localStorage.getItem("subjectReviewId"),
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
            console.log(res.data);
            this.points = res.data.data.points;
            //  this.people = res.data.data.peopleCount;
              if(res.data.data.points == null){
            this.points = 0;
          }
        //   if(res.data.data.peopleCount == null){
        //     this.people = 0;
        //   }
          }else{
            this.$Toast({
              message: res.data.msg,
              position: 'bottom'
            });
          }
       }).catch(err => {
         console.log(err);
       });
    }
}

</script>
<style lang="scss" scoped>
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
            width: 0.4rem;
            height: 0.5rem;
            float: left;
            padding-left: 0.25rem;
            box-sizing:border-box;
            -webkit-box-sizing: border-box;
        }
    }
    .white {
      width: 2.13rem;
      height: 2.13rem;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: 0;
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
       margin-top: 2.38rem;
      img{
          width: 0.45rem;
          height: 0.45rem;
          vertical-align: middle;
          margin-left: 0.21rem;
      }
    }
  }
  .btn{
        padding-left: 0.24rem;
        padding-right: 0.24rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
   button{
      height: 0.9rem;
      width: 3.05rem;
      border-radius: 45px;
      color:#fff;
      font-size: 0.32rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 2.9rem;

  }
  .back{
      background-color: #0d86d2;
      margin-left: 0.24rem;

  }
  .exit{
       background-color: #ff8043;
       margin-right: 0.24rem;

  }

  }

}
</style>
