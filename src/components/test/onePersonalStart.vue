<template>
    <div class="mine">
        <div class="header">
          <div class="head_t">
                <a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
                <span style="margin-right:.45rem;">{{mgs}}</span>
          </div>
          <div class="white clearfix"><img :src="img" alt=""></div>
          <!-- <div class="white clearfix"><img src="../../../static/images/portrait.png" alt=""></div> -->
            <p class="per_one">参与人数：{{ people }}</p>
            <p class="per_two">奖励积分:{{ points }}<img src="../../../static/images/gold.png" alt=""></p>
        </div>
       <div class="btn">
            <p class="per_thr">说明:</p>
        <p class="per_for">
            表达方式——说明：说明是用简明扼要的文字，把事物的形状、性质、特征、成因、关系、
            功用等解说清楚的表达方式。这种被解说的对象，有的是实体的事物，如山川、江河、
            花草、树木、建筑、器物等；有的是抽象的道理，如思想、意识、修养、观点、概念、原理、技术等。
        </p>
        <button @click="goMore()">开始答题</button>
       </div>
        <img class="btn_btn" src="../../../static/images/btn_btn.jpg" alt="">
    </div>
</template>
<script>

export default{
   data () {
      return {
         mgs: '',
         img: '',
         people:'',
         points: ''
      }
    },
  components:{

  },
  methods: {
      goMore () {
          this.$router.push(
              {path:
              "/morePersonalStart?modeId=" +
                this.$route.query.modeId
              })
      },
      back () {
          this.$router.go(-1);
      }
  },
 created () {
        this.axios({
            method:"GET",
            url:this.$baseurl + "/api/member/getImgUrl",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
               token:localStorage.getItem('token')
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
            this.img = res.data.data.imgUrl;
          }else{
            this.$Toast({
              message: res.data.msg,
              position: 'bottom'
            });
          }

       }).catch(err => {
         console.log(err);
       });
        // 获取参与人数和积分接口
       this.axios.get(this.$baseurl + "/api/answer/getModeInfo",
       {

            headers:{"token":localStorage.getItem("token"),"Content-Type": "application/x-www-form-urlencoded"},
            params: {
                modeId: 2,
                paperId: this.$route.query.paperId
            }
       }).then( res => {
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
           this.points = res.data.data.points
           this.people = res.data.data.peopleCount
         }else{
           this.$Toast({
             message: res.data.msg,
             position: 'bottom'
           });
         }

       }).catch( err => {
           console.log(err);
       })
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
        padding-left: 0.24rem;
        padding-right: 0.24rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
      .per_thr{
       font-size: 0.26rem;
      color:#2083d1;
       text-align: left;
       margin-top: 0.73rem;
  }
  .per_for{
        font-size: 0.26rem;
        color:#666666;
        text-align: left;
        margin-top: 0.24rem;
        text-indent: 2em;
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
      margin-top: 2.9rem;

  }

  }
  .btn_btn{
      position: fixed;
      bottom: 0;
  }
}
</style>
