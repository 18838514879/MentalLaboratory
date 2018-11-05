<template>
    <div class="mine" :style="{backgroundImage: 'url(' + backGroundImg + ')', backgroundSize:'100% 100%','background-repeat':'no-repeat'}">
        <div class="header clearfix">
            <a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
            <span style="margin-right:.45rem;">{{mgs}}</span>
        </div>
        <div class="top">
            <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
            <!--<p class="top_num" >20/78人</p>-->
            <!--<hr class="top_hr">-->
            <img src="../../../static/images/morepersonal.png" alt="" class="top_img_png">
        </div>
        <p class="mine_text">
            {{ title }}
        </p>
        <div class="btn" v-if="myAnswer==-1">
          <div class="bth_zhu bth_bai"  v-for="(item1) in list1" :key="item1.id" @click="dati(item1.id)">{{ item1.timu }}</div>
            <!--<div class="bth_lv bth_zhu" @click="DianOver()">祈使句</div>-->
            <!--<div class="bth_bai bth_zhu" @click="tank()">疑问句</div>-->
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

      <!--获取答题的统计窗口-->
      <div class="mine1" v-show="staticShow">
        <div class="top1">
          <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
        </div>
        <p class="mine_text1">{{ title }}</p>
        <div class="daanList">
          <div class="daanListItem" v-for="(item,idx) in staticList" :key="idx" >
            <div>{{item.value}}人</div>
            <div class="daanListItemDaAn">
              <div  class="DaAnheight" :style="'height:'+item.proportion*2+'rem'" ></div>
              <!--<div class="DaAnheight" :data-height="item.proportion"></div>-->
            </div>
            <div class="">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
   data () {
      return {
        backGroundImg:"",
        mgs: '标题',
        title: '',
        page:1,
        list1:[],
        subjectReviewId:'',
        myAnswer:'-1',
        answer:'-1',
        color:'',
        subjectId:'',
        staticShow:false,
        tileId:0,
        staticList:[],
        isNext:false
      }
    },
  methods: {
      back () {
//         this.$router.go(-1);
        this.$router.push("/test")
      },
       getTimu() {

      },
      tank () {
        MessageBox.alert('您被淘汰了').then(action => {
            this.$router.push({path:'/twoOver'});
        })
      },
      next(){
        this.page++;
        this.getTopic();
      },
      pre(){
        this.page--;
        this.getTopic();
      },
      tijiao(){
         this.$router.push({path:'/twoOver'});
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
         // 做出正确跳转
//          that.page++;
          if(that.myAnswer==that.answer){
            this.$Toast("回答正确")
            this.getStatic()
          }else{
            this.$Toast("回答错误")
//            setTimeout(f)
            that.$router.push('/twoOver');
          }

        }).catch(err => {
          console.log(err);
        });
      },
      getTopic1(){
        this.axios({
          method:"get",
          url:this.$baseurl + "/api/answer/getSubject",
          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
          params:{
            token:localStorage.getItem('token'),
            modeId:sessionStorage.getItem("modeId")
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
            this.title = res.data.data.title;
            this.subjectId = res.data.data.subjectId;
//          this.subjectReviewId = res.data.data.subjectReviewId;

            this.tileId=res.data.data.id;
            this.isNext=res.data.data.next;
            if(sessionStorage.getItem("modeId")==3){
              this.backGroundImg=res.data.data.remark;
            }else{
              this.backGroundImg="";
            }

//          this.backGroundImg="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541087880509&di=576da270588fce786ca9eee85bd9a40e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fc9fcc3cec3fdfc036aea1c9bde3f8794a4c22607.jpg"
            res=res.data;
            this.stringToArray1(this.list1,res.data.optionA,"1")
            this.stringToArray1(this.list1,res.data.optionB,"2")
            this.stringToArray1(this.list1,res.data.optionC,"3")
            this.stringToArray1(this.list1,res.data.optionD,"4")
            this.stringToArray1(this.list1,res.data.optionE,"5")

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
            numbers:this.page
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
            this.title = res.data.data.title;
            this.tileId=res.data.data.id;
            this.isNext=res.data.data.next;
            if(sessionStorage.getItem("modeId")==3){
              this.backGroundImg=res.data.data.remark;
            }else{
              this.backGroundImg="";
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

//          var allPeople=Number(res.data.data.optionA)+Number(res.data.data.optionB)+Number(res.data.data.optionC)+Number(res.data.data.optionD)+Number(res.data.data.optionE);

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
    }
  },
  created () {
    this.page=1;
    this.getTopic1();
  }
}

</script>
<style lang="scss" scoped>
  .mine {
    width: 100%;
    height: 100%;
    /*background-color: #ffffff;*/

    .top{
      width: 100%;
      height: 3.86rem;
      /*background-color: #fff;*/
      padding-left: 0.24rem;
      margin-top:.19rem;
    }
    .header{
      height: 0.88rem;
      line-height: 0.88rem;
      font-size:0.36rem;
      background-color: #2083d1;
      color:#fff;
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
    .top_img_jpg{
      height: 1.11rem;
      margin: 0 auto;
      display: inherit;
    }
    .top_num{
      font-size: .36rem;
      line-height: .21rem;
      color: #2083d1;
    }
    .top_hr{
      width: 7.02rem;
      height: 1px;
      background-color: #d7d7d7;
      margin-top: .23rem;
    }
    .top_img_png{
      width: 7.02rem;
      height: 1.81rem;
    }
    .mine_text{
      width: 7.03rem;
      font-size: .36rem;
      line-height: .49rem;
      color: #282828;
      padding-left: 0.24rem;
      margin-top: .22rem;
    }
    .btn{
      margin-top: .86rem;
    }
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
    .bth_bai{
      overflow: hidden;
      border: solid 1px #91cb53;
      color:#333333;
      margin-left: 1.35rem;
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
  }
  .mine1{
    padding-top: 0.2rem;
    width: 100%;
    height: 100%;
    font-size: 16px;
    position: fixed;
    top:0.88rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255,255,255,1);
    .mine_text1{
     text-align: center;
      width: 7rem;
      margin: 0.2rem auto;
      /*margin: 0.2rem 0;*/
    }
    .daanList{
      width: 7rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .daanListItem{
        float: left;
        width: 1rem;
        text-align: center;
        .daanListItemDaAn{
          height: 2rem;
          width: 1rem;
          border: 1px solid #6d6d72;
          position: relative;
          .DaAnheight{
            position: absolute;
            bottom: 0;
            left: 0;
            /*height: 50%;*/
            right: 0;
            width: 100%;
            background-color: green;
          }
        }
      }
    }

  }

</style>
