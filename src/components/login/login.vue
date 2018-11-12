<template>
    <div class="main">
        <img :src="logoUrl" alt="">
        <div class="login_ipt">
            <div class="phone">
                <img src="../../../static/images/l_phone.png" alt="">
                <input class="phone_ipt" type="text" maxlength="11" v-model="phone" placeholder="请输入手机号码">
            </div>
            <div class="pass">
                <img src="../../../static/images/l_pass.png" alt="">
                <input class="pass_ipt" type="password" v-model="password" placeholder="请输入密码">
            </div>
        </div>
        <div class="go_other">
            <span class="go_regist"  @click="phoneRegisteredd()">手机注册</span>
            <i class="go_forgot" @click="phoneRegistered(phone)">忘记密码</i>
        </div>
        <button class="login" @click="login()">手机号登录</button>
        <div class="wx_login" id="weixin" v-show="false">微信登录 </div>
        <div class="myMap"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            password:'',
            phone:'',
            // inputType:'password',
            logoUrl:'',
            isok:-1,
            active:'',
        }
    },
    mounted:function () {
            var that=this; //作用域问题
            var isok=0;
            // console.log(this.$route.path);
            var auths=null;   //登录通道
            //初始化  mui
            mui.init({
                swipeBack:true //启用右滑关闭功能
            });

            //获取服务
            mui.plusReady(function() {
                //获取登录通道
                plus.oauth.getServices(function(services) {
                    auths = services;
                }, function(e) {
                    alert("获取登录服务列表失败：" + e.message + " - " + e.code);
                });
            });

        //微信登录按钮
            document.getElementById('weixin').addEventListener('tap',function() {
                //authLogout();
                // 先退出在登录
                alert('ssssssss');
                authLogin('weixin');
            });

        //登录操作
            function authLogin(type) {
                var s;
                for (var i = 0; i < auths.length; i++) {
                    if (auths[i].id == type) {
                        s = auths[i];
                        break;
                    }
                }
                if (!s.authResult) {
                    s.login(function(e) {
                        authUserInfo(type);//登陆成功之后  调取获取用户信息接口
                    }, function(e) {
                        alert(JSON.stringify(e))
                        mui.toast("登录认证失败！");
                    });

                } else {
                    authLogout();
                    mui.toast("已经登录认证！");
                }

            }
            //注销
            function authLogout() {
                for (var i in auths) {
                    var s = auths[i];
                    if (s.authResult) {
                        s.logout(function(e) {
                            console.log("注销登录认证成功！");
                        }, function(e) {
                            console.log("注销登录认证失败！");
                        });
                    }
                }

            }
            // 微信登录认证信息
            function authUserInfo(type) {
                var s;
                for (var i = 0; i < auths.length; i++) {
                    if (auths[i].id == type) {
                        s = auths[i];
                        break;
                    }
                }
                if (!s.authResult) {
                    mui.toast("未授权登录！");
                } else {
                    s.getUserInfo(function(e) {
                        alert(e.target.authResult.unionid);
                        var josnStr = JSON.stringify(s.userInfo);//转成字符串输出查看取自己需要的
                        var jsonObj = s.userInfo;//user相关的属性需要啥拿啥
                        // alert("unionid");

                        var unionid1=e.target.authResult.unionid;//防止出错  变量名
                        //unionid  和openid  的关系
        //                  unionid:app和微信端的通用,但是openid不是
        //                  openid:微信端支付必须用
        //                  需要什么自己看心情
                        that.nickName=jsonObj.nickname;
                        that.province=jsonObj.province;
                        that.city=jsonObj.city;
                        that.headImgUrl=jsonObj.headimgurl;
                        that.openid=jsonObj.openid;
                        that.sex=jsonObj.sex;
                        //ajax 请求把后台要的数据传出去
                        that.$ajax.post(that.$baseurl+'/user/loginOfApp.htm?nickName='+that.nickName+'&province='+that.province+'&city='+that.city+'&headImgUrl='+that.headImgUrl+'&openid='+that.openid+'&sex='+that.sex+'&unionid='+unionid1+'')
                            .then((response) => {
                                authLogout();
                                if(response.data.code==1){
                                    sessionStorage.setItem('id',response.data.userId);  //拿到唯一 userid  存起来
                                    sessionStorage.setItem('token',res.data.token);
                                    that.$router.push({name:'rebate',query:{'userId':response.data.userId,'openId':''}});
                                }else if(response.data.code==-2){
                                    that.$Toast({
                                        message: '您的账号被锁定,请联系管理员',
                                        position: 'bottom',
                                    });
                                    return;
                                }
                            })
                            .catch((response) => {
                                alert("获取userid失败");
                                alert(JSON.stringify(response));
                            })
                    }, function(e) {
                         alert("获取用户信息失败：" + e.message + " - " + e.code);
                    });
                }
            }

            //console.log(document.getElementById('nickName').value);
            sessionStorage.setItem('openId',0);
            this.active=this.$route.query.active;
            this.isEnabled=this.$route.query.isEnabled;
            if(this.isEnabled==1){
                this.$Toast({
                    message: '您的账号被锁定,请联系管理员',
                    position: 'bottom'
                });
                return;
            }
            if(this.active===1){
                this.$Toast({
                    message: '登录失败',
                    position: 'bottom'
                });
            }
            document.title = '登录';

        this.jiekou();
    },
    computed:{
    },
    watch:{
       phone:function () {
            this.phone=this.phone.replace(/\D/g,'');
        }
    },

    methods: {



        jiekou () {
        //获取logo接口
            console.log('created');
            this.axios.get(this.$baseurl + '/api/config/getConfig',
                {
                    params: {
                        param: 'logoUrl'
                    }
                }).then( res => {

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
                this.logoUrl=res.data.logoUrl
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }


                }).catch( err => {
                    console.log(err);
                })
        },

        login: function () {
           //手机号等验证
            var that=this;
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
          //手机号登录接口
           console.log('created');
            this.axios({
            method:"post",
            url:this.$baseurl + "/api/member/login",
            params:{
                phone:this.phone,
                password: this.password,
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
                this.$router.push({path:'/test'})
                var token=res.data.token;
                console.log(token);
                localStorage.setItem('token', token);
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
        phoneRegistered: function(phone) {
            this.$router.push({path:'/findPassword?phone='+ phone})
        },
        phoneRegisteredd () {
            this.$router.push({path: '/register'})
        }
    },
}
</script>

<style lang="scss" scoped>
    .main{
        width: 100%;
        padding-top: 2rem;
        position: relative;
        img{
            display: block;
            width: 2.13rem;
            margin: 0 auto;
            margin-bottom: 1.45rem;
        }
        .login_ipt{
            width: 6rem;
            margin: 0 auto;
            .phone{
                width: 100%;
                height: 0.55rem;
                overflow: hidden;
                border-bottom: 1px solid #cfcfcf;
                img{
                    display: block;
                    width: 0.27rem;
                    float: left;
                    margin: 0.1rem 0.4rem 0 0.33rem;
                }
                input{
                    display: block;
                    width: 5rem;
                    height: 0.55rem;
                    font-size: 0.3rem;
                    color: #333333;
                    float: left;
                    border: 0;
                    outline: none;
                    background: #f8f8f8;
                }
            }
            .pass{
                width: 100%;
                height: 0.55rem;
                overflow: hidden;
                border-bottom: 1px solid #cfcfcf;
                margin-top: 0.65rem;
                margin-bottom: 0.6rem;
                img{
                    display: block;
                    width: 0.27rem;
                    float: left;
                    margin: 0.1rem 0.4rem 0 0.33rem;
                }
                input{
                    display: block;
                    width: 5rem;
                    height: 0.55rem;
                    font-size: 0.3rem;
                    color: #333333;
                    float: left;
                    border: 0;
                    outline: none;
                    background: #f8f8f8;
                }
            }
        }
        .go_other{
            width: 5.6rem;
            height: 0.7rem;
            line-height: 0.7rem;
            margin: 0 auto;
            overflow: hidden;
            font-size: 0.3rem;
            color: #353535;
            span{
                float: left;
            }
            i{
                float: right;
            }
        }

        .login{
           width: 6rem;
            height: 0.8rem;
            background-color: #ff8043;
            color: #fff;
            border-radius: 20px;
            position: absolute;
            top:11rem;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            font-size:.36rem;
        }
        .wx_login{
            width: 6rem;
            height: 0.9rem;
            margin: 0 auto;
            background: #6cc130;
            font-size: 0.36rem;
            color: white;
            line-height: 0.9rem;
            text-align: center;
            border-radius: 0.45rem;
            margin-top: 0.38rem;
        }
    }
</style>
