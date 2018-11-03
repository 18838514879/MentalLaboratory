<template>
    <div class="mine">
  <div class="header clearfix"><a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
        <ul class="coupon">
            <li class="clearfix" v-for="ranking in rankings" :key="ranking.id">
                <div class="coupon_img">
                    <img :src="src" alt="">
                </div>
                <div class="text_coupon">
                        <span class="top">{{ranking.amount}}元优惠券</span><br>
                        <span class="btn">满{{ranking.points}}积分使用</span>
                </div>
                <div class="Immediately">
                        <button class="Immediately_text" @click="appli(ranking.id)">立即领取</button>
                </div>
            </li>
            <!-- <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li>
            <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li>
            <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li> -->
        </ul>
        <div class="action">
            <p class="title">积分兑换注意事项</p>
            <p class="content">
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                这里是测试文字这里是测试文字这里是测试文字这里是测试文字这里是测试文字
                </p>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
    data() {
        return {
            mgs:'积分兑换',
            src:'../../../static/images/coupon.png',
           usedIntegral:'',
            rankings: [
                        //   {id:1, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:2, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:3, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:4, discount:"100元优惠券",used:'满5000元使用', },
            ]
        };
    },
    mounted () {
        this.jiekou();
    },

    methods: {
        back () {
            this.$router.go(-1);
        },
         jiekou () {
       console.log('created');
            this.axios(
            {
            method:"get",
            url:this.$baseurl + "/api/member/getPrizeList",
            params:{
               usedIntegral :localStorage.getItem('usedIntegral'),
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
                this.rankings=res.data.data.list
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
        appli (prizeId) {
            const tknr = '<div style="text-alige:center;height:1rem;line-height:1rem;">确定兑换该奖品吗？</div>'
            MessageBox.confirm('', {
            message: tknr,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(action => {
            if (action == 'confirm') {     //确认的回调
            //    console.log(1);
                if(this.usedIntegral>this.rankings.points){
                     this.$Toast({
                        message: '兑换成功',
                        position: 'bottom'
                      });
                    this.$router.push({path: '/application?prizeId='+prizeId})
                }else{
                    this.$Toast({
                        message: '兑换失败',
                        position: 'bottom'
                      });
                }
            }
            }).catch(err => {
            if (err == 'cancel') {     //取消的回调
            //    console.log(2);
            }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.mine{
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
    .coupon{
        margin-top: 1.12rem;
        li{
            background-color: #fff;
            font-size: 0.26rem;
            height: 1.38rem;
            text-align: center;
            padding-top: 0.3rem;
            padding-left: 0.26rem;
            padding-right: 0.26rem;
            padding-bottom: 0.28rem;
            box-sizing: border-box;
          -webkit-box-sizing: border-box;
          margin-bottom: 0.16rem;
            .coupon_img{
                float: left;
                img{
                    width: 1.06rem;
                    height: 0.76rem;
                }

            }
            .text_coupon{
                float: left;
                margin-left: 0.31rem;
                .top{
                    color:#ed9e5e;

                }
                .btn{
                    font-size: 0.23rem;
                    color: #9c9c9c;
                }
            }
            .Immediately{
                float: right;
                padding-top: 0.1rem;
                box-sizing: border-box;
          -webkit-box-sizing: border-box;
                .Immediately_text{
                   width: 2rem;
                   height: .6rem;
                   background-color: #ea8f46;
                   border-radius: 20px;
                    font-size: 0.24rem;
                    color:#fff;
                }

            }
        }

    }
    .action{
        padding-top: 0.35rem;
        padding-left: 0.26rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        background-color: #e9e9e9;
          font-size: 0.29rem;
          .title{
                 margin-bottom: 0.29rem;
          }
          .content{
              font-size: 0.24rem;
              color:#626262;
          }
    }

}

</style>
