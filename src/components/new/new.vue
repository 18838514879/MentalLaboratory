<template>
    <div class="mine">
        <div class="header">{{mgs}}</div>
        <div style="position: fixed;top:0rem;bottom:1rem;left: 0;right: 0;margin: auto;overflow: scroll;">
          <scroller :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949"  ref="my_scroller">
          <div class="count_new">
            <div class="new_small  clearfix" @click="headline(list.id)" v-for="list in lists" :key="list.id">
              <div class="le_new"><img class="new_datu" :src="list.imgUrl" alt=""></div>
              <div class="ri_new">
                <p class="new_text">{{ list.title }}</p>
                <p class="new_time">{{ list.createTime | formatDate }}</p>
                <div class="bianji"><img class="new_xiaotu" src="../../../static/images/new_bianji.png" alt="">{{ list.clickCount }}</div>
                <div class="zhuanfa"><img class="new_xiaotu" src="../../../static/images/new_zhuanfa.jpg" alt="">{{ list.shareCount }}</div>
              </div>
            </div>
          </div>
          </scroller>
        </div>
        <Footertwo></Footertwo>
    </div>
</template>
<script>
import Footertwo from "../account/footer.vue";
export default {
  data() {
    return {
      allload:0,
      allLength:1,
      page:'1',//当前
      limit:10,
      bottom:0,
      mgs:'新闻室',
      firstIn:true,
      lists: [

      ],
    };
  },
  components: {
    Footertwo
  },
 

  mounted(){
    this.page=1;
    this.jiekou();
  },
  methods: {
      headline (newsId) {
          this.$router.push({path:'/NewsDetails?newsId='+newsId+'&memberId='+newsId})
      },

       jiekou () {
        console.log('created');
        this.axios({
          method:"get",
          url:this.$baseurl + "/api/news/getNewsList",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params:{
            page:this.page,
            limit: this.limit,
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
            if(this.page==1){
              this.lists=[];
              this.bottom=2;
              this.allLength = res.data.page.totalCount;
            }
            if(this.page*this.limit>=this.allLength){
              this.allload=1;
            }else{
              this.allload=0;
            }
            for (let i = 0; i < res.data.page.list.length; i++) {
              this.lists.push(res.data.page.list[i])
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
     })
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
        return y + '-' + MM + '-' + d + ' ' + h + ' : ' + m + ' : ' + s;
      }
    }
};
</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
   .header{
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
        z-index: 1;
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
  .count_new {
    padding-top: 1.02rem;
    // padding-bottom: 1.26rem;
    .new_small {
      width: 100%;
      height: 2.7rem;
      font-size: 0.2rem;
      background-color: #fff;
      padding-top: 0.33rem;
      padding-bottom: 0.33rem;
      padding-left: .24rem;
      padding-right: .24rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      margin-bottom: 0.16rem;
      .le_new {
        float: left;
        width: 40%;
        text-align: center;
        .new_datu {
          width: 2.6rem;
          height: 1.97rem;
        }
      }
      .ri_new {
        width: 60%;
        float: right;
        padding-left: .2rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .new_text {
            font-size: 0.3rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis
        }
        .new_time {
          font-size: 0.23rem;
          color: #2083d1;
          margin-top: 0.23rem;
          margin-bottom: 0.45rem;
        }
        div {
          color: #666666;
          .new_xiaotu {
            width: 0.25rem;
            height: 0.25rem;
            margin-right: 0.15rem;
          }
        }
        .bianji {
          float: left;
        }
        .zhuanfa {
          float: right;
          // margin-right: 0.23rem;
        }
      }
    }
    .meitu {
      width: 100%;
      height: 2.7rem;
      font-size: 0.2rem;
      background-color: #fff;
      padding-top: 0.33rem;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      padding-bottom: 0.33rem;
      box-sizing: border-box;
      margin-bottom: 0.16rem;
      .ri_new {
        width: 100%;
        .new_text {
          font-size: 0.26rem;
        }
        .new_time {
          font-size: 0.23rem;
          color: #2083d1;
          margin-top: 0.23rem;
          margin-bottom: 0.45rem;
        }
        div {
          color: #666666;
          .new_xiaotu {
            width: 0.25rem;
            height: 0.25rem;
            margin-right: 0.15rem;
          }
        }
        .bianji {
          float: left;
        }
        .zhuanfa {
          float: right;
        }
      }
    }
  }
}
</style>
