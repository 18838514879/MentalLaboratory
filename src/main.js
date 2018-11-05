// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueScroller from 'vue-scroller'
import '../static/js/adaptation.js'
import '../static/js/basil.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import VueTouch from 'vue-touch';
import LyTab from 'ly-tab';
import mui from '../static/js/mui';

Vue.prototype.mui = mui;

Vue.use(LyTab);

Vue.use(VueScroller);

Vue.use(VueRouter);





// import http from '@/util/http'

// import storage from '../src/components/util/storage.js'

// Vue.config.productionTip = false

// Vue.prototype.$http = http

// Vue.prototype.$storage = storage



Vue.prototype.$baseimgurl="http://xinlishiyanshi.hg.jergavin.com/sys/oss/upload";
Vue.prototype.$baseurl="http://xlsys.nansa.nat300.top";
// Vue.prototype.$baseurl="http://192.168.1.69:8081/framework-api";


window.Toast= Toast;
Vue.use(MintUI);
Vue.prototype.$Indicator=Indicator;
Vue.prototype.$Toast=Toast;
// Vue.prototype.$ajax = axios;
Vue.prototype.axios = axios;
var JQ = require('jquery');
Vue.prototype.jq = JQ;


Vue.config.productionTip = false


// var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//路由跳转
Vue.prototype.$jumpRouter=function (routerPath) {
  this.$router.push(routerPath);
}
//路由回退一步
Vue.prototype.$goBack=function () {
  this.$router.go(-1);
}
//时间戳转时间格式
Vue.prototype.$timestampToTime=function(timestamp) {
  var Y,M,D,h,m,s;
  if(Math.floor(timestamp/1000000000000)>0){
      var date = new Date(timestamp);
  }else{
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate() ) + ' ';
  h = (date.getHours()< 10 ? '0'+date.getHours():date.getHours() )+ ':';
  m = (date.getMinutes()< 10 ? '0'+date.getMinutes():date.getMinutes() ) + ':';
  s = (date.getSeconds()< 10 ? '0'+date.getSeconds():date.getSeconds() );
  return Y+M+D+h+m+s;
}
//字符串转  node
Vue.prototype.$strToNode=function(str) {
  var dd = document.createElement("div");
  dd.innerHTML = str;
  return dd;
}

Vue.prototype.$cfAjax1=function () {
  var reqData='';
  if(arguments.length>3){
      for(var i=2;i<arguments.length-1;i+=2){
          if(i==2){
              reqData+='?'+arguments[i]+'='+arguments[i+1];
          }else{
              var m=encodeURI(arguments[i+1]);
              reqData+='&'+arguments[i]+'='+m;
          }
      }
  }
  if(arguments[0]=="post"){

      this.axios.post(this.$baseurl + arguments[1]+reqData)
          .then((response) => {
              arguments[arguments.length-1](response);//callback方法
          })
          .catch((response) => {
          })
  }else{
      this.axios.get(this.$baseurl + arguments[1]+reqData)
          .then((response) => {
              arguments[arguments.length-1](response);//callback方法
          })
          .catch((response) => {
          })
  }

}//通用ajax   第一个参数get or post  第二个 链接  最后一个是回调函数  其他的参数名,参数值
//判断登录
router.beforeEach(function (to, from, next) {
  if (to.meta.auth) {
      //var url = location.href.split('#')[0].toString();
      console.log(from.name);
    //   if (localStorage.getItem('token')) {
    //       next()
    //   } else {
    //       next('/login')
    //   }
  } else {
      next()
  }
})
