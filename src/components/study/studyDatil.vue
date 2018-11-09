<template>
    <div class="discuss">
        <div class="header clearfix">
            <a href="#" @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
            {{mgs}}
        </div>
       <div class="mid_styleList">
            <div class="kongbai"></div>
            <div class="content">
                <p class="top_title">{{title}}</p>
                <span class="discuss_hr"></span>
                <div class="clearfix">
                <p class="discuss_write">作者：{{author}}</p>
                <p class="discuss_time">发布时间：{{createTime}}</p>
                </div>
                <div class="discuss_text" v-html="content"> {{content}}</div>
            </div>
        <!-- <div v-if="statu==1"> -->
            <div>
                <div v-if="show2" class="addContent"  @click="addContent()">附加内容链接</div>
                <div class="addContent1" v-html="contentPluss">{{data}}</div>
            </div>
       </div>

        <div class="details_footer clearfix">
            <!-- <textarea class="details_tex" @click="textarea()"></textarea> -->
            <div class="details_img clearfix">
            <img @click="discuss()" class="img_1" src="../../../static/images/studyDatil_1.png" alt="">
            <img @click="fenxiang()" class="img_2" src="../../../static/images/studyDatil_2.png" alt="">
            <img class="img_3" src="../../../static/images/studyDatil_3.png" alt="">
            </div>
        </div>
        <!-- <textarea class="discuss_tex_tex" placeholder="请输入内容" v-if="show"></textarea> -->
        <!-- <div class="discuss_fasong" v-if="show" @click="fasong()">发送</div> -->
        <div class="detai_footer" v-if="shows">
          <ul class="detai_clearfix">
            <li @click="fenxiang()">微信</li>
            <li @click="fenxiang()">朋友圈</li>
            <li @click="fenxiang()">QQ</li>
          </ul>
        </div>
        <div class="zhezhao" v-if="show"></div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
        mgs: '研究室',
        show:false,
        shows:false,
        title:'',
        author:'',
        createTime:'',
        content:'',
        contentPluss:'',
        // statu:'0',
        data:'',
        show2:false,
    }
  },
  components: {},
  mounted (){
     this.listDatil();
  },
  
  methods: {
   //免费详情页面
       listDatil () {
            // this.statu=this.$route.query.statu
            console.log('created');
            this.axios({
                method:"get",
                url:this.$baseurl +"/api/data/getDataInfo",
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                params:{dataId:this.$route.query.dataId},
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
                    console.log(res);
                    if(res.data.info.contentPlus != ""){
                        this.contentPluss= res.data.info.contentPlus;
                        this.title=res.data.info.title;
                        this.author=res.data.info.author;
                        this.createTime=res.data.info.createTime;
                        this.content=res.data.info.content;
                        if(res.data.info.points > "0"){
                        this.show2=true;
                        }
                    }
                   
                }else{
                    this.$Toast({
                    message: res.data.msg,
                    position: 'bottom'
                    });
                }
                }).catch( err => {
                  console.log(err);
             });
    },
      //购买附加内容
      addContent(){
           console.log('created');
            this.axios({
            method:"get",
            url:this.$baseurl +"/api/data/payContent",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                dataId:this.$route.query.dataId,
                },
            }) .then( res => {
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
                
                const tknr ='<div style="text-alige:center;height:1rem;line-height:1rem;">确定兑换该资料吗？</div>';
                 MessageBox.confirm("", {
                    message: tknr,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(action => {
                    if (action == "confirm") {
                        //确认的回调
                        console.log(1);
                        this.contentPluss=res.data.data;

                        if(res.data.data == null){
                            this.contentPluss="";
                        }
                    }
                }).catch(err => {
                    if (err == "cancel") {
                    //取消的回调
                    console.log(2);
                    }
          });
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }
            }).catch( err => {
              console.log(err);
         });
      },
      back () {
          history.back();
      },
    //   textarea () {
    //       this.show = !this.show;
    //   },
    //   fasong () {
    //       this.show = !this.show;
    //   },
      fenxiang () {
          this.shows = !this.shows;
      },
      
  }
}
</script>

