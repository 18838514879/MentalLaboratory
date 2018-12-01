import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/register/register'
import about from '@/components/about/about'
import personal from '@/components/personal/personal'
import news from '@/components/new/new'
import test from '@/components/test/test'
import help from '@/components/test/help'
import myIntegral from '@/components/personal/myIntegral'
import myAchievement from '@/components/personal/myAchievement'
import mySet from '@/components/personal/mySet'
import myAchievementDatil from '@/components/personal/myAchievementDatil'
import myIntegralDatil from '@/components/personal/myIntegralDatil'
import creditsExchange from '@/components/personal/creditsExchange'
import opinion from '@/components/personal/opinion'
import application from '@/components/personal/application'
import password from '@/components/personal/password'
import findPassword from '@/components/personal/findPassword'
import solo from '@/components/personal/SoLo'
import ranking from '@/components/personal/Ranking'
import sumit from '@/components/personal/Sumit'
import DuoOver from '@/components/answer/DuoOver'
import Shade from '@/components/answer/Shade'
import ShadeIntegral from '@/components/answer/ShadeIntegral'
import Achievement from '@/components/answer/Achievement'
import Winning from '@/components/answer/Winning'
import moreAwait from '@/components/test/moreAwait'
import oneOver from '@/components/test/oneOver'
import twoOver from '@/components/test/twoOver'
import SubmitAnswer from '@/components/test/SubmitAnswer'
// 新闻
import comments from '@/components/journalism/comments'
import discuss from '@/components/journalism/Discuss'
import discusss from '@/components/journalism/Discusss'
import NewsDetails from '@/components/journalism/NewsDetails'
// 研究
import study from '@/components/study/study'
import studyDatil from '@/components/study/studyDatil'
import commentss from '@/components/journalism/commentss'
// dati
import morePersonalStart from '@/components/test/morePersonalStart'
import DianOver from '@/components/test/DianOver'
import onePersonalStart from '@/components/test/onePersonalStart'
import DianOvergm from '@/components/test/DianOvergm'
import StartAnswers from '@/components/test/StartAnswers'
import Multiplayere from '@/components/about/Multiplayere'
import reply from '@/components/journalism/reply'
import replys from '@/components/journalism/replys'
// 测试
import ceshi from '@/components/about/ceshi'


Vue.use(Router)

export default new Router({
  routes: [
    // 登录
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 我的
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/new',
      name: 'new',
      component: news,
      meta: {
        keepAlive: true
        },
    },

    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/myIntegral',
      name: 'myIntegral',
      component: myIntegral
    },
    {
      path: '/myAchievement',
      name: 'myAchievement',
      component: myAchievement
    },
    {
      path: '/mySet',
      name: 'mySet',
      component: mySet
    },
    {
      path: '/myAchievementDatil',
      name: 'myAchievementDatil',
      component: myAchievementDatil
    },
    {
      path: '/myIntegralDatil',
      name: 'myIntegralDatil',
      component: myIntegralDatil
    },
    {
      path: '/creditsExchange',
      name: 'creditsExchange',
      component: creditsExchange
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: opinion
    },
    {
      path: '/application',
      name: 'application',
      component: application
    },
    {
      path: '/password',
      name: 'password',
      component: password
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: findPassword
    },
    // 答题
    {
      path: '/SubmitAnswer',
      name: 'SubmitAnswer',
      component: SubmitAnswer
    },
    {
      path: '/twoOver',
      name: 'twoOver',
      component: twoOver
    },
    {
      path: '/oneOver',
      name: 'oneOver',
      component: oneOver
    },
    {
      path: '/moreAwait',
      name: 'moreAwait',
      component: moreAwait
    },
    {
      path: '/solo',
      name: 'solo',
      component: solo
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/sumit',
      name: 'sumit',
      component: sumit
    },  
    {
      path: '/DuoOver',
      name: 'DuoOver',
      component: DuoOver
    },
    {
      path: '/Shade',
      name: 'Shade',
      component: Shade
    },
    {
      path: '/ShadeIntegral',
      name: 'ShadeIntegral',
      component: ShadeIntegral
    },
    {
      path: '/Achievement',
      name: 'Achievement',
      component: Achievement
    },
    {
      path: '/Winning',
      name: 'Winning',
      component: Winning
    },
    // 新闻
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: discuss
    },
    {
      path: '/discusss',
      name: 'discusss',
      component: discusss
    },
    {
      path: '/Newsdetails',
      name: 'Newsdetails',
      component: NewsDetails,
    },
    // 研究
    {
      path: '/study',
      name: 'study',
      component: study,
      meta: {
        keepAlive: true
        },
    },
    
    {
      path: '/studyDatil',
      name: 'studyDatil',
      component: studyDatil
    },
    //研究评论
    {
      path: '/commentss',
      name: 'commentss',
      component: commentss
    },
    {
      path: '/morePersonalStart',
      name: 'morePersonalStart',
      component: morePersonalStart
    },
    {
      path: '/DianOver',
      name: 'DianOver',
      component: DianOver
    },
    {
      path: '/onePersonalStart',
      name: 'onePersonalStart',
      component: onePersonalStart
    },
    {
      path: '/DianOvergm',
      name: 'DianOvergm',
      component: DianOvergm
    },
    {
      path: '/StartAnswers',
      name: 'StartAnswers',
      component: StartAnswers
    },
    {
      path: '/Multiplayere',
      name: 'Multiplayere',
      component: Multiplayere
    },
    // 新闻回复
    {
      path: '/reply',
      name: 'reply',
      component: reply
    },
    {
      path: '/replys',
      name: 'replys',
      component: replys
    },
    {
      path: '/ceshi',
      name:'ceshi',
      component: ceshi
    },
    
  ],
     mode: 'history', 

})


