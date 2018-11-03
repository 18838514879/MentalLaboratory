<template>
     <div class="mine">
        <div class="header clearfix"><a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
           <ul class="set_top">
               <li class="set_img clearfix">
                 <a href="javascript:void(0);" class="imageup" style="position: absolute;display:block;width: 100%;height: 100%;"></a>
                 <div class="set_le" v-if="!userImg"><img :src="imgUrl" alt=""></div>
                 <div class="set_le" v-if="userImg"><img :src="userImg" alt=""></div>
                 <div class="set_fr" ><img src="../../../static/images/m_return.png" alt="">

                 </div>
           </li>
               <!--<li>-->
                 <!--<p class="p1" style="position: relative;">-->
                   <!--<span class="span1">用户头像</span>-->
                   <!--<a href="javascript:void(0);" class="imageup" style="position: absolute;display:block;width: 100%;height: 100%;"></a>-->
                   <!--&lt;!&ndash;<img class="img2"  src="../../assets/gaojiaxiang/youjiantou.png" alt="">&ndash;&gt;-->
                   <!--<img v-if="loading==false" class="img1" :src=userImg alt="">-->
                   <!--&lt;!&ndash;<img v-if="loading" src="../../assets/loading.gif" alt="" class="imgloading">&ndash;&gt;-->
                 <!--</p>-->
               <!--</li>-->
               <li class="clearfix" >
                   <input class="set_le" type="text"  v-model="name"  value="" :disabled="disabled1" placeholder="请输入您的昵称">
                    <button class="save" v-if="show1" @click="baocun1">保存</button>
               </li>
               <li class="clearfix">
                   <input class="set_le" type="text" v-model="city"  value="" :disabled="disabled2" placeholder="请输入您所在城市">
                    <button class="save" v-if="show2" @click="baocun2">保存</button>
                   </li>
               <li class="clearfix">
                   <input class="set_le" type="text" maxlength="11" v-model="phone"  value="" :disabled="disabled3"  placeholder="请输入您的手机号">
                    <button class="save" v-if="show3" @click="baocun3">保存</button>
                   </li>
           </ul>
           <ul class="set_btn">
              <li class="clearfix">
                  <div class="set_le">字体设置</div>
                  <div class="set_fr"><img src="../../../static/images/m_return.png" alt=""></div>
              </li>
              <li class="clearfix" @click="passwordsz()">
                  <div class="set_le">密码设置</div>
                  <div class="set_fr"><img src="../../../static/images/m_return.png" alt=""></div>
                </li>
           </ul>
            <button class="guding" @click="exit()">退出登录</button>
            <!--<div class="page-actionsheet-wrapper">-->
                <!--<button class=" button_opcity mint-button mint-button&#45;&#45;default mint-button&#45;&#45;large" @click="actionSheet"></button>-->
            <!--</div>-->
     <!--<mt-actionsheet :actions= "data" v-model="sheetVisible"></mt-actionsheet>-->
    </div>

</template>
<script>
import { Actionsheet } from "mint-ui";

