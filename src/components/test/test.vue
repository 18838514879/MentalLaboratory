<template>
    <div class="mine">
        <div class="header">{{mgs}}</div>
        <div class="main">
            <div class="head_b">
            <div class="test_head"></div>
            <ul class="test_datil clearfix">
              <li class="top_one" @click="myIntegral()"><img src="../../../static/images/test_top1.png" alt=""><div class="test_text"><span class="text_test">实验积分</span></div></li>
              <li @click="myAchievement()"><img src="../../../static/images/test_top2.jpg" alt=""><div class="test_text"><span class="text_test">实验成就</span></div></li>
              <li @click="myRanking()"><img src="../../../static/images/test_top3.jpg" alt=""><div class="test_text"><span class="text_test">名次排行</span></div></li>
            </ul>
            <div class="white"><img :src="img" alt=""></div>
          </div>
            <div class="answer_w" v-for="(list,idx) in lists" :key="list.id" v-show="idx < 3 == show0">
            <div class="answer clearfix" >
              <img class="answer_img" :src="list.src" alt="" @click="tiaozhuan(idx,list.remark)">
              <div class="answer_text">
                <p class="text_one" @click="tiaozhuan(idx,list.remark)">{{list.title}}<span class="dot"></span><span class="blue">答题</span></p>
                <p class="text_two">百科知识单人问答，知识竞赛</p>
                <button @click="help()">帮助</button>
              </div>
            </div>
            <div class="guding" v-if="(idx ==0 || idx ==1)==false">距离开始：{{ time }}</div>
            <div class="guding" v-if="idx == 1 == true">进行中...</div>
          </div>
        </div>
        <Foottest></Foottest>
    </div>
