<template>
    <div class="start_portrait">
      <div class="header clearfix">
          <a><img src="../../../static/images/h_return.png" alt=""></a>
          {{ mgs }}
      </div>
      <div class="start_answer"></div>
      <div class="head_portrait">
          {{ img }}
          <img src="../../../src/assets/touxiang.png" alt="">
    </div>
      <p class="start_number">参与人数：{{ number }}</p>
      <p class="start_award">
          奖励：{{ award }}
          <span><img src="../../../src/assets/jinbi.png" alt="" style="width: .41rem;height: .41rem;"></span>
      </p>
      <div class="start_botton">开始答题</div>
    </div>
  
</template>
<script>
 export default {
    data () {
      return {
        mgs: '开始答题',
        number: '9999',
        award: '99'
      }
    },
  mounted:function () { },
  computed:{ },
  watch:{ },
  methods: {}
 }
</script>
<style lang="scss" scoped>
    .start_portrait{
        position: relative;
        margin: 0 auto;
     }
    .header{
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.4rem;
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
    .start_answer{
        width: 100%;
        height: 1.58rem;
        background-color: #2782d7;
    }
    .head_portrait{
        position:absolute;
        width: 2.13rem;
        height: 2.13rem;
        background-color: red;
        border-radius: 50%;
        top: 16%;
        left: 37%;
        zoom: 100;
    }
    .start_number{
        width: 2.35rem;
        height: .29rem;
        font-family: HiraginoSansGB-W6;
        font-size: .30rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #626262;
        margin: 0 auto;
        margin-top:1.53rem;
        text-align: center; 
    }
    .start_award{
        font-family: HiraginoSansGB-W3;
        font-size: .30rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #2083d1;
        margin: 0 auto;
        margin-top:.39rem;
        text-align: center; 
    }
    .start_award span img{
        width: .41rem;
	    height:.41rem;
    }
    .start_botton{
        width: 5.96rem;
        height: .89rem;
        background-color: #ff8043;
        border-radius: 45px;
        font-family: SourceHanSansCN-Normal;
        font-size: .36rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .89rem;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        margin: 0 auto;
        margin-top: 2.26rem;
        text-align: center;
    }
</style>