export default {
  data() {
    return {
      userImg:'',//个人用户头像
      userName:'',//个人用户名
      userTelephone:'',//个人用户手机号

//      imgUrl:'',
      loadUrl:'uploadImg/uploadSpecImg.htm',
      show:true,
      loading:false,//上传图片加载
      headImg:'',//用户头像

      mgs: "我的设置",
      show1: false,
      show2: false,
      show3: false,
      disabled1:false,
      disabled2:false,
      disabled3:false,
      phone:'',
      name: "",
      city: "",
      imgUrl:'../static/images/portrait.png',
      data: [
        {
          name: "拍照",

          method: this.getCamera // 调用methods中的函数
        },
        {
          name: "从相册中选择",
          method: this.getLibrary // 调用methods中的函数
        }
      ],
      //   action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
    };
  },

    //用户信息接口
    created() {
    console.log("created"),
      this.axios({
          method:"get",
           url:this.$baseurl + "/api/member/getMemberInfo",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
       }).then((res)=>{
        console.log(res)
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
          this.phone = res.data.member.phone;
          this.name = res.data.member.nickname;
          this.city = res.data.member.area;
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }

       }).catch(err => {
         console.log(err);
       });

  },
  mounted:function(){


    var that=this;
    function plusReady(){
      sessionStorage.setItem("camereIsok",'1');
      // 弹出系统选择按钮框
      if(sessionStorage.getItem("camereIsok")==0){
        return;
      }else {
        sessionStorage.setItem("camereIsok",'0');
        mui("body").on("tap",".imageup",function(){
          //page.imgUp();
          var m=this;
          plus.nativeUI.actionSheet({cancel:"取消",buttons:[
            {title:"拍照"},
            {title:"从相册中选择"}
          ]}, function(e){//1 是拍照  2 从相册中选择
            switch(e.index){
              case 1:clickCamera();break;
              case 2:clickGallery();break;
            }
          });
        })
      }
    }

    //发送照片

    function clickGallery() {
      plus.gallery.pick(function(path) {
        plus.zip.compressImage({
          src: path,
          dst: "_doc/chat/gallery/" + path,
          quality: 20,
          overwrite: true
        }, function(e) {
          that.updateImgStart();//图片开始上传了
          var task = plus.uploader.createUpload(that.$baseimgurl, {
            method: "post"
          }, function(t, sta) {
            console.log(JSON.stringify(t))
            alert(JSON.stringify(t))
            if(sta == 200) {
              that.imgUrl=JSON.parse(t.responseText).url;
              that.updateImgEnd();
            }
          });
          task.addFile(e.target, {});
          task.start();
        }, function(err) {
          console.error("压缩失败：" + err.message);
        });
      }, function(err) {});
    };


    // 拍照
    function clickCamera() {
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      cmr.captureImage(function(path) {
        that.updateImgStart();//图片开始上传了
        plus.io.resolveLocalFileSystemURL(path, function(entry) {
          var localUrl = entry.toLocalURL();
          plus.zip.compressImage({
            src: localUrl,
            dst: "_doc/chat/camera/" + localUrl,
            quality: 20,
            overwrite: true
          }, function(e) {
            var task = plus.uploader.createUpload(that.$baseimgurl, {
              method: "post"
            }, function(t, sta) {
              if(sta == 200) {
                that.imgUrl = JSON.parse(t.responseText).url;
                /*console.log(typeof (t.responseText))
                console.log(that.imgUrl)*/
                that.updateImgEnd();
              }
            });
            task.addFile(e.target, {});
            task.start();
          }, function(err) {
            console.log("压缩失败：  " + err.message);
          });
        });
      }, function(err) {
        console.error("拍照失败：" + err.message);
      }, {
        index: 1
      });
    };
    if(window.plus){
      plusReady();
    }else{
      document.addEventListener("plusready",plusReady,false);
    }
  },
  watch: {
    name: function() {
      this.changeName();
    },
    city: function() {
      this.changeCity();
    },
    phone: function() {
      this.changePhone();
      // this.phone = this.phone.replace(/\D/g, "");
    }
  },

  methods: {
    actionSheet: function() {
      this.sheetVisible = true;
    },
    getCamera: function() {
      console.log("打开照相机");
    },
    getLibrary: function() {
      console.log("打开相册");
    },

    baocun1: function() {
        console.log(this.name)
       if(this.name == undefined || null){
            this.show1 = true;
            this.disabled2 = true;
            this.disabled3 = true;
            this.$Toast({
                message: '昵称不能为空',
                position: 'bottom'
          });
            return;
        }

      console.log("created"),
      this.axios({
          method:"post",
           url:this.$baseurl + "/api/member/saveMemberInfo",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                    nickname:this.name,
                }
       }).then((res)=>{
        console.log(res)
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
          this.$Toast({
            message: '保存成功',
            position: 'bottom'
          });
          this.show1 = false;
          this.disabled1 = false;
          this.disabled2 = false;
          this.disabled3 = false;
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }
       }).catch(err => {
         console.log(err);
       });
    },
    baocun2: function() {

     if(this.city ==  null){
            this.show2 = true;
            this.disabled1 = true;
            this.disabled3 = true;
            this.$Toast({
                message: '城市不能为空',
                position: 'bottom'
          });
            return;
        }

      console.log("created"),
      this.axios({
          method:"post",
           url:this.$baseurl + "/api/member/saveMemberInfo",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                    area:this.city,
                }
       }).then((res)=>{
        console.log(res)
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
          this.$Toast({
            message: '保存成功',
            position: 'bottom'
          });
          this.show1 = false;
          this.disabled1 = false;
          this.disabled2 = false;
          this.disabled3 = false;
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }

       }).catch(err => {
         console.log(err);
       });
    },
    baocun3: function() {

     if(this.phone == null){
            this.show3 = true;
            this.disabled2 = true;
            this.disabled1 = true;
            this.$Toast({
                message: '手机号不能为空',
                position: 'bottom'
          });
            return;
        }
         var phone=/^1[34578]\d{9}$/;
          if(!phone.test(this.phone)){
              this.$Toast({
                  message: '手机号格式错误',
                  position: 'bottom'
              });
              return;
          }

      console.log("created"),
      this.axios({
          method:"post",
           url:this.$baseurl + "/api/member/saveMemberInfo",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
           params:{
                    phone:this.phone,
                }
       }).then((res)=>{
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
            this.$Toast({
              message: '保存成功',
              position: 'bottom'
            });
            this.show3 = false;
            this.disabled1 = false;
            this.disabled2 = false;
            this.disabled3 = false;
          } else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }

       }).catch(err => {
         console.log(err);
       });
    },
    changeName: function() {

      var that = this;
      if (that.name != '') {
        that.show1 = true;
        that.disabled2=true
        that.disabled3=true
      } else {
        that.show1 = false;
        that.disabled2=false;
        that.disabled3=false;
        that.disabled1=false;
      }
    },
    changeCity: function() {

      var that = this;
      if (that.city != '') {
        that.show2 = true;
        that.disabled1=true
        that.disabled3=true
      } else {
        that.show2 = false;
        that.disabled2=false;
        that.disabled3=false;
        that.disabled1=false;
      }
    },
     changePhone: function() {

      var that = this;
       this.phone=this.phone.replace(/\D/g,'');
       if (that.phone != '') {
        that.show3 = true;
        that.disabled2=true
        that.disabled1=true
      }
      else {
        that.show3 = false;
        that.disabled2=false;
        that.disabled3=false;
        that.disabled1=false;

      }
    },
    back () {
        this.$router.go(-1);
    },
    passwordsz (phone) {
        this.$router.push({path: '/password?phone=' + this.phone})
    },
     exit () {
        console.log("created")
      this.axios({
          method:"post",
           url:this.$baseurl + "/api/member/logout",
           headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
       }).then((res)=>{
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
          this.$router.push({path: '/login'})
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }

       }).catch(err => {
         console.log(err);
       });
    },
    updateImgStart:function () {
      //图片开始上传了
      this.loading = true;
    },
    updateImgEnd:function () {
      //图片上传完成了
      this.loading = false;
      this.headImg = this.imgUrl;
      this.reviseImg();
    },
    reviseImg:function(){
      alert(this.headImg)
      var that=this;
      this.axios({
        method:"post",
        url:this.$baseurl + "/api/member/saveMemberInfo",
        headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
        params: {
          imgUrl:this.headImg
        }
      }).then((res)=>{
        console.log(res)
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
            that.$Toast({
              message: '用户头像修改成功',
              position: 'bottom'
            });
            that.userImg =  that.headImg;
          this.show1 = false;
          this.disabled1 = false;
          this.disabled2 = false;
          this.disabled3 = false;
        }else{
          this.$Toast({
            message: res.data.msg,
            position: 'bottom'
          });
        }
      }).catch(err => {
        console.log(err);
      });

    },//修改用户头像
   },


  }