</template>
<script>
import Foottest from '../account/footer.vue'
export default{
    data () {
        return {
            mgs:'实验室',
            img: './static/images/portrait.png',
            src:'./static/images/test_one.png',
            startTime: '',
            endTime22: '',
            time : '',
            flag : false,
            show0:true,
            dtjxz:2,
            lists:[
//              {id:1,title:'心理问卷'},
//              {id:2,title:'心理问卷'},
//              {id:3,title:'心理问卷'},
//              {id:4,title:'心理问卷'},
//              {id:5,title:'心理问卷'},
            ]
        }
    },
    components:{
        Foottest,
    },
    mounted () {
    	this.getImg();
        this.jiekou();
    },
    props : {
        endTime : {
            type : String
        }

    },
    methods: {
    	tiaozhuan (idx,remark) {
    	  if(remark==1){
          this.$Toast("您已经答过题了")
    	    return;
        }


    		if(idx == 0){//单人答题页面
    			this.$router.push({path:'/Solo?modeId='+1})
    		}
    		if(idx == 1){// 多人页面
    			this.$router.push({path: '/moreAwait?modeId='+2})
    		}
    		if(idx == 2){// 多人困难页面
          this.$router.push({path: '/moreAwait?modeId='+3});

          if(this.$route.path=="/test"){
            if(this.dtjxz == 1){
              this.$router.push({path: '/moreAwait?modeId='+3});
            }
            return false;
          }
    		}
    	},
    	getImg(){
    		// 用户头像接口
            this.axios({
                method:"get",
                url:this.$baseurl + "/api/member/getImgUrl",
                headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
                    params:{

                        }
            }).then((res)=>{
                console.log(res.data);
                this.img = res.data.data.imgUrl;
            }).catch(err => {
                console.log(err);
            });

    	},
          //接口
        jiekou() {
            // 获取模式列表接口
            this.axios({
                method:"get",
                url:this.$baseurl + "/api/answer/getModeList",
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
                this.lists = res.data.data.list;
                // 获取开始时间
                this.startTime = res.data.data.list[2].startTime;
                // 获取结束时间
                this.endTime22 = res.data.data.list[2].endTime;
                console.log(this.startTime)
                console.log(this.endTime22)
                this.timeDown();
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

        // 返回上一页
        back () {
            this.$router.go(-1);
        },

        // 帮助页面
        help () {
            this.$router.push({path: '/help'})
        },
        // 积分页面
        myIntegral () {
            this.$router.push({path: '/myIntegral'})
        },
        // 成就页面
        myAchievement () {
            this.$router.push({path: '/myAchievement'})
        },
        // 排行页面
        myRanking () {
            this.$router.push({path: '/Ranking'})
        },
        // 倒计时
        timeDown () {
        	// 获取当前日期
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth();//得到月份
            var date = now.getDate();//得到日期
            var house = now.getHours();//得到小时
            var minutes = now.getMinutes();//得到分钟
            var seconds = now.getSeconds();//得到秒钟
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var time = "";
                time = year + "-" + month + "-" + date;
                //获取现在时间
            var timeNow = time + " "+ house+ ":"+ minutes+ ":"+ seconds;
            var btimeNow =timeNow.replace(/-/g,'/');
            console.log(btimeNow);
            // 获取现在时间转换毫秒
            var myTimeNow = new Date(btimeNow).getTime();
            // 开始时间
            var hetime = time + " "+ this.startTime;
            var bhtime = hetime.replace(/-/g,'/');
            console.log(bhtime);
            // 开始时间转换毫秒
            var formatTimeS = new Date(bhtime).getTime();

            // 结束时间
            var endtimess = time + " "+ this.endTime22;
            var endtimes1 = endtimess.replace(/-/g,'/');

            // 结束时间转换毫秒
            var endTimes2 = new Date(endtimes1).getTime();

            var myTimes =  endTimes2 - myTimeNow;//答题结束时间减去现在时间
            var myTime =  formatTimeS - myTimeNow;//答题开始时间减去现在时间
//			console.log("剩余时间"+myTime)

            if((myTime == 0 || myTime < 0) && myTimes>0){//答题进行中
            	this.dtjxz = 1;
                var xnow = "正在进行中...";
                this.time = xnow;
                return false;
            }else if (myTimes < 0){//答题结束状态
            	this.dtjxz = 2;
            	var xnow1 = "今天已结束，请明天12:00再来";
                this.time = xnow1;
//              this.show1 = true;
                return false;
            }
        	//答题计时器
        	if (myTimeNow < formatTimeS) {
	            let _this = this;
	            this.dtjxz = 2;
	            setTimeout(() => {
	            	var countdown = Math.floor(myTime/1000/60/60);
	            	var countdowns = Math.floor(myTime/1000/60%60);
	            	var countdownss = Math.floor(myTime/1000%60);
	            	if (countdown < 10) countdown = "0" + countdown;
	            	if (countdowns < 10) countdowns = "0" + countdowns;
	            	if (countdownss < 10) countdownss = "0" + countdownss;
	            	_this.time = `${countdown}小时${countdowns}分${countdownss}秒`
	                _this.timeDown();

	            }, 500);
	        }
        },
    },

}
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
      .test_datil{
        height: 2.77rem;
        background-color: #fff;
        font-size: 0.25rem;
        padding-top: 1.45rem;
        padding-left: 0.23rem;
        padding-right: 0.25rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        text-align: center;
        li{
            width: 33%;
            float: left;
            font-size: 0.25rem;
            border-left: 1px solid #9c9c9c;
            img{
                // display: block;
                float: left;
                width: 0.7rem;
                height: 0.78rem;
                margin-right: 0.16rem;
                margin-left: 0.3rem;
            }
            .test_text{
                float: left;
                .text_test{
                    color:#9c9c9c;
                    display: block;
                    padding-top: 10px;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                }

            }
        }
        .top_one{
            margin-left: 0;
            border-left: none;
        }
    }
     .white {
      width: 2.13rem;
      height: 2.13rem;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: .42rem;
    //   bottom: 0;
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

  .answer_w{
       position: relative;
       top:0.88rem;
      .answer{
        margin-top: 0.15rem;
        width: 100%;
        height: 2.13rem;
        background-color: #fff;
         padding-top: 0.23rem;
         padding-left: 0.22rem;
         padding-right: 0.25rem;
        padding-bottom: 0.18rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .answer_img{
            float: left;
            width: 2.47rem;
            height: 1.71rem;
            margin-right: 0.49rem;
        }
        .answer_text{
            float: left;
            font-size: 0.2rem;
            .text_one{
                font-size: 0.4rem;
                font-weight: 700;
                position: relative;
                .dot{
                    display: inline-block;
                    width: 0.1rem;
                    height: 0.1rem;
                    border-radius: 50%;
                    background-color: #000;
                    position: absolute;
                    top:0;
                    bottom: 0;
                    margin: auto;
                    margin-left: 2px;
                }
                .blue{
                    color: #2083d1;
                    margin-left: 0.2rem;
                }
            }
            .text_two{
                margin-bottom: 0.05rem;
                color: #9c9c9c;
            }
            button{
                width: 1.9rem;
                height: 0.5rem;
                border-radius: 20px;
                background-color: #ff8043;
                color:#fff;
                font-size: 0.3rem;
            }

        }

    }
     .guding{
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            color:#fff;
            background-color: rgba(0, 0, 0,0.3);
            /*background-color: #000;*/
            position: absolute;
            top:1.63rem;
            font-size: 0.22rem;
            text-align: center;
        }

  }
}
</style>
