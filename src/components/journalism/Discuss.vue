<template>
    <div class="discuss">
        <div class="header clearfix">
            <a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>
            {{mgs}}
        </div>
        <div class="kongbai"></div>
        <p class="discuss_time"><span>发布时间：</span><span>2018-10-19</span></p>
        <hr class="discuss_hr">
        <p class="discuss_text"> 
            帮助，指以出钱、出力或出主意的方式相助别人。
            因为人是群居动物,自己付出劳动的同时还需要得到别人的帮助,所以帮助别人就是帮助自己。
            所以助人为乐就是在帮助周围的人,最后周围的人就会帮助自己,所以说帮助别人就是在帮助自己。
            语出宋宗泽《乞回銮疏》之十四：“凡勤王人，例遭斥逐，未尝有所犒赏，未尝有所帮助。
        </p>
        <textarea class="discuss_tex" placeholder="请输入内容"></textarea>
    </div>
</template>

<script>
export default {
  data() {
    return {
        mgs: '新闻标题'
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
    .discuss{
        background-color: #ffffff;
    }
    .kongbai{
        width: 100%;
        height: .29rem;
        background-color: #e9e9e9;
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
        height: 1px;
        background-color: #dadada;
        margin: 0 auto;
        margin-top: .29rem;
        margin-bottom: .40rem;
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
    }
    .discuss_tex{
        width: 7.00rem;
        height: 2.95rem;
        margin-left: .23rem;
        margin-top: .50rem;
        background-color: #ffffff;
        box-shadow: 0px 3px 2px 0px 
            rgba(0, 0, 0, 0.05);
        border-radius: 3px;
        border: solid 2px #efefef;
    }
</style>
