<template>
    <div class="mine">
        <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
       <div class="conten" v-html="helps">
           {{helps}}
       </div>
    </div>
</template>
<script>
 export default {
    data () {
      return {
        mgs:'帮助',
        helps:'',
      }
    },
    mounted:function () { },
    computed:{ },
    watch:{ },
    methods: {
        back () {
            this.$router.go(-1);
        }
    },

    created () {
        this.axios.get(this.$baseurl + '/api/answer/getHelp/'+this.$route.query.modeId,
        {
            params: {
                token: localStorage.getItem("token"),
                modeId: this.$route.query.modeId,
            }
        }).then( res => {
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
            console.log(res.data)
            this.helps=res.data.data.helps
          }else{
            this.$Toast({
              message: res.data.msg,
              position: 'bottom'
            });
          }

        }).catch( err => {
            console.log(err)
        })
    },
 }

</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;

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
  .conten{
      margin-top: 1.28rem;
      background-color:#f2f2f2;
      padding-left: 0.24rem;
      padding-right: 0.24rem;
      padding-top: 0.5rem;
      box-sizing:border-box;
     -webkit-box-sizing: border-box;
      font-size: 0.2rem;
      color: #8b8b8b;
      text-indent: 2em;
      word-break: break-all;


  }


}
</style>
