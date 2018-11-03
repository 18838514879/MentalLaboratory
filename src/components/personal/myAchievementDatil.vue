<template>
    <div class="mine">
     <div class="header clearfix"><a @click="back()"><img src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
        <div class="achieve_fir"  v-for="ranking in rankings" :key="ranking.id" v-if="ranking.id == ids">
            <img src="../../../static/images/achievement_1.png" alt="">
            <p class="achieve_name">{{ranking.title}}</p>
            <p class="achieve_datil">{{ranking.conditions}}</p>
            </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
        mgs:'我的成就详情',
        rankings:[
            // {id:1,title:'11111',conditions:'1111111221'},
            // {id:2,title:'22222',conditions:'1111111222'},
            // {id:3,title:'33333',conditions:'1111111223'},
            // {id:4,title:'55555',conditions:'1111111225'}
         ],
         ids:'',
    };
  },
  methods: {
      back () {
         this.$router.go(-1);
      },
      jiekou () {
          var that = this;
          this.axios({
          method:"get",
            url:this.$baseurl + "/api/member/getAchievementList",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                   page:1,
                   limit:100,
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
              that.rankings=res.data.data.list;
              that.ids = that.$route.query.id;
            }else{
              this.$Toast({
                message: res.data.msg,
                position: 'bottom'
              });
            }


       }).catch(err => {
         console.log(err);
       });
      }
  },
  mounted() {
    this.jiekou ();
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

     .achieve_fir{
            font-size: 0.25rem;
            text-align: center;
            margin-top: 0.5rem;
            padding-top: 0.88rem;
             box-sizing: border-box;
      -webkit-box-sizing: border-box;
            img{
                width: 0.56rem;
                height: 0.56rem;
            }
            .achieve_name{
                margin-top: 0.30rem;
                margin-bottom: 0.25rem;
            }
            .achieve_datil{
                padding-left: 0.32rem;
                padding-right: 0.38rem;
                 box-sizing: border-box;
          -webkit-box-sizing: border-box;
                font-size: 0.2rem;
                text-align: left;
            }
        }
}

</style>
