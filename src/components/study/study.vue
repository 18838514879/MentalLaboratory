<template>
    <div class="mine">
       <div class="header">{{mgs}}</div>
        <v-touch v-on:swipedown="onSwipeDown()" v-on:swipeup="onSwipeUp()" style="padding-top: 0.88rem">
        <div class="count_new">
            <div class="top_search" v-if="show2">
              <input type="text" placeholder="请输入搜索内容" v-model.trim="title">
              <img class="search_img" src="../../../static/images/search_img.png" alt="">
            </div>

            <ly-tab
                v-model="selectedId"
                :items="items"
                :options="options"
                @change="tabs"
                >
                 {{items.title}}
            </ly-tab>

             <!-- <ul class="study_study clearfix">
                  <li  class="study_color" v-for="list in lists" :key="list.id" :class="list.id==id?'Istrue':'Isfalse'" @click="tabs(list.id)" >
                    {{list.title}}
                  </li>
            </ul>  -->
            <div :class="tops?'atop':'btop'" style="position: fixed;bottom:1rem;left: 0;right: 0;margin: auto;overflow: scroll;">
                <scroller :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949"  ref="my_scroller">
                  <div class="new_small  clearfix" v-for="(ranking,index) in rankings" :key="index"  @click="studyDatils(ranking.points,ranking.id)">
                    <div class="le_new"><img class="new_datu" :src="ranking.imgUrl" alt=""></div>
                    <div class="ri_new">
                      <p class="new_text">{{ranking.title}}</p>
                      <div class="new_div div_spall clearfix">
                        <p class="new_write">作者：{{ranking.author}}</p>
                        <p class="new_time">发布时间： {{ranking.createTime | formatDate}}</p>
                      </div>
                      <div class="rice_new  clearfix" v-for="(label,lindex) in ranking.labelList" :key="lindex"> {{label.labelName}} </div>
                      <div class="new_btn clearfix">
                        <div :class="ranking.points!=null?'btn_left':'btn_left isHide'">{{ranking.points}}</div>
                        <div class="btn_right">
                          <div class="bianji"><img class="new_xiaotu" src="../../../static/images/new_zhuanfa.jpg" alt="">{{ranking.shareCount}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </scroller>
              </div>
        </div>
        </v-touch>

        <Footerremind></Footerremind>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";

import Footerremind from "../account/footer.vue";


export default {
  data() {
    return {
      mgs: "研究室",
      show2: false,
      show1: false,
      // show:false,
      allload: 0,
      allLength: 1,
      page: "1", //当前
      limit: 5,
      bottom: 0,
      id:'',
      title:'',
      search:[],
      items:[],
      rankings: [],
      tops: true,
      selectedId:0,
       options: {
        activeColor: 'red',
        labelKey:'title',

        // 可在这里指定labelKey为你数据里文字对应的字段
      },
    };
  },
  components: {
    Footerremind
  },
   watch: {
  },
  mounted() {
    this.categories();
  },

  methods: {
    tabs(item,index) {
      console.log(item.id);
      this.$refs.my_scroller.finishInfinite(false);//重置scroll组件
      this.id=item.id;
      this.page=1;
      this.allload = 0;
      this.jiekou();
    },

    categories () {
          this.axios({
        method: "get",
        url: this.$baseurl + "/api/data/getDataTypes",
        params: {
                 }
      })
        .then(res => {
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
            console.log("=======");
            console.log(res);
            var aa = {
              title: '全部',
              id:''
            }
            var bb = res.data.data;
            bb.unshift(aa);
            this.items=bb;
            this.jiekou();
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
         },

    jiekou() {
      console.log("created");
      this.axios({
        method: "get",
        url: this.$baseurl + "/api/data/getDataList",
        params: {
          page: this.page,
          limit: this.limit,
          types:this.id,
          titles: this.title,
        }
      })
        .then(res => {
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
            if (this.page == 1) {
              this.rankings = [];
              this.bottom = 2;
              this.allLength = res.data.page.totalCount;
            }
            if (this.page * this.limit >= this.allLength) {
              this.allload = 1;
            } else {
              this.allload = 0;
            }
            for (let i = 0; i < res.data.page.list.length; i++) {
              this.rankings.push(res.data.page.list[i]);
            }
            // console.log(this.bottom + "===============");
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

    onSwipeDown: function() {
     this.tops=false;
     this.show2 = true;
    },

    onSwipeUp: function() {
     this.tops=true;
     this.show2 = false;
    },

    studyDatils(points,dataId) {
      if (points != null) {
        const tknr =
          '<div style="text-alige:center;height:1rem;line-height:1rem;">确定兑换该资料吗？</div>';
        MessageBox.confirm("", {
          message: tknr,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              console.log(1);
              this.$router.push({ path: "/studyDatil?statu=1"+"&dataId="+dataId});
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
              console.log(2);
            }
          });
      } else {
        this.$router.push({ path: "/studyDatil?statu=0" });
      }
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    }
  }
};
</script>
<style lang="scss" scoped>
.atop{
  top: 2rem;
}
.btop{
  top: 2.7rem;
}
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.36rem;
    background-color: #2083d1;
    color: #fff;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    a {
      display: block;
      width: 0.4rem;
      height: 0.5rem;
      float: left;
      padding-left: 0.25rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  }
  .count_new {
    .top_search {
      width: 100%;
      height: 0.89rem;
      background-color: #fff;
      position: relative;

      input {
        width: 7rem;
        height: 0.54rem;
        background-color: #f1f1f1;
        border-radius: 20px;
        position: absolute;
        top: 0.16rem;
        left: 0.24rem;
        outline: none;
        padding-left: 0.3rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }

      .search_img {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 0.3rem;
        right: 0.5rem;
      }
    }
    .study_study {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      margin-top: .2rem;
      margin-bottom: .2rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      height: 0.6rem;
      overflow: hidden;
      .study_color {
        border-radius: 27px;
        border: solid 1px #2083d1;
        float: left;
        min-width: 1.55rem;
        height: 0.53rem;
        padding-left: .2rem;
        padding-right: .2rem;
        box-sizing: border-box;
      -webkit-box-sizing: border-box;
        line-height: 0.53rem;
        font-size: 0.25rem;
        text-align: center;
        color: #666666;
        background-size: contain;
        margin-right: 2px;
        margin-bottom: .2rem;
      }
      .Istrue{
        color:#fff;
        background-color: #2083d1;

      }
      .Isfalse{
        background-color: none;
      }
      .last {
        margin-right: 0;
      }
    }
    .new_small {
      width: 100%;
      height: 2.7rem;
      font-size: 0.2rem;
      background-color: #fff;
      padding-top: 0.33rem;
      padding-bottom: 0.33rem;
      padding-right: 0.25rem;
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
        .new_text {
          font-size: 0.3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .new_div {
          padding-top: 0.15rem;
          padding-bottom: 0.2rem;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          font-size: 0.2rem;
          color: #2083d1;
          .new_write {
            float: left;
          }
          .new_time {
            float: right;
          }
        }
         .rice_new {
          color: #e6456e;
          margin-bottom: 0.1rem;
          margin-right: 0.2rem;
          font-size: 0.23rem;
          float: left;
        }

        .new_btn {
          color: #666666;
          margin-top: 0.45rem;
          .zhuanfa {
            float: right;
            margin-right: 0.4rem;
            .new_xiaotu {
              width: 0.25rem;
              height: 0.25rem;
              margin-right: 0.15rem;
            }
          }
          .bianji {
            float: right;
            .new_xiaotu {
              width: 0.25rem;
              height: 0.25rem;
              margin-right: 0.15rem;
            }
          }
        }
        .btn_left {
          float: left;
          width: 1.34rem;
          height: 0.47rem;
          line-height: 0.47rem;
          background-color: #2083d1;
          border-radius: 2px;
          text-align: center;
          color: #fff;
          display: block;
        }
        .isHide {
          display: none;
        }
        .btn_right {
          float: right;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
