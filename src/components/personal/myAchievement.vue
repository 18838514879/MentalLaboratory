<template>
    <div class="mine">
<div class="header clearfix"><a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
        <ul class="achievement clearfix">
            <li class="achieve_fir" v-for="ranking in rankings" :key="ranking.id"  @click="achievementName(ranking.id)" >
                <img :src="src" alt="">
                <p class="achieve_name">{{ranking.title}}</p>
                <p class="achieve_datil">{{achieve_datil}}</p>
            </li>
        </ul>

        <!-- <ul class="achievement clearfix">
            <li class="achieve_fir"><img src="../../../static/images/achievement_1.png" alt=""><p class="achieve_name">成就名称</p><p class="achieve_datil">规则明细</p></li>
            <li class="achieve_fir"><img src="../../../static/images/achievement_1.png" alt=""><p class="achieve_name">成就名称</p><p class="achieve_datil">规则明细</p></li>
            <li class="achieve_fir"><img src="../../../static/images/achievement_1.png" alt=""><p class="achieve_name">成就名称</p><p class="achieve_datil">规则明细</p></li>
            <li class="achieve_fir"><img src="../../../static/images/achievement_1.png" alt=""><p class="achieve_name">成就名称</p><p class="achieve_datil">规则明细</p></li>
        </ul> -->

    </div>
</template>
<script>

export default {
  data() {
    return {
        mgs:'我的成就',
        src:'../static/images/achievement_1.png',
        achieve_datil:'规则明细',
        	rankings: [

		      	]
        };
  },
   created() {
            console.log("created"),
            //获取用户成就接口
            this.axios({
                method:"get",
                url:this.$baseurl + "/api/member/getAchievementList",
                headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            }).then((res)=>{//成功
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
                this.rankings=res.data.data.list;
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }

            }).catch(err => {//失败
                console.log(err);
            });

        },
  methods: {
            // 返回上一页
			back () {
				this.$router.go(-1);
            },
            // 跳转成就详情
            achievementName (id) {
                this.$router.push({path: '/myAchievementDatil?id='+id})
            }
        },


};
</script>
<style lang="scss" scoped>
.mine{
    width: 100%;
    height: 100%;
    background-color: #fff;
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
    .achievement{
        width: 100%;
        height: 2.45rem;
        padding-top: 0.88rem;
        padding-left: 0.57rem;
        padding-right: 0.57rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        li{
            float: left;
            width: 25%;
            font-size: 0.25rem;
            text-align: center;
            margin-top: .7rem;
            img{
                width: 0.56rem;
                height: 0.56rem;
            }
            .achieve_name{
                margin-top: 0.30rem;
                margin-bottom: 0.25rem;
            }
        }
    }

}

</style>
