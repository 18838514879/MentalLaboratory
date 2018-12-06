<template>
    <div class="mine">
        <div class="header clearfix">
            <a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
            <span style="margin-right:.45rem;">{{mgs}}</span>
        </div>
        <div class="top">
            <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
        </div>
        <p class="mine_text">
            村上春树
        </p>
        <div class="btn">
            <div>
                <p>{{optionA}}人</p>
                <div class="bth_lv bth_zhu">A</div>
            </div>
            <div>
                <p>{{optionB}}人</p>
                <div class="bth_bai bth_zhu">B</div>
            </div>
            <div>
                <p>{{optionC}}人</p>
                <div class="bth_lv bth_zhu">C</div>
            </div>
            <div>
                <p>{{optionD}}人</p>
                <div class="bth_bai bth_zhu">D</div>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
    data () {
        return {
            mgs: '答案人数详情',
            optionA:'',
            optionB:'',
            optionC:'',
        }
    },
    components:{

    },
     created () {
    // 获取答案答题人数接口
      this.axios({
        method: "get",
        url: this.$baseurl + "/api/answer/getOptionCount",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: {
            id: localStorage.getItem("id"),
        }
      })
        .then(res => {
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
            this.optionA = res.data.data.optionA
            this.optionB = res.data.data.optionB
            this.optionC = res.data.data.optionC
            this.optionD = res.data.data.optionD
            this.optionE = res.data.data.optionE
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
        // 延迟跳转
        const TIME_COUNTS = 5;
        if(!this.timers){
            this.counts = TIME_COUNTS;
            this.shows = false;
            this.timers = setInterval(()=>{
                if(this.counts > 0 && this.counts <= TIME_COUNTS){
                    this.counts--;
                    }else{
                    this.shows = true;
                    clearInterval(this.timers);
                    this.timers = null;
                    // 返回答题页面
                    this.$router.push({path:'/morePersonalStart?modeId=' + this.$route.query.modeId});
                    }
            },1000)
        }



     },
    methods: {
        back () {
            this.$router.go(-1);
        },
    },
}

</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .top{
      width: 100%;
      background-color: #fff;
      padding-left: 0.24rem;
      margin-top:.19rem;
  }
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
    padding-right: .45rem;
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
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:space-around;
    align-items: flex-end;
    // justify-content: flex-start;

}
.btn p{
	font-size: .36rem;
	color: #282828;
    text-align: center;
}
.bth_zhu{
    width: 1.68rem;
	height: 2.71rem;
	border-radius: 6px;
    display: inline-block;
    font-size: .36rem;
    text-align: center;
    line-height: 3.8rem;
    font-weight: 500;
    color: #ffffff;
}
.bth_lv{
    line-height: 2.4rem;
    height: 1.98rem;
    background-color: #2083d1;
    // margin-left: 1.35rem;
}
.bth_bai{
    background-color: #ff8043;
    // margin-left: .72rem;
}
</style>
