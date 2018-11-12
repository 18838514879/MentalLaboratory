<template>
    <div class="mine">
        <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
        <div class="top_box">
            <img :src="logo" alt="">
        </div>
         <ul class="applice">
          <li class="clearfix">
            <div class="applice_le">手机号</div>
            <div class="applice_ri"><input class="input_ri" type="text" maxlength="11" v-model="phone" :disabled="disabled" placeholder=""></div>
          </li>
           <li class="clearfix">
            <div class="applice_le">新密码</div>
            <div class="applice_ri"><input class="input_ri" type="password" maxlength="12" v-model="password" placeholder="请输入密码"></div>
          </li>
           <li class="clearfix">
            <div class="applice_le">确认密码</div>
            <div class="applice_ri"><input class="input_ri" type="password" maxlength="12" v-model="againPassword" placeholder="再次输入密码"></div>
          </li>
           <li class="clearfix">
            <div class="applice_le">验证码</div>
            <div class="applice_ri"><input class="input_ri lastinput" type="text" v-model="authCode" placeholder="请输入验证码"></div>
            <button id="yanzhe" class="auth" @click="getCode()">获取验证码</button>
            <button v-show="!show" class="count">{{count}} s</button>
          </li>
           <li class="clearfix ">
          <img class="change" v-if="isOk" src="../../../static/images/select_read.png" alt="" @click="changeImg()">
             <img class="change" v-if="!isOk" src="../../../static/images/select_notread.png" alt="" @click="changeImg()">
          <span class="read">我已阅读并接受<span class="test">《心理实验室》</span>用户条款</span>
       </li>
        </ul>
       <button class="sure" @click="sure()">确定</button>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
          isOk:false,
            show:true,
            shows:true,
            disabled:true,
            count:'',
            auth:null,
            mgs:'密码修改',
            phone:"",
            password:'',
            againPassword:'',
            code:'',
            logo:'',
            authCode:'',
            src:''
        };
    },
    watch:{
        phone:function () {
            this.phone=this.phone.replace(/\D/g,'');
            if(this.phone == ""){
                document.getElementById('yanzhe').style.backgroundColor = '';
            } else {
                document.getElementById('yanzhe').style.backgroundColor = '#2083d1';
            }

        },
    },

   mounted () {
      if(this.$route.query.phone){
        this.phone=this.$route.query.phone;
      }
       this.logoJiekou();
   },

    methods: {
    //获取logo接口
        logoJiekou () {
        this.axios.get(this.$baseurl + '/api/config/getConfig',
        {
            params: {
                param:'logoUrl'
            }
        }).then( res => {
            // console.log(res);
            this.logo = res.data.logoUrl;
        })
    },

          // 验证码
            getCode () {

                 if(this.phone == ''){
                this.$Toast({
                    message: '手机号不能为空',
                    position: 'bottom'
                });
                return;

            }
            var phone=/^1[3456789]\d{9}$/;
            if(!phone.test(this.phone)){
                this.$Toast({
                    message: '手机号格式错误',
                    position: 'bottom'
                });
                return;
            }
            if(this.password == ''){
                this.$Toast({
                    message: '密码不能为空',
                    position: 'bottom'
                });
                return;
            }
            var password=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            if(!password.test(this.password)||password.length<6||password.length>12){
                this.$Toast({
                    message: '密码必须为6-12位的数字和字母的组合',
                    position: 'bottom'
                });
                return;
            }
            if(this.againPassword == ''){
                this.$Toast({
                    message: '确认密码不能为空',
                    position: 'bottom'
                });
                return;
            }
            if(this.againPassword != this.password){
                    this.$Toast({
                    message: '确认密码和新密码不一致',
                    position: 'bottom'
                });
                return;
            }

               //验证码倒数
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
                };

                // 验证码接口
                this.axios({
                    method:"post",
                    url:this.$baseurl + "/api/register/getMessageByPw",
                    params:{
                        phone:this.phone,
                    }
                    }) .then( res => {
                        console.log(res.data);
                    }).catch( err => {
                      console.log(err);
                 });
            },
        // 修改用户密码
        sure: function () {
            if(this.authCode == ''){
                this.$Toast({
                    message: '验证码不能为空',
                    position: 'bottom'
                });
                return;
            }

          if(!this.isOk){
            this.$Toast({
              message: '请选中已阅读',
              position: 'bottom'
            });
            return false
          }
//            var img1 = "../static/images/select_read.png"
//            if(this.src != img1){
//
//            }

            // 用户修改信息接口
            this.axios({
                method:"post",
                url:this.$baseurl + "/api/member/saveMemberInfo",
                headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
                params:{
                  phone:this.phone,
                  password:this.password
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
                MessageBox('提示', '保存成功');
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }


                }).catch(err => {
                    console.log(err);
                });
            // 延迟跳转
                const TIME_COUNTS = 3;
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
                        // 返回登陆页面
                        this.$router.push({path:'/login'});
                        }
                    },1000)
                }

            },
            // 返回上一页
            back () {
                this.$router.go(-1);
            } ,
            // 用户协议确认
            changeImg () {
          this.isOk=!this.isOk;
//                var img = "../static/images/select_notread.png"
//                if(this.src == img){
//                this.src = "../static/images/select_read.png"
//                }else{
//                this.src = "../static/images/select_notread.png"
//
//                }

            },

        },
    }