</script>
<style lang="scss" scoped>
  /*.main{*/
    /*width: 96%;*/
    /*float: right;*/
    .p1{
      height: 1.5rem;
      border-bottom: 1px solid #D4D7DD;
      .img1{
        display: block;
        float: right;
        width: 1.15rem;
        height: 1.15rem;
        margin-top: 0.2rem;
        margin-right: 0.3rem;

      }
    }
    .p2,.p3{
      height: 1.5rem;
      border-bottom: 1px solid #D4D7DD;
    }
    .span1{
      display: block;
      float: left;
      font-size: 0.28rem;
      line-height: 1.5rem;
    }
    .span2,.span3{
      display: block;
      float: right;
      font-size: 0.28rem;
      line-height: 1.5rem;
      margin-right: 0.3rem;
    }
    .span3{
      //    margin-left: 45%;
    }
    .img2{
      display: block;
      width: 0.15rem;
      height: 0.22rem;
      float: right;
      margin-top: 0.64rem;
      margin-right: 0.29rem;
    }
  /*}*/


.button_opcity {
  opacity: 0;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 1.8rem;
  right: 0.2rem;
}
// input::-webkit-input-placeholder{color:#000;}
.save {
  width: 1.2rem;
  height: 0.5rem;
  background-color: #ff8043;
  border-radius: 20px;
  color: #fff;
  font-size: 0.24rem;
  position: absolute;
  top: 0.2rem;
  right: 0;
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
    z-index: 1;
    position: fixed;
    top:0;
    right: 0;
    left: 0;
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
  .set_top {
    margin-top: 1.08rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #fff;
    .set_img {
      height: 1.6rem;
      line-height: 0;
      .set_le {
        margin-top: 0.5rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      .set_fr {
        float: right;
        img {
          margin-top: 0.7rem;
        }
      }
    }
    li {
      height: 0.89rem;
      line-height: 0rem;
      border-bottom: 1px solid #f3f3f3;
      position: relative;
      .set_le {
        float: left;
        width: 70%;
        height: 0.89rem;
        line-height: 0.89rem;
        font-size: 0.28rem;
        outline: none;
        background-color: #fff;
      }
      .set_fr {
        float: right;
        img {
          width: 0.2rem;
          height: 0.3rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  .set_btn {
    margin-top: 0.23rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: #fff;
    li {
      height: 1.1rem;
      line-height: 0rem;
      border-bottom: 1px solid #f3f3f3;
      overflow: hidden;
      .set_le {
        float: left;
        font-size: 0.28rem;
        margin-top: 0.45rem;
      }
      .set_fr {
        float: right;
        img {
          width: 0.2rem;
          height: 0.3rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  .guding {
    width: 6rem;
    height: 0.8rem;
    background-color: #ff8043;
    color: #fff;
    border-radius: 20px;
    position: fixed;
    left: 50%;
    margin-left: -3rem;
    bottom: 0.2rem;
    font-size:.36rem;
  }
}
</style>

