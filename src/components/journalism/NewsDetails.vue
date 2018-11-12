<template>
    <div class="discuss">
        <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
        <div class="kongbai"></div>
        <h1 class="discuss_h1_h1">{{ titles }}</h1>
        <p class="discuss_time"><span>发布时间：</span><span>{{ createTimes }}</span></p>
        <hr class="discuss_hr">
        <p class="discuss_text" v-html="contents">
           {{ contents }}
        </p>
        <div class="details_footer clearfix">
            <!-- <textarea class="details_tex" @click="postCommen()"></textarea> -->
            <label @click="postCommen()" for="neirong" class="details_tex" style="display:block;"></label>
            <div class="details_img clearfix">
            <img  @click="discuss()" class="img_1" src="../../../static/images/studyDatil_1.png" alt="">
            <img @click="fenxiang()" class="img_2" src="../../../static/images/studyDatil_2.png" alt="">
            <img class="img_3" src="../../../static/images/studyDatil_3.png" alt="">
            </div>
        </div>
        <div class="div_div">
            <!-- <label for="neirong">sasaasd</label> -->
            <!-- <textarea class="discuss_tex" placeholder="请输入内容" v-if="show" v-model="content1" id="neirong"></textarea> -->
            <input type="text" class="discuss_tex" placeholder="请输入内容"  v-model="content1" id="neirong">
            <div class="discuss_fasong" v-if="show" @click="discuss()">发送</div>

        </div>

        <div class="detai_footer" v-if="shows">
          <ul class="detai_clearfix clearfix">
            <li @click="fenxiang()">微信</li>
            <li @click="fenxiang()">朋友圈</li>
            <!-- <li @click="fenxiang()">QQ</li> -->
          </ul>
        </div>
        <div class="zhezhao" v-if="show"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mgs: '新闻标题',
            titles: '评论',
            createTimes: '',
            contents: '',
            show: false,
            shows:false,
            content1:'',
        }
    },
     created () {
            // 获取新闻详情接口
            console.log('created');
            this.axios.get(this.$baseurl + '/api/news/getNewsInfo',
            {
                params: {
                    token: localStorage.getItem("token"),
                    newsId:this.$route.query.newsId
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
                console.log(res);
                this.contents = res.data.data.content;
                this.titles = res.data.data.title;
                this.createTimes = res.data.data.createTime;
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }


            }).catch( err => {
                console.log(err);
            })
        },
    methods: {
        back () {
            this.$router.go(-1);
        },
        postCommen () {
            // 跳转
            this.show = !this.show;
            document.getElementsByClassName('div_div')[0].style.cssText="opacity: 1;"
        },
        fenxiang () {
            this.shows = !this.shows;
        },
        fasong () {
          this.show = !this.show;
        },
        discuss () {
            // 新闻评论接口
           console.log('created');
            this.axios({
            method:"post",
            url:this.$baseurl + "/api/news/saveComment",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
              params:{
                    newsId: this.$route.query.newsId,
                    memberId:this.$route.query.newsId,
                    commentId:"0",
                    content:this.content1,
              }
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
               
                this.$router.push({path:'/comments?newsId='+this.$route.query.newsId+'&memberId='+this.$route.query.newsId});
               
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }


            }).catch( err => {
              console.log(err);
         });

        }
        },

    }
</script>

<style scoped lang="scss">
    .div_div{
        opacity: 0;
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
    .discuss_tex{
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
    .discuss_h1_h1{
        font-size: .4rem;
        text-align: center;
    }
    .discuss{
        background-color: #ffffff;
        display: auto;

    }
    .kongbai{
        width: 100%;
        height: .29rem;
        background-color: #e9e9e9;
        padding-top: .8rem;
    }
    .header{
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.4rem;
        background-color: #2083d1;
        color:#fff;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
         .r_back{
            width: 0.5rem;
            height: 0.88rem;
            float: left;
            padding-left: 0.25rem;
            padding-top: 0.25rem;
            box-sizing:border-box;
            -webkit-box-sizing: border-box;
            img{
                display: block;
                width: .18rem;
                height: .25rem;
            }

        }
    }
    .discuss_time{
        font-family: SourceHanSansCN-Light;
        font-size: .24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #2083d1;
        margin-left:.24rem;
        margin-top: .33rem;
        background-color: #ffffff;
    }
    .discuss_hr{
        width: 7.03rem;
        height: .01rem;
        background-color: #dadada;
        margin: 0 auto;
        margin-top: .29rem;
        margin-bottom: .41rem;
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
        background-color: #ffffff;
        text-indent: .5rem;
        margin-bottom: .41rem;
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
</style>
