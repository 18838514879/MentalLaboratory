<template>
  <div>
      <div class="header clearfix">
          <span @click="back()"><img src="../../../static/images/h_return.png" alt=""></span>
          {{ mgs }}
      </div>
      <div class="duo_answer_div">
          <img src="../../assets/nz.png" alt="" class="duo_answer_img">
          <p class="five">5</p>
      </div>
      <p class="duo_answer_text">[Did you see him yesterday?]属于下列哪种类型的句子？</p>
      <div class="duo_answer_full">
          <div class="duo_answer_full_one">祈使句</div>
          <div class="duo_answer_full_two">疑问句</div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            mgs: '标题'
        }
    },
    components: {

    },
    methods: {
        back () {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="scss">
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
        span{
            display: block;
            width: 0.4rem;
            height: 0.5rem;
            float: left;
            padding-left: 0.25rem;
            box-sizing:border-box;
            -webkit-box-sizing: border-box;
        }
    }
    .duo_answer_div{
        width: 100%;
        text-align: center;
        margin: 0 auto;
    }
    .duo_answer_img{
        width: .97rem;
	    height: 1.11rem;
        margin-bottom: .8rem;
    }
   .five{
        position: absolute;
        width: .25rem;
        height: .41rem;
        font-family: FZSKJW--GB1-0;
        font-size: .48rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .24rem;
        letter-spacing: 0px;
        color: #666666;
        top: 12.5%;
        left: 48.5%;
        font-weight: bold;
   }
   .duo_answer_text{
        width: 7.03rem;
        height: .97rem;
        font-family: MicrosoftYaHei;
        font-size: .36rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .63rem;
        letter-spacing: 0px;
        color: #282828;
        font-weight: bold;
        margin-top: -1rem;
        margin-left: .24rem;
   }
   .duo_answer_full{
       flex-direction: row-reverse;
       justify-content: space-around;
       justify-content: space-between;
       align-items: center;
   }
   .duo_answer_full_one{
        float: left;
        width: 1.68rem;
        height: 1.98rem;
        line-height: 2.39rem;
        background-color: #2083d1;;
        border-radius: .06rem;
        font-family: MicrosoftYaHei;
        font-size: .36rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        clear: both;
        margin-top: 1.79rem;
        margin-left: 1.35rem;
   }
   .duo_answer_full_two{
        float: right;
        width: 1.68rem;
        height: 2.71rem;
        line-height: 3.71rem;
        background-color: #ff8043;
        border:1px solid #ff8043;;
        border-radius: .06rem;
        font-family: MicrosoftYaHei;
        font-size: .36rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        position: relative;
        margin-right: 1.36rem;
        margin-top: 1.07rem;
   } 
</style>
