<template>
  <div class="multiplayer">
    <div class="head_t">
      <span @click="goBack()" class="span11"><img src="../../../static/images/h_return.png" alt=""></span>
      <span style="margin-right: .45rem;">{{msg}}</span>
    </div>
    <div v-for="item in subject" :key="item.id" style="margin-top:0.88rem;">
      <div class="text">
        {{ item.msges }}
      </div>
      <div class="text-form12" >
        <div v-for="item1 in item.items" :key="item1.id"  :class="item.isYourAnser=='-1'?'':item.isYourAnser==item1.id?'green':''">
          {{ item1.text }}
        </div>
      </div>
      <div class="btns">
        <div class="cf_btn " v-if="numbers==1"  @click="goBack()">返回</div>
        <div class="cf_btn " v-if="numbers!=1" @click="goForward()">上一题</div>
        <div class="cf_btn " v-if="isNext" @click="goNext()"  >下一题</div>
        <div class="cf_btn "  v-if="!isNext" @click="oneOver()" style="background-color: #ff8043;">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from "mint-ui";
  export default {
    name: "Multiplayer",
    data() {
      return {
        msg: "",
        page: 1, //当前题码   
        numbers: 1,
        isNext:false,
        next:'',
        show:true,
        show1:true,
        show2:true,
        subject: [

        ]
      };
    },
    mounted() {
      this.numbers=1;
      this.getSubJect()
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      // 下一题
      goNext() {
        var that = this;
        // 初始化之后获取题目和选项接口
        if(this.numbers>0){
          this.numbers++;
          this.getSubJect()
        }
      },
      // 上一题
      goForward() {
        var that = this;
        // 初始化之后获取题目和选项接口
        if(this.numbers>1){
          this.numbers--;
          this.getSubJect()
        }
      },
      seleAnwer(idx1) {
        console.log(this.subject)
        if (this.subject[0].isYourAnser != "-1") {
          return;
        }
        this.subject[0].isYourAnser = idx1;
        // if (this.unclickkable) {
        //     alert("你还没有选择答案")
      },
      oneOver() {
        this.$router.push({
          path: "/oneOver?paperId=" + this.$route.query.paperId
        });
//        MessageBox("提示", "提交成功");
      },
      getSubJect(){
        this.axios({
          method: "get",
          url: this.$baseurl + "/api/answer/getSubject",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params:{
            subjectReviewId: localStorage.getItem('subjectReviewId'),
            numbers:this.numbers
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
            var datas = res.data.data;
            this.isNext=res.data.data.next;
            this.subject = [{
              isYourAnser: datas.options == null ? '-1' : datas.options,
              id: datas.id,
              numbers: datas.numbers,
              anwer: datas.optionRight == null ? 0 : datas.optionRight,
              msges: datas.title,
              items:[
                { id: 1, text: datas.optionA },
                { id: 2, text: datas.optionB },
                { id: 3, text: datas.optionC },
                { id: 4, text: datas.optionD },
              ]
            }];
            var subjectReviewId=res.data.data.subjectReviewId;
            localStorage.setItem('subjectReviewId', subjectReviewId);
            var numbers=res.data.data.numbers;
            localStorage.setItem('numbers', numbers);
          }else{
            this.$Toast({
              message: res.data.msg,
              position: 'bottom'
            });
          }

          })
          .catch(err => {
            console.log(err);
          });
      }
    },

  }

</script>

<style scoped>
  .cf_btn {
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
    line-height: 0.42rem;
    color: #ffffff;
    margin-bottom: 0.43rem;
    text-align: center;
    line-height: 0.89rem;
    float: left;
  }
  .head_t {
    width: 100%;
    line-height: 0.88rem;
    background-color: #2782d7;
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    position: fixed;
    top:0;
    right: 0;
    left: 0;
  }
  .span11 {
    display: block;
    width: 0.4rem;
    height: 0.5rem;
    float: left;
    padding-left: 0.25rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .multiplayer-footer p {
    font-family: SourceHanSansCN-Regular;
    font-size: 0.36rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.88em;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
    padding-top: 0.26rem;
  }
  .text {
    width: 7.03rem;
    height: 0.97rem;
    font-family: MicrosoftYaHei;
    font-size: 0.36rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #282828;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
  .text-form12 {
    margin-bottom: 1.33rem;
  }
  .text-form12 div {
    font-size: 0.36rem;
    width: 4.4rem;
    height: 0.98rem;
    line-height: 0.98rem;
    background-color: #ffffff;
    border: solid 1px #91cb53;
    border-radius: 0.6rem;
    margin-bottom: 0.36rem;
    text-align: center;
    margin-left: 0.27rem;
  }
  .text-form12 .green {
    background-color: #91cb53;
    border: solid 1px #76b039;
  }
  .text-form12 .red {
    border: solid 1px #d35c4a;
    background-color: #ed7a68;
  }
  .multiplayer-button {
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
    line-height: 0.42rem;
    color: #ffffff;
    margin-bottom: 0.43rem;
    text-align: center;
    line-height: 0.89rem;
    float: left;
  }
  /*.multiplayer-button:first-child{*/
  /*color: #e9e9e9;*/
  /*background-color: red;*/
  /*}*/
  /*.multiplayer-button:last-child{*/
  /*background-color: #ff8043;*/
  /*}*/
</style>
