<template>
     <div class="mine">
        <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
           <ul class="set_top">
               <li class="set_img clearfix">
                 <a href="javascript:void(0);" id="imageup" style="position: absolute;display:block;width: 100%;height: 100%;"></a>
                 <div class="set_le"><img :src="imgUrl" alt=""></div>
                 <!-- <div class="set_le" v-if="userImg"><img :src="userImg" alt=""></div> -->
                 <div class="set_fr" ><img src="../../../static/images/m_return.png" alt=""></div>
               </li>
              
               <li class="clearfix" >
                   <input class="set_le" type="text" @click="updateSaveIdx('1')"  v-model="name"  value="" :disabled="saveIdx==2 || saveIdx==3?'disabled':false" placeholder="请输入您的昵称">
                    <button class="save" v-if="saveIdx==1" @click="baocun1">保存</button>
               </li>
               <li class="clearfix">
                   <input class="set_le" type="text" @click="updateSaveIdx('2')" v-model="city"  value="" :disabled="saveIdx==1 || saveIdx==3?'disabled':false" placeholder="请输入您所在城市">
                    <button class="save" v-if="saveIdx==2" @click="baocun2">保存</button>
                   </li>
               <li class="clearfix">
                   <!-- <input class="set_le" type="text" maxlength="11" v-model="phone" @click="updateSaveIdx('3')"  value="" :disabled="saveIdx==2 || saveIdx==1?'disabled':false"  placeholder="请输入您的手机号"> -->
                    <input class="set_le" type="text" maxlength="11" v-model="phone" disabled placeholder="请输入您的手机号">
                    <!-- <button class="save" v-if="saveIdx==3" @click="baocun3">保存</button> -->
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
      saveIdx:"-1",///判断保存按钮的显示隐藏
      loadUrl:'uploadImg/uploadSpecImg.htm',
      show:true,
      loading:false,//上传图片加载
      headImg:'',//用户头像
      mgs: "我的设置",
      phone:'',
      phones:'',
      name: "",
      city: "",
      imgUrl:'',
      data: [
       
      ],
      sheetVisible: false
    };
  },

   
  mounted:function(){

    var that=this;
    that.urseInfo();
    function plusReady(){
      // sessionStorage.setItem("camereIsok",'1');
      // // 弹出系统选择按钮框
      // if(sessionStorage.getItem("camereIsok")==0){
      //   return;
      // }else {
      //   sessionStorage.setItem("camereIsok",'0');
      function aa(){
         var m=this;
          camere = plus.nativeUI.actionSheet({cancel:"取消",buttons:[
            {title:"拍照"},
            {title:"从相册中选择"}
          ]}, function(e){//1 是拍照  2 从相册中选择
            switch(e.index){
              case 1:clickCamera();break;
              case 2:clickGallery();break;
            }
          });
       }
        mui("body").on("tap","#imageup",aa)
   
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
          var task = plus.uploader.createUpload(that.$baseurl +"/api/member/upload", {
            method: "post"
          }, function(t, sta) {
            console.log(JSON.stringify(t))
            // alert(JSON.stringify(t))
            if(sta == 200) {
              that.imgUrl=JSON.parse(t.responseText).url;
              that.updateImgEnd();
            }
          });
          task.addFile(e.target, {});
          task.start();
        }, function(err) {
          //  alert(JSON.stringify(err))
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
            var task = plus.uploader.createUpload(that.$baseurl +"/api/member/upload", {
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
  watch: {},
 
  methods: {
     //用户信息接口
    urseInfo() {
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
          this.imgUrl = res.data.member.imgUrl;
          this.phones = res.data.member.phone;
          this.name = res.data.member.nickname;
          this.city = res.data.member.area;
          this.phone = res.data.member.phone.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2");
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

    actionSheet: function() {
      this.sheetVisible = true;
    },
    // cameraChoice:function(){
    //       plus.nativeUI.actionSheet({cancel:"取消",buttons:[
    //         {title:"拍照"},
    //         {title:"从相册中选择"}
    //       ]}, function(e){//1 是拍照  2 从相册中选择
    //         switch(e.index){
    //           case 1:clickCamera();break;
    //           case 2:clickGallery();break;
    //         }
    //       });
    // },
  
    updateSaveIdx:function (idx) {//修改按钮状态
      this.saveIdx=idx;
    },
  
    baocun1: function() {
        console.log(this.name)
       if(this.name == "" ||  this.name ==null){
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
          localStorage.setItem('token' ,'')
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
          this.saveIdx="-1";//初始化保存显示按钮

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
          localStorage.setItem('token' ,'')
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

          this.saveIdx="-1";//初始化保存显示按钮

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
            this.$Toast({
              message: '保存成功',
              position: 'bottom'
            });
          this.saveIdx="-1";//初始化保存显示按钮

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
   
    back () {
        this.$router.go(-1);
    },
    passwordsz (phones) {
        this.$router.push({path: '/password?phone=' + this.phones})
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
          localStorage.setItem('token' ,'')
          //  localStorage.clear();
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
    reviseImg:function(){//头像修改
    var that = this;
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
            that.$Toast({
              message: '用户头像修改成功',
              position: 'bottom'
            });
            that.imgUrl =  that.headImg;
            window.location.reload();
            // alert(that.imgUrl)
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
   
    .img2{
      display: block;
      width: 0.15rem;
      height: 0.22rem;
      float: right;
      margin-top: 0.64rem;
      margin-right: 0.29rem;
    }



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
  position: relative;
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
    position: absolute;
    top:7rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    font-size:.36rem;
  }
}
</style>

