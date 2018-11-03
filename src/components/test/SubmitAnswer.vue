<template>
    <div class="mine">
    <div class="header clearfix"><a href=""><img src="../../../static/images/h_return.png" alt=""></a>
        <span>{{mgs}}</span>
    </div>
        <div class="top">
            <img src="../../../static/images/clcok.jpg" alt="" class="top_img_jpg">
            <img src="../../../static/images/morepersonal.png" alt="" class="top_img_png">
        </div>
        <p class="mine_text">
            [Did you see him yesterday?]属于下列哪种类型的句子？
        </p>
        <div class="btn">
            <div class="bth_lv bth_zhu">祈使句</div>
            <div class="bth_bai bth_zhu">疑问句</div>
            <div class="bth_hong bth_zhu">祈使句</div>
            <div class="bth_bai bth_zhu">疑问句</div>
        </div>
        <div>
            <button class="back">上一题</button> <button class="exit">提交</button>
        </div>
    </div>
</template>
<script>

export default{
   data () {
      return {   
         mgs:'实验'
      }
    },
  
}

</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
  .top{
      width: 100%;
      background-color: #fff;
      padding-left: 0.24rem;
      margin-top:.19rem;
  }
}
.top_img_jpg{
    height: 1.11rem;
    margin: 0 auto;
    display: inherit;
}
.top_img_png{
    width: 7.02rem;
	height: 1.81rem;
}
.mine_text{
    width: 7.03rem;
	font-size: .36rem;
	line-height: .49rem;
	color: #282828;
    padding-left: 0.24rem;
    margin-top: -0.26rem;
}
.btn{
    margin-top: .26rem;
    margin-left: .24rem;
}
.bth_zhu{
    width: 4.40rem;
	height: .98rem;
    font-size: .36rem;
	background-color: #ffffff;
	border: solid 1px #76b039;
    border-radius: 45px;
    line-height: .98rem;
    text-align: center;
    margin-bottom:.36rem;
      
}
.bth_lv{
    background-color: #91cb53;
    color: #ffffff;
}
.bth_hong{
    background-color: #ed7a68;
    color: #ffffff;
    
}
.bth_bai{
    border: solid 1px #91cb53;
    color:#333333;
}
button{
      height: 0.9rem;
      width: 3.05rem;
      border-radius: 20px;
      color:#fff;
      font-size: 0.32rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 11.51rem;

  }
  .back{
      background-color: #0d86d2;
      margin-left: 0.24rem;

  }
  .exit{
       background-color: #bdbdbd;
       margin-right: 0.24rem;
  }
</style>
