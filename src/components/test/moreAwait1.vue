<template>
    <div class="mine">
        <div class="header_more">
            <div class="head_t">
                <div @click="back()" class="span11"><img class="headImg" src="../../../static/images/h_return.png" alt=""></div>
                 <!-- {{mgs}} -->
            </div>
            <div class="white clearfix"><img :src="img" alt=""></div>
            <p class="per_one">参与人数：{{ people }}</p>
            <p class="per_two">本轮总积分:{{ points }}<img src="../../../static/images/gold.png" alt=""></p>
        </div>
        <div class="per_five">
            <!-- <p class="from_time">距离开始时间还有：</p> -->
            <!-- <p class="date_time">1小时30分03秒</p> -->
            <p class="date_time" style="font-size: 1rem;">{{ number }}</p>
            <!-- <p class="at_once">“活动马上开始！请勿离开本页面。”</p> -->
        </div>
       <!-- <div class="btn">
            <p class="per_thr">说明：</p>
            <p class="per_for">
                说明是一个汉语词汇，读音为shuō míng，属于动词，意思是解释清楚，讲明解；说明原因。
                也指解释的话；说明的文字；证明。表达方式——说明：说明是用简明扼要的文字，
                把事物的形状、性质、特征、成因、关系、功用等解说清楚的表达方式。
            </p>
       </div> -->
        <img class="btn_btn" src="../../../static/images/btn_btn.jpg" alt="">
    </div>
</template>
<script>

export default{
   data () {
      return {
        //  mgs: '多人困难',
         people: '',
         points: '',
         img: '',
         time: '',
        number:''
      }
    },
    components:{

    },
    mounted () {
     var that=this;
     this.number=5;
        let time = setInterval(()=>{
           this.number--;
           if(this.number ==0){
               clearInterval(time)
               if(that.$route.path=="/moreAwait"){
                 sessionStorage.setItem("modeId",that.$route.query.modeId)
                 that.$router.push('/morePersonalStart');
               }
           }
        },1000)
    },
   props : {
       endTime : {
           type : String
        }
    },
    methods: {
      goMore () {
          this.$router.push(
              {path:
              "/morePersonalStart?modeId=" +
                this.$route.query.modeId
                // '/test'
              })
      },
      back () {
          this.$router.go(-1);
      },
       // 倒计时
        timeDown () {
            const endTime = new Date(this.endTimes);
            const nowTime = new Date();
            let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
            //    let d = parseInt(leftTime/(24*60*60))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                this.flag = true
                this.$emit('time-end')
            }
            //    this.time = `${d}天${h}小时${m}分${s}秒`
            this.time = `${h}小时${m}分${s}秒`
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                // return `0${time}`
                const TIME_COUNTSS = 1;
                if(!this.timerss){
                    this.countss = TIME_COUNTSS;
                    this.showss = false;
                    this.timerss = setInterval(()=>{
                        if(this.countss > 0 && this.countss <= TIME_COUNTSS){
                        this.countss--;
                        }else{
                        this.showss = true;
                        clearInterval(this.timerss);
                        this.timerss = null;
                        // 去答题页面
                          if(this.$route.path=="/moreAwait"){
                            sessionStorage.setItem("modeId",this.$route.query.modeId)
                            this.$router.push('/morePersonalStart');
                          }
//                        this.$router.push({path:'/morePersonalStart?modeId=' + this.$route.query.modeId});
                        }
                    },1000)
                }
                return 0
            }
        },

  },
    created () {
        // 获取头像接口
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
            localStorage.setItem('token' ,'')
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
              message: res.msg,
              position: 'bottom'
            });
          }

       }).catch(err => {
         console.log(err);
       });
        // 获取参与人数和积分接口
       this.axios.get(this.$baseurl + "/api/answer/getModeInfo",{
            headers:{"token":localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params: {
                modeId:this.$route.query.modeId,
                paperId: this.$route.query.paperId,
            }
       }).then( res => {
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
           console.log(res.data.data);
           this.points = res.data.data.points;
           this.people = res.data.data.peopleCount;
            if(res.data.data.points == null){
            this.points = 0;
          }
          if(res.data.data.peopleCount == null){
            this.people = 0;
          }

           // 倒计时
           // 获取开始时间
           this.startTime = res.data.data.startTime;
           console.log(this.startTime)
           // 获取结束时间
           this.endTimess = res.data.data.endTime;

           // 获取当前日期
           var now = new Date();
           var year = now.getFullYear(); //得到年份
           var month = now.getMonth();//得到月份
           var date = now.getDate();//得到日期
           month = month + 1;
           if (month < 10) month = "0" + month;
           if (date < 10) date = "0" + date;
           var time = "";
           time = year + "-" + month + "-" + date;
           // 开始时间
           // var hetime = time + " "+ this.startTime;
           // var bhtime = hetime.replace(/-/g,'/');
           // console.log(bhtime);
           // 开始时间转换毫秒
           // var formatTimeS = new Date(bhtime).getTime();
           // console.log(formatTimeS);

           // 结束时间
           var endtimess = time + " "+ this.endTimess;
           var endtimes = endtimess.replace(/-/g,'/');
           // 结束时间转换毫秒
           this.endTimes = new Date(endtimes).getTime();
         }else{
           this.$Toast({
             message: res.msg,
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
  .header_more {
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
       margin-top: 0.31rem;
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
    //    margin-top: 0.15rem;
  }
  .per_for{
        font-size: 0.26rem;
        color:#666666;
        text-align: left;
        margin-top: 0.12rem;
        text-indent: 2em;
  }
  button{
      height: 0.9rem;
      width: 7rem;
      background-color: #ff8043;
      border-radius: 45px;
      color:#fff;
      font-size: 0.32rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 2.45rem;

  }

  }
  .btn_btn{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 2.24rem;
  }
  .per_five{
      margin-top: .65rem;
      .from_time{
            font-size: .40rem;
            font-weight: 700;
            color: #ff8043;
            text-align: center;
      }
      .date_time{
            font-size: .40rem;
            color: #ff8043;
            text-align: center;
            margin-top: .26rem;
      }
      .at_once{
            font-size: .31rem;
            color: #ff8043;
            text-align: center;
            margin-top: .25rem;
      }
  }



}
</style>
