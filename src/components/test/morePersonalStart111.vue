<template>
    <div class="mine">
      <div class="mine1" v-if="false">
        <div class="top1">
          <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
        </div>
        <p class="mine_text1">
          村上春树
        </p>
        <div class="daanList">
          <div class="daanListItem">
            <div class="daanListItemDaAn">{{optionA}}人</div>
            <div class="">A</div>
          </div>
        </div>
      </div>

        <div class="header clearfix">
            <a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
            <span style="margin-right:.45rem;">{{mgs}}</span>
        </div>
        <div class="top">
            <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
            <!--<p class="top_num">20/78人</p>-->
            <hr class="top_hr">
            <img src="../../../static/images/morepersonal.png" alt="" class="top_img_png">
        </div>
        <p class="mine_text">
            {{ title }}
        </p>
        <div class="btn" v-if="myAnswer==-1">
          <div class="bth_zhu bth_bai"  v-for="(item1,idx) in list1" :key="item1.id" @click="dati(item1.id)">{{ item1.timu }}</div>
            <!--<div class="bth_lv bth_zhu" @click="DianOver()">祈使句</div>-->
            <!--<div class="bth_bai bth_zhu" @click="tank()">疑问句</div>-->
        </div>
      <div class="btn" v-if="myAnswer!=-1">
        <div class="bth_zhu bth_bai"  v-for="(item1,idx) in list1" :key="item1.id" :class="answer==item1.id?'bth_lv':myAnswer==item1.id?'bth_Rd' :''">{{ item1.timu }}</div>
      </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
   data () {
      return {
         mgs: '标题',
         title: '',
        page:1,
        list1:[],
        subjectReviewId:'',
        myAnswer:'-1',
        answer:'-1',
        color:'',
        subjectId:''
      }
    },
  methods: {
      back () {
         this.$router.go(-1);
      },
      DianOver () {

      },
      tank () {
        MessageBox.alert('您被淘汰了').then(action => {
            this.$router.push({path:'/twoOver'});
        })
      },
      dati(i){
        var that=this;
        this.myAnswer=i;
        if(that.myAnswer==that.answer){
//            that.$router.push('/DianOver')
              this.$Toast("回答正确")

          }else{
          this.$Toast("回答错误")
          }
          that.$router.push('/twoOver');
//        this.axios({
//          method:"post",
//          url:this.$baseurl + "/api/answer/saveAnswer",
//          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
//          params:{
//            token:localStorage.getItem('token'),
//            id:this.subjectId,
//            options:i
//          }
//        }).then((res)=>{
//          console.log(res.data);
          //做出正确跳转
//          that.page++;
//          if(that.myAnswer==that.answer){
//            that.$router.push('/DianOver')
//          }else{
//            that.$router.push('/twoOver');
//          }

//        }).catch(err => {
//          console.log(err);
//        });
      },
      getTopic(){
        this.axios({
          method:"get",
          url:this.$baseurl + "/api/answer/getSubject",
          headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
          params:{
            token:localStorage.getItem('token'),
            modeId:sessionStorage.getItem("modeId")
          }
        }).then((res)=>{
          console.log(res.data);
          this.title = res.data.data.title;
          this.subjectId = res.data.data.subjectId;

          res=res.data;
          if(res.data.optionA!="" && res.data.optionA!=null){
            var obj={}
            obj.timu=res.data.optionA;
            obj.color=""
            obj.id="1"
            this.list1.push(obj)
          }
          if(res.data.optionB!="" && res.data.optionB!=null){
            var obj={}
            obj.timu=res.data.optionB;
            obj.color=""
            obj.id="2"
            this.list1.push(obj)
          }
          if(res.data.optionC!="" && res.data.optionC!=null){
            var obj={}
            obj.timu=res.data.optionC;
            obj.color=""
            obj.id="3"
            this.list1.push(obj)
          }
          if(res.data.optionD!="" && res.data.optionD!=null){
            var obj={}
            obj.timu=res.data.optionD;
            obj.color=""
            obj.id="4"
            this.list1.push(obj)
          }
          if(res.data.optionE!="" && res.data.optionE!=null){
            var obj={}
            obj.timu=res.data.optionE;
            obj.color=""
            obj.id="5"
            this.list1.push(obj)
          }
          if(res.data.optionF!="" && res.data.optionF!=null){
            var obj={}
            obj.timu=res.data.optionF;
            obj.color=""
            obj.id="6"
            this.list1.push(obj)
          }
          console.log(this.list1)
          if(this.page==1){
            this.subjectReviewId=res.data.subjectReviewId;
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



        }).catch(err => {
          console.log(err);
        });
      }

  },
  created () {
//    modeId
    this.page=1;
    this.getTopic();
  }
}

</script>
<style lang="scss" scoped>
  .mine {
    width: 100%;
    height: 100%;
    background-color: #ffffff;

    .top{
      width: 100%;
      height: 3.86rem;
      background-color: #fff;
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
      margin-left: .72rem;
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
      margin: 0 auto;
      margin-top: 0.2rem;
    }
    .daanList{
      width: 7rem;
      margin: 0 auto;
      .daanListItem{
        float: left;
        width: 1rem;
        text-align: center;
        .daanListItemDaAn{
          height: 2rem;
          width: 1rem;
          border: 1px solid #6d6d72;
        }
      }
    }

  }

</style>
