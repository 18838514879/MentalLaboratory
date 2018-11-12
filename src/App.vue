<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
 mounted:function () {
      var that=this;
    //初始化  mui   
     mui.init({
            swipeBack:false //关闭右滑关闭功能
        });
        mui.plusReady(function() {
            wainshow();
            var old_back = mui.back;
            plus.key.addEventListener('backbutton', function () {
           
                if (that.$route.path == "/login" || that.$route.path == "/test" || that.$router.push == "/new" || that.$router.push =="/study" || that.$router.push == "/personal") {
                        plus.runtime.quit();
                }
            }, false);
            document.addEventListener("netchange", wainshow, false);
            document.addEventListener("drag", function (e) {
                //下拉的时候flg 走阻止
            document.getElementsByClassName('mint-tab-container-wrap')[0].style.transform="translate3d(0,0,0)";
            }, false);
        });
//检查网络
        function wainshow() {
            if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
                mui.toast("网络异常，请检查网络设置！");
            }
        }


    //  mui('.classify').slider().setStopped(true);
    //  mui('.index').slider().setStopped(true);
    //  mui('.shopCart').slider().setStopped(true);
    //  mui('.mine').slider().setStopped(true);
    } ,
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  /* 禁用iPhone中Safari的字号自动调整 */
  html {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;

  }
  /* 去除iPhone中默认的input样式  清除苹果浏览器的圆角表单*/
  input[type="submit"],

  input[type="reset"],

  input[type="button"],

  input{-webkit-appearance:none; resize: none;}
  /* 取消链接高亮  */
  body,div,ul,li,ol,h1,h2,h3,h4,h5,h6,input,textarea,select,p,dl,dt,dd,a,img,button,form,table,th,tr,td,tbody,article, 
  aside, details,figcaption,figure,footer,header,hgroup, menu,nav,section{ -webkit-tap-highlight-color:rgba(0, 0, 0, 0); }
  /* 设置HTML5元素为块 */
  article, aside, details,figcaption,figure,footer,header,hgroup, menu,nav,section {
  display: block;
  }
  /* 图片自适应 */
  img {
  max-width: 100%;
  height: auto;
  width:auto\9; /* ie8 */
  -ms-interpolation-mode:bicubic;/*为了照顾ie图片缩放失真*/
  }
  /* 初始化 */
  body,div,ul,li,ol,h1,h2,h3,h4,h5,h6,input,textarea,select,p,dl,dt,dd,a,img,button,form,table,th,tr,td,tbody,article, 
  aside, details,figcaption,figure,footer,header,hgroup, menu,nav,section{margin:0; padding:0; border:none;}
  body{font-family: Microsoft YaHei,Tahoma,Arial,sans-serif;}
  em,i{font-style:normal;}
  strong{font-weight: normal;}
  .clearfix:after{content:""; display:block; visibility:hidden; height:0; clear:both;}
  .clearfix{zoom:1;}
  a{text-decoration:none; color:#969696; font-family: Microsoft YaHei,Tahoma,Arial,sans-serif;}
  a:hover{ text-decoration:none;}
  ul{list-style:none;}
  h1, h2, h3, h4, h5, h6{ font-size:100%; font-family: Microsoft YaHei;}
  img{border: none;}
  input:-webkit-autofill { 
  // -webkit-box-shadow:inset 0 0 0 100px #FFFFFF ;
  -webkit-text-fill-color: #818391;
  }
　input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #676767;
  }
　input:-moz-placeholder, textarea:-moz-placeholder {
    color:#676767;
  }
　input::-moz-placeholder, textarea::-moz-placeholder {
    color:#676767;
  }
　input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#676767;
  }
button{
  outline: none;
}
  html,body{
    font-size: 100px;
    background: #f8f8f8;

    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;


    width: 100%;
    //max-width: 7.5rem;
    margin: auto;
  }
  #app {
    /*height: 100%;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/

    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /*max-width: 7.5rem;*/
   /*margin: auto;*/
  }
  .public_header{
    width: 100%;
    max-width: 7.5rem;
    margin: 0 auto;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.32rem;
    position: fixed;
    top: 0;
    z-index: 99999;
    color: #ccae6e;
    background: #ffffff;
    img:nth-of-type(1){
      display: block;
      width: 0.2rem;
      position: absolute;
      left: 0.25rem;
      top: 0.26rem;
    }
    img:nth-of-type(2){
      display: block;
      width: 0.2rem;
      position: absolute;
      right: 0.25rem;
      top: 0.26rem;
    }，
     .mui-toast-container {bottom: 25% !important;}//提示框
  }
  //横线
  .public_row{
    width: 100%;
    height: 0;
    border-top: 1px solid #b8bbbf;
  }

  //竖线
  .public_line{
    width: 0;
    border-left: 1px solid #b8bbbf;
  }
  //一行两个 或一个  img  的   行布局
  .public_row_list{//ul的class
    li{
      div{
        display: flex;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0.2rem 0;
        .left{
          margin-right: 0.4rem;
          width: 0.4rem;
          img{
            width: 100%;
            vertical-align: middle;
          }
        }
        .center{
          flex: 1;
          height: 0.8rem;
          line-height: 0.8rem;
        }
        .right{
          width: 0.3rem;
          img{
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }

  //一行一个 img  的   列布局
  .public_line_list{
    display: flex;
    justify-content: space-around;
    li{
      div{
        text-align: center;
        .imgs{
          height: 0.5rem;
          margin-bottom: 0.2rem;
          img{
            height: 100%;
          }
        }
      }
    }
  }

  //遮罩层
  .public_shade{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-width: 7.5rem;
    margin: auto;
    background-color: rgba(0,0,0,0.5);
    z-index: 99999999;
    .public_center{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }


  //菊花的样式
  /*<!--.mint-indicator-spin{-->
    <!--display: block;-->
  <!--}-->
  <!--.mint-spinner-fading-circle{-->
    <!--left: 50%;-->
    <!--transform: translateX(-50%);-->
  <!--}-->*/
*{
  margin: 0;
  padding: 0;
}
</style>
