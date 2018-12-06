<template>
    <div class="mine">
        <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
        <ul class="coupon">
            <li class="clearfix" v-for="ranking in rankings" :key="ranking.id">
                <div class="coupon_img">
                    <img v-if="!src" src="../../../static/images/coupon.png" alt="">
                    <img v-if="src" :src="src" alt="">
                </div>
                <div class="text_coupon">
                        <span class="top">{{ranking.amount}}元现金券</span><br>
                        <span class="btn">满{{ranking.points}}积分使用</span>
                </div>
                <div class="Immediately">
                        <button class="Immediately_text" @click="appli(ranking.id,points)">立即领取</button>
                </div>
            </li>
            <!-- <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li>
            <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li>
            <li class="clearfix"><div class="coupon_img"><img src="../../../static/images/coupon.png" alt=""></div><div class="text_coupon"><span class="top">100元优惠券</span><br><span class="btn">满5000元使用</span></div><div class="Immediately"><img src="../../../static/images/Immediately.png" alt=""><span class="Immediately_text">立即领取</span></div></li> -->
        </ul>
        <div class="action">
            <div class="title">积分兑换注意事项:</div>
            <div class="content">
                <p> 一、通常情况下，如果您填写的信息的正确无误，积分兑换奖励将在1周内到账，请耐性等待。</p>
                <p> 二、如果汇款失败，积分将会自动退回账户中，您可以在新闻室中留意相关信息。</p>
                <p> 三、我们将会对以上信息将会进行严格审核，以防止一人多号、恶意刷分等情况的出现，最大限度地保障用户公平、安全地获取、使用积分。</p>
                <p> 四、以上信息不会被用于除积分兑换功能外的用途，我们将严格按照国家相关法律法规对上述信息进行保管。</p>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
    data() {
        return {
            mgs:'积分兑换',
            src:'',
           usedIntegral:'',
           points:'',
            rankings: [
                        //   {id:1, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:2, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:3, discount:"100元优惠券",used:'满5000元使用', },
                        //   {id:4, discount:"100元优惠券",used:'满5000元使用', },
            ],
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
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            params:{
               usedIntegral :localStorage.getItem('usedIntegral'),
            }
            }) .then( res => {
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
                console.log(res);
                this.rankings=res.data.data.list;
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
  
        appli (prizeId,points) {
            const tknr = '<div style="text-alige:center;height:1rem;line-height:1rem;">确定兑换该奖品吗？</div>'
            MessageBox.confirm('', {
            message: tknr,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(action => {
            if (action == 'confirm') {     //确认的回调
            //    console.log(1);

                if(this.usedIntegral>=points){
                    //  this.$Toast({
                    //     message: '兑换成功',
                    //     position: 'bottom'
                    //   });
                    this.$router.push({path: '/application?prizeId='+prizeId})
                }else{
                    this.$Toast({
                        message: '积分不足，无法兑换',
                        position: 'bottom'
                      });
                }
            }
            }).catch(err => {
            if (err == 'cancel') {     //取消的回调
            //    console.log(2);
            }
            });
        },

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