</script>
<style lang="scss" scoped>

    input:disabled{
        background-color : #fff;
        color: #666;
        opacity:1;
        -webkit-text-fill-color:#666;
        -webkit-opacity:1;
     }
    // logo
    .top_box img{
        display: block;
        width: 2.13rem;
        margin: 0 auto;
        margin-bottom: 1.45rem;
    }

.mine{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
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
 .top_box{
     width: 3.52rem;
     height: 1.56rem;
    //  background-color: #9c9c9c;
     margin: 0 auto;
     margin-top: 0.52rem;
     padding-top: 0.88rem;
    box-sizing:border-box;
   -webkit-box-sizing: border-box;
 }
 .applice{
      width: 100%;
      height: 1.10rem;
      background-color: #fff;
      font-size: 0.3rem;
      margin-top: 1.2rem;
       border-bottom: 1px solid #f3f3f3;
       position: relative;
     li{
        width: 100%;
        height: 1.10rem;
        padding-left: 0.5rem;
       box-sizing: border-box;
      -webkit-box-sizing: border-box;
        background-color: #fff;
        .applice_le{
        float: left;
        width: 30%;
        height: 1.10rem;
        line-height: 1.10rem;

      }
      .applice_ri{
        float: right;
        width: 70%;
        height: 1.08rem;
        .input_ri{
             outline: none;
             width: 100%;
             height: 100%;
             border-bottom: 1px solid #f3f3f3;
        }
        .lastinput{
           border-bottom:none;
        }
        .input_ri::-webkit-input-placeholder{
              color:#a3a3a3;

        }
      }
     }
    //  获取验证码
     .auth{
         width: 2rem;
         height: 0.6rem;
         background-color: #2083d1;
        //  background-color: #999999;
         border-radius: 20px;
         color:#fff;
         font-size: 0.25rem;
         position: absolute;
         right: 0.3rem;
         margin-top: 0.17rem;

     }
    //  验证码
     .count{
        width: 2rem;
        height: 0.6rem;
        // background-color: #2083d1;
        background-color: #999999;
        border-radius: 20px;
        color:#fff;
        font-size: 0.25rem;
        position: absolute;
        right: 0.3rem;
        margin-top: 0.17rem;
     }
    }
    li{
    .change{
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: middle;
    }
    .read{
        font-size: 0.25rem;
        margin-left: .2rem;
        .test{
        font-size: 0.25rem;
        color:#2083d1;
    }
    }
    }
    .sure{
        width: 6rem;
        height: 0.82rem;
        background-color: #ea8f46;
        color:#fff;
        border-radius: 20px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top:7rem;
        margin: auto;
        font-size: 0.3rem;

    }


}

</style>
