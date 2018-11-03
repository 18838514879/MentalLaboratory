<template>
    <div class="mine">
       <div class="header clearfix"><a><img  @click="back()" src="../../../static/images/h_return.png" alt=""></a>{{mgs}}</div>
       <div class="box">
           <textarea name="content" class="magess" v-model="contents" placeholder="写下您对我们想说的话" id="content"></textarea>
           <div class="text_num">0/500</div>
          <input type="telephone" class="tel" maxlength="11" v-model="phones" placeholder="留下你的电话，以便我们为您更好的解决问题 ">
          <button @click="submit()">提交</button>
       </div>


    </div>
</template>
<script>

export default {
  data() {
    return {
          mgs:'意见与反馈',
          contents:'',
          phones:'',
    };
  },
  created () {

        },
        watch:{
            //  phones: function() {
            // this.phones = this.phones.replace(/\D/g, "");
            // }
        },
       methods: {
            back () {
                history.back();
            },
            submit () {
            var that=this;
             if(this.phones == ''){
                this.$Toast({
                    message: '手机号不能为空',
                    position: 'bottom'
                });
                return;
            }
             var phone=/^1[34578]\d{9}$/;
            if(!phone.test(this.phones)){
                this.$Toast({
                    message: '手机号格式错误',
                    position: 'bottom'
                });
                return;
            };
              this.$Toast({
                    message: '提交成功',
                    position: 'bottom'
                });
            console.log('created');
            var thisCommentId = sessionStorage.getItem('cld_id');
            this.axios({
                method:"post",
                url:this.$baseurl + "/api/member/saveOpinion",
                headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
                    params:{
                            commentId:thisCommentId,
                        }
            }).then( res => {
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
                this.$router.go(-1);
              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }

                        }).catch( err => {
                            console.log(err);
                        })

                }
             }
       }


</script>
<style lang="scss" scoped>
.mine{
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
        .box{
            padding-top: 0.3rem;
            padding-left: 0.24rem;
            padding-right: 0.24rem;
            box-sizing: border-box;
          -webkit-box-sizing: border-box;
           font-size: 0.32rem;
           color:#9c9c9c;
            position: relative;
             .magess{
             width: 100%;
             height: 3.86rem;
             border-radius: 10px;
             background-color: #fff;
             outline: none;
             padding-top: 0.3rem;
             padding-left: 0.3rem;
             box-sizing: border-box;
            -webkit-box-sizing: border-box;
            color: #9c9c9c;
            }
            .text_num{
                position: absolute;
                right: 0.5rem;
                bottom: 1.4rem;
            }
            .tel{
                margin-top: 0.16rem;
                width: 100%;
                height: 0.9rem;
                border-radius: 5px;
                background-color: #fff;
                outline: none;
                 padding-left: 0.3rem;
                 box-sizing: border-box;
                -webkit-box-sizing: border-box;
            }
            .tel::-webkit-input-placeholder{
                color: #9c9c9c;
                }
                button{
                    width: 6rem;
                    height: 0.8rem;
                    background-color: #2083d1;
                    color:#fff;
                    border-radius: 20px;
                    position: fixed;
                    left: 50%;
                    margin-left: -3rem;
                    bottom: 0.2rem;
                }
        }
}

</style>
