<template>
    <div id="comments">
       <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
        <div class="comments_huise"></div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
        <div class="comments_list">
            <ul>
                <li class="comments_list_li" v-for="item in items" :key="item.id">
                    <!-- <li class="comments_list_li" v-for="item in listMe(list)" :key="item.id"> -->

                    <div class="list_buttom clearfix">
                        <img :src="item.memberUrl" alt="">
                        <div class="list_top_name">
                            <p class="list_top_name_age" v-if="item.memberName">{{ item.memberName }}</p>
                            <p class="list_top_name_age" v-else>匿名用户</p>
                            <p class="list_top_name_time">{{ item.createTime | formatDate}}</p>
                        </div>
                        <div class="list_top_hui" @click="reply(item.memberId,item.id,item.content)">{{hh}}条回复</div>
                        <div class="list_tupian"><img class="tupian_img" src="../../../static/images/messagess.png" alt=""></div>                      
                    </div>
                    <div class="comments_text">{{ item.content }}</div>
                    <div class="comments_text_hui clearfix" style="font-size:.34rem">
                        <div  class="list_top_hui" style="font-size:0.25rem;color:#000;" @click="huifu(item.id,item.newsId,item.memberId)">回复</div>
                        <div class="list_tupian" style="margin-top:0.36rem;"><img class="tupian_img" src="../../../static/images/messagess.png" alt=""></div>
                        <!-- <p>
                            <span class="comments_text_hui_one">回复</span>
                            <span class="comments_text_hui_two">？？？</span>
                            <span class="comments_text_hui_trr">？？？</span>
                        </p>
                        <div class="comments_text_hui_text">
                            {{huifude}}
                        </div> -->
                    </div>
                </li>
            </ul>
        </div>
    </scroller>
    </div>
</template>
<script>
 export default {
    data () {
      return {
        mgs:'评论',
        img: '',
        items: [
            // {id:1,nickName:'2018',createTime:'2018-02-17',content:'ppp'}
        ],
        allload:0,
        allLength:1,
        page:'1',//当前
        bottom:0,
        pageSize:10,
      }
    },
    mounted(){
          this.page=1;
          this.jiekou();
    },
    methods: {
        huifu (obj,newsId,memberId) {
            sessionStorage.setItem('cld_id',obj)
            this.$router.push({ path: "/Discuss?newsId="+this.$route.query.newsId+"&memberId="+memberId});
        },
        back () {
            this.$router.go(-1);
        },
        reply (memberId,commentId,content) {
            this.$router.push({path:'/reply?newsId='+this.$route.query.newsId+'&memberId='+memberId+'&commentId='+commentId});
        },

   

    jiekou () {
        // 获取此新闻评论接口
        this.axios.get(this.$baseurl + '/api/news/getCommentList', {
            headers: {token: localStorage.getItem("token"),"Content-Type": "application/x-www-form-urlencoded"},
            params: {
                token: localStorage.getItem("token"),
                newsId: this.$route.query.newsId,
                page:this.page,
                pageSize: this.pageSize,
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
            console.log(res);
            // this.items = res.data.page;
            if(this.page==1){
              this.items=[];
              this.bottom=2;
              this.allLength = res.data.page.totalCount;
            }
            if(this.page*this.pageSize>=this.allLength){
              this.allload=1;
            }else{
              this.allload=0;
            }
            for (let i = 0; i < res.data.page.list.length; i++) {
              this.items.push(res.data.page.list[i]);
            }
             console.log(this.bottom+"===============")
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

     refresh(done) {
      var that = this;
      setTimeout(() => {
        done();
      }, 1500);
    },
    infinite(done) {
      var that = this;
      if (this.allload) {
        setTimeout(() => {
          done(true);
        }, 1500);
      }else{
        setTimeout(() => {
        that.page++;
        that.jiekou();
        setTimeout(() => {
          done();
        });
      }, 1500);
      }

    },
    },

    // 时间格式转译
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + '-' + m + '-' + s;
      }
    }
 }
</script>
<style lang="scss" scoped>
    .comments_list_li
    #comments{
        background-color: #fff;
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
        z-index: 1;
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
    .comments_huise{
        height: 100%;
        height: .29rem;
        background-color: #e9e9e9;
    }
    .comments_list_li{
        border-bottom:1px solid #dadada;
        padding-bottom: .42rem;
        margin-top: .8rem;
    }
    .comments_list{
        background-color:#ffffff;
        // width:7.02rem;
        // height: 3.7rem;
        margin: 0 auto;
        padding-left: 0.24rem;
        padding-right: 0.24rem;
        box-sizing:border-box;
      -webkit-box-sizing: border-box;
    }
    .list_top{
        width: 100%;
        height: .75rem;
    }
    .list_top img{
        width: .75rem;
        height: .75rem;
    }
    .list_top_name{
        font-size: .36rem;
        color: #2083d1;
    }
    .list_top_hui{
        color: #9e9e9e;
        font-size: .24rem;
        text-align: right;
        float: right;
        margin-top: .4rem;
    }
    .list_tupian{
        display: block;
        width: .3rem;
        height: .3rem;
        float: right;
        margin-right: .1rem;
        margin-top: .25rem;
    }
    .list_tupian .tupian_img{
             width: 100%;
             height: 100%;
         }
    .list_buttom{
        font-size: .34rem;
        color: #333333;
    }
    .list_buttom img{
        width: .75rem;
        height: .75rem;
        margin-top: .2rem;
    }
    .list_top_name{
        display: inline-block;
    }
    .list_top_name_time{
        font-size: .24rem;
	    color: #c2c2c2;
    }
    .comments_text{
        width: 5.97rem;
        font-size: .34rem;
        line-height: .47rem;
        color: #333333;
        padding: .24rem;
        box-sizing:border-box;
      -webkit-box-sizing: border-box;
        word-wrap: break-word;
        word-break: normal;
        
    }
    .comments_text_hui_one{
        color: #7d7d7d;
        font-size: .34rem;
    }
    .comments_text_hui_two{
        color: #323232;;
        font-size: .34rem;
        margin-left: .2rem;
    }
    .comments_text_hui_trr{
        color: #c2c2c2;
        font-size: .24rem;
        margin-left: 1.28rem;
    }
    .comments_text_hui{
         margin-left: .8rem;
         margin-top: .8rem;
         width: 6.05rem;
    }
    .comments_text_hui_text{
        margin-top: .21rem;
        font-size: .34rem;
        color:#7d7d7d;
    }
</style>