<style scoped lang="scss">

    .addContent{
        color:#169bd5;
        font-size: .24rem;
        text-align: center;
        padding-bottom: .24rem;
        box-sizing:border-box;
        -webkit-box-sizing: border-box;
        }
    .addContent1{
            width: 7.02rem;
            font-family: SourceHanSansCN-Regular;
            font-size: .24rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: .44rem;
            letter-spacing: 0px;
            color: #666666;
            margin: 0 auto;
            text-indent: 2em;
            margin-bottom: .65rem;  
    }
   
    // 遮罩
    .zhezhao{
        height: 100%;
        width: 100%;
        background-color: #999999;
        z-index: 101;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    // 分享
    .detai_footer {
        width: 100%;
        height: 0.98rem;
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        line-height: .89rem;
    }
    .detai_clearfix li{
        width: 33.33%;
        height: 100%;
        font-size: 0.28rem;
        color: #a4a4a4;
        text-align: center;
        float: left;
        margin-top: 0.1rem;
    }
    .detai_clearfix li:hover{
            color:#2782d7;
        }
    // 评论
    .discuss_fasong{
        height: .6rem;
        font-size:.28rem;
        width: 1rem;
        background-color: #2083d1;
        color:#fff;
        border-radius: 45px;
        text-align: center;
        line-height: .6rem;
        position: fixed;
        top: 40%;
        left: 83%;
        z-index: 102;
    }
    // 评论表单
    .discuss_tex_tex{
        width: 7.00rem;
        height: 2.95rem;
        margin-left: .2rem;
        background-color: #ffffff;
        box-shadow: 0px 3px 2px 0px
            rgba(0, 0, 0, 0.05);
        border-radius: 3px;
        border: solid 2px #efefef;
        position: fixed;
        top: 15%;
        z-index: 102;
    }
    .discuss{
        width:100%;
        height:100%;
        background-color: #fff;
          .header{
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.4rem;
        background-color: #2083d1;
        font-size:.36rem;
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
    .mid_styleList{
        margin-bottom: 1.88rem;
        background-color: #fff;
        .kongbai{
        width:100%;
        height:.35rem;
        background-color:#e9e9e9;
        padding-top: 0.88rem;
        }
      .content{
        width: 100%;
        padding-top:.32rem;
        padding-left:.23rem;
        padding-right:.23rem;
        box-sizing:border-box;
    -webkit-box-sizing: border-box;
        .top_title{
        font-family: SourceHanSansCN-Light;
        font-size: .29rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .86rem;
        text-align:center;
        color:#2083d1;
        border-bottom:1px solid #dadada;
    }
       .discuss_hr{
        display:block;
        height: 1px;
        width:100%;
        background-color: #dadada;
    }

    .discuss_write{
        font-family: SourceHanSansCN-Light;
        font-size: .24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #2083d1;
        float:left;
         margin-top:.3rem;
        margin-bottom:.55rem;

    }
    .discuss_time{
        font-family: SourceHanSansCN-Light;
        font-size: .24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #2083d1;
        float:right;
        margin-top:.3rem;
        margin-bottom:.55rem;
    }
    .discuss_text{
        width: 7.02rem;
        font-family: SourceHanSansCN-Regular;
        font-size: .24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .44rem;
        letter-spacing: 0px;
        color: #666666;
        margin: 0 auto;
        text-indent: 2em;
        margin-bottom:.65rem;
    }
    }
    }
    
     .details_footer{
        width: 100%;
        height: .98rem;
        background-color: #e9e9e9;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    .details_tex{
        width: 4.23rem;
        height: .64rem;
        background-color: #ffffff;
        border-radius: .32rem;
        margin-top: .19rem;
        margin-left: .23rem;
        float:left;
    }
    .details_img{
        float:right;
        margin-top: .33rem;
        margin-right: .22rem;
        img{
            display:block;
            width: .35rem;
            height: .35rem;
            float: left;
        }
        .img_1{
            margin-left: .48rem;
            }
        .img_2{
            margin-left: .6rem;
            }
        .img_3{
            margin-left: .6rem;
            }

        }
        }
    }






</style>
