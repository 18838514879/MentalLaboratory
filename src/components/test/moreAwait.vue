<template>
    <div class="mine">
        <div class="header_more">
            <div @click="back()" class="span11"><img class="headImg" src="../../../static/images/h_return.png" alt=""></div>
        </div>
        <!-- 等待页面 -->
        <div v-if="showd">
           <div class="head_tw">
               <div class="head_t">
                <div class="white clearfix"><img :src="img" alt=""></div>
           </div>
           </div>
            <p class="per_one">参与人数：{{ people }}</p>
            <p class="per_two">本轮总积分:{{ points }}<img src="../../../static/images/gold.png" alt=""></p>
            <div class="per_five">
                <p class="date_time" style="font-size: 1rem;">{{ number }}</p>
            </div>
            <img class="btn_btn" src="../../../static/images/btn_btn.jpg" alt="">
       </div>
       <!-- 答题页面 -->
       <div v-if="showt">
            <div class="top" v-if="shows1">
                <img :src="src" alt="" class="top_img_png">
            </div>
            <div class="mine_text">{{ title }}</div>
            <div class="btn" v-if="myAnswer==-1">
                <div class="bth_zhu bth_bai"  v-for="(item1) in list1" :key="item1.id" @click="dati(item1.id)">{{ item1.timu }}</div>
            </div>
            <div class="btn" v-if="myAnswer!=-1">
                <div class="bth_zhu bth_bai"  v-for="(item1) in list1" :key="item1.id" :class="answer==item1.id?'bth_lv':myAnswer==item1.id?'bth_Rd' :''">{{ item1.timu }}</div>
            </div>

            <div class="footerBtn">
                <div v-if="page==1" @click="back()">返回</div>
                <div v-if="page!=1" @click="pre()">上一题</div>
                <div v-if="isNext==true" @click="next()">下一题</div>
                <div class="orange" v-if="isNext==false" @click="tijiao()">提交</div>
            </div>
       </div>
        <!--获取答题的统计窗口-->
      <div class="mine1" v-show="staticShow">
        <div class="top1" v-if="shows1">
            <img :src="src" alt="" class="top_img_png">
        </div>
        <p class="mine_text1">{{ title }}</p>
        <div class="daanList">
          <div class="daanListItem" v-for="(item,idx) in staticList" :key="idx" >
            <div>{{item.value}}人</div>
            <div class="daanListItemDaAn">
              <div  class="DaAnheight" :style="'height:'+item.proportion*2+'rem'" ></div>
            </div>
            <div class="">{{item.title}}</div>
          </div>
        </div>
      </div>
      <!-- 答题结束页面 -->
      <div class="mine11" v-if="showe">
         <div class="head_tw">
            <div class="head_t">
                <div class="white clearfix"><img :src="imgs" alt=""></div>
            </div>
           </div>
       <div class="btn">
            <p class="per_one">
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
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
   data () {
      return {
         people: '',
         points: '',
         img: '',
         imgs:'',
         time: '',
        number:'',
        title: '',
        shows1:true,
        page:1,
        numbers: 1,
        list1:[],
        subjectReviewId:'',
        myAnswer:'-1',
        answer:'-1',
        color:'',
        subjectId:'',
        staticShow:false,
        tileId:0,
        staticList:[],
        isNext:false,
        src:'',
        showt:false,
        showd:true,
        showe:false,
      }
    },

// created () {
//     this.page=1;
//   },

    mounted () {
     var that=this;
     this.number=5;
        let time = setInterval(()=>{
           this.number--;
           if(this.number ==0){
               clearInterval(time)
               this.showd=false;
               this.showt=true;
               that.getTopic1();
           }
        },1000)
    that.page=1;
    that.numbers=1;
    that.getImg();
    that.getPro();    
    },
   props : {
       endTime : {
           type : String
        }
    },
    methods: {
  
      back () {
          this.$router.go(-1);
      },
     test () {
          this.$router.push({path:'/test'})
      },

 // 获取头像接口
      getImg(){
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
      },


      getImgs(){
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
            this.imgs = res.data.data.imgUrl;
          }else{
            this.$Toast({
              message: res.msg,
              position: 'bottom'
            });
          }

       }).catch(err => {
         console.log(err);
       });
      },


    // 获取参与人数和积分接口
      getPro(){
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
                        }
                    },1000)
                }
                return 0
            }
        },

      tank () {
        MessageBox.alert('您被淘汰了').then(action => {
          this.showt=false;
          this.showd=false;
          this.showe=true;
          this.getResult();
           this.getImgs();
        })
      },
      next(){
        // this.page++;
        this.numbers++;
        this.getTopic();
      },
      pre(){
        // this.page--;
        this.numbers--;
        this.getTopic();
      },
      tijiao(){
        this.showe=true;
        this.showt=false;
        this.showd=false;
       
        this.getResult();
         this.getImgs();
      },
      dati(i){
        var that=this;
        this.myAnswer=i;
        this.axios({
          method:"post",
          url:this.$baseurl + "/api/answer/saveAnswer",
          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
          params:{
            token:localStorage.getItem('token'),
            id:this.tileId,
            options:i
          }
        }).then((res)=>{
          console.log(res.data);
         
//          that.page++;
          if(that.myAnswer==that.answer){
            this.$Toast("获得积分")
            this.getStatic()
          }else{
            this.$Toast("结算积分")
//            setTimeout(f)
              this.showe=true;
              this.showt=false;
              this.showd=false;
              this.getResult();
              this.getImgs();
          }

        }).catch(err => {
          console.log(err);
        });
      },
      //多人模式
      getTopic1(){
        this.axios({
          method:"get",
          url:this.$baseurl + "/api/answer/getSubject",
          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
          params:{
            token:localStorage.getItem('token'),
            modeId:this.$route.query.modeId,
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
            this.title = res.data.data.title;
            this.subjectId = res.data.data.subjectId;
            this.tileId=res.data.data.id;
            this.isNext=res.data.data.next;
            this.src=res.data.data.remark;
            this.numbers = res.data.data.numbers;
            if(res.data.data.remark == null){
              this.shows1 = false;
            }
            // if(sessionStorage.getItem("modeId")==3){
            //   this.src=res.data.data.remark;
            // }else{
            //   this.src="";
            // }

            res=res.data;
            this.stringToArray1(this.list1,res.data.optionA,"1")
            this.stringToArray1(this.list1,res.data.optionB,"2")
            this.stringToArray1(this.list1,res.data.optionC,"3")
            this.stringToArray1(this.list1,res.data.optionD,"4")
            this.stringToArray1(this.list1,res.data.optionE,"5")
            console.log(this.title)
            console.log(this.subjectId)
            console.log(this.tileId)
            console.log(this.isNext)
            console.log(this.numbers)

            if(this.page==1){
              this.subjectReviewId=res.data.subjectReviewId;
              sessionStorage.setItem("subjectReviewId",res.data.subjectReviewId)
            }
            if(res.data.options!=null){
              this.myAnwer=res.data.options;
            }else{
              this.myAnwer=-1;
            }
            if(res.data.optionRight!=null){
              this.answer=res.data.optionRight;
            }else{
              this.answer=-1;
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
      getTopic(){
        this.myAnswer=-1;
        this.answer=-1;
        this.list1=[];
        this.axios({
          method:"get",
          url:this.$baseurl + "/api/answer/getSubject",
          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
          params:{
            token:localStorage.getItem('token'),
            subjectReviewId:this.subjectReviewId,
            numbers:this.numbers
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
            this.title = res.data.data.title;
            this.tileId=res.data.data.id;
            this.isNext=res.data.data.next;
            this.src=res.data.data.remark;
            if(res.data.data.remark == null){
              this.shows1 = false;
            }
    
            res=res.data;
            this.stringToArray1(this.list1,res.data.optionA,"1")
            this.stringToArray1(this.list1,res.data.optionB,"2")
            this.stringToArray1(this.list1,res.data.optionC,"3")
            this.stringToArray1(this.list1,res.data.optionD,"4")
            this.stringToArray1(this.list1,res.data.optionE,"5")

            if(res.data.options!=null){
              this.myAnswer=res.data.options;
            }else{
              this.myAnswer=-1;
            }
            if(res.data.optionRight!=null){
              this.answer=res.data.optionRight;
            }else{
              this.answer=-1;
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
      getStatic() {
        var that = this;
        // 获取答案答题人数接口
        this.axios({
          method: "get",
          url: this.$baseurl + "/api/answer/getOptionCount",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: {
            id: this.tileId
          }
        }).then(res => {
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
            that.staticShow = true;
            this.staticList=[];


            var allPeople=Number(res.data.data.optionA==null?0:res.data.data.optionA)+Number(res.data.data.optionB==null?0:res.data.data.optionB)+Number(res.data.data.optionC==null?0:res.data.data.optionC)+Number(res.data.data.optionD==null?0:res.data.data.optionD)+Number(res.data.data.optionE==null?0:res.data.data.optionE);
            this.stringToArray(this.staticList,res.data.data.optionA,"optionA",allPeople);
            this.stringToArray(this.staticList,res.data.data.optionB,"optionB",allPeople);
            this.stringToArray(this.staticList,res.data.data.optionC,"optionC",allPeople);
            this.stringToArray(this.staticList,res.data.data.optionD,"optionD",allPeople);
            this.stringToArray(this.staticList,res.data.data.optionE,"optionE",allPeople);
            setTimeout(function () {
              that.staticShow = false;
              if(that.isNext==true){// 答题成功 直接跳到下一题
                that.next()
              }
            }, 5000)
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
      stringToArray(arr,a,b,c){
        if(!(a==null || a=="")|| a=='0'){
          var d={};
          d.value=a;
          d.title=b;
          d.proportion=a/c;
          arr.push(d);
        }
      },
      stringToArray1(arr,a,b,c){
      if(!(a==null || a=="")){
        var d={};
        d.timu=a;
        d.id=b;
        arr.push(d);
      }
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
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  .header_more {
    width: 100%;
    height: 0.88rem;
    background-color: #2782d7;
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

  .head_tw{
      width: 100%;
      height: 2.56rem;
        position: relative;
        .head_t {
            width: 100%;
            height: 1.28rem;
            line-height: 0.88rem;
            background-color: #2782d7;
            font-size: 0.4rem;
            color: #fff;
            text-align: center;      
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
 .top{
      width: 100%;
      height: 3rem;
      padding-left: 0.24rem;
      padding-right: 0.24rem;
      margin-top:.2rem;
      text-align: center;
      box-sizing:border-box;
      -webkit-box-sizing: border-box;
        img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .mine_text{
      width: 7.03rem;
      font-size: .36rem;
      line-height: .49rem;
      color: #282828;
      padding-left: 0.24rem;
      margin-top: .2rem;
      margin-bottom: .86rem;
    }
    .btn{
      // margin-top: .86rem;
       .bth_zhu{
          overflow: hidden;
          width: 1.68rem;
          height: 2.71rem;
          border-radius: 6px;
          display: inline-block;
          font-size: .36rem;
          text-align: center;
          line-height: 3.8rem;
          font-weight: 500;
        }
      .bth_bai{
          overflow: hidden;
          border: solid 1px #91cb53;
          color:#333333;
          margin-left: 1.35rem;
        }
      .bth_lv{
          overflow: hidden;
          background-color: #91cb53;
          color: #ffffff;
          margin-left: 1.35rem;
        }
    .bth_Rd{
        overflow: hidden;
        background-color: red;
        color: #ffffff;
        margin-left: 1.35rem;
      }
  
    }
    .footerBtn{
      font-size: 16px;
      div{
        width: 3.18rem;
        height: 0.89rem;
        background-color: #2083d1;
        border-radius: 0.45rem;
        border: none;
        margin-left: 0.24rem;
        margin-right: 0.3rem;
        font-size: 0.36rem;
        font-weight: normal;
        font-stretch: normal;
        /*line-height: 0.42rem;*/
        color: #ffffff;
        margin-bottom: 0.43rem;
        text-align: center;
        line-height: 0.89rem;
        float: left;
      }
      .orange{
      background-color: rgb(255, 128, 67);
      }
    }

    .mine1{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0.88rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255,255,255,1);
      .top1{
      width: 100%;
      height: 3rem;
      padding-left: 0.24rem;
      padding-right: 0.24rem;
      margin-top:0.2rem;
      text-align: center;
      box-sizing:border-box;
      -webkit-box-sizing: border-box;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
   
    }
    .mine_text1{
      width: 7.03rem;
      font-size: .36rem;
      line-height: .49rem;
      color: #282828;
      padding-left: 0.24rem;
      margin-top: .2rem;
      margin-bottom: .86rem;
    }
    .daanList{
      width: 7rem;
      font-size: 16px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .daanListItem{
        float: left;
        width: 1rem;
        text-align: center;
        .daanListItemDaAn{
          width: 1.68rem;
          height: 2.71rem;
          border-radius: 6px;
          border: 1px solid #6d6d72;
          position: relative;
          .DaAnheight{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            background-color: green;
          }
        }
      }
    }


    .mine11 {

    .head_tw{
      width: 100%;
      height: 2.56rem;
        position: relative;
        .head_t {
            width: 100%;
            height: 1.28rem;
            line-height: 0.88rem;
            background-color: #2782d7;
            font-size: 0.4rem;
            color: #fff;
            text-align: center;      
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
  }
  .btn{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
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


}
  }
  
</style>
