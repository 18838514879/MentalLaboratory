<template>
	<div class="solo">
         <div class="header clearfix">
            <div href="#" class="r_back" @click="back()"><img src="../../../static/images/h_return.png" alt=""></div>
            {{mgs}}
        </div>
        <ul class="solo-list">
            <li v-for="item in items" :key="item.id" class="solo-list-li" @click="soloGo(item.id,item.remark)">
                <span class="item-icon">
                    <i class="fa fa-folder" aria-hidden="true"></i>
			    </span>
				<p class="solo-p">{{ item.title }}</p>
                <div class="solo_er clearfix">
                    <span class="footer-list-li">
                        {{ item.paperTypesName }}
                    </span>
                    <span class="footer-list-li">
                        题数：{{ item.paperNumbers }}
                    </span>
                    <span class="footer-list-li">
                        奖励：{{ item.points }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

	export default {

  		data () {
		    return {
                  mgs: '',
		      	items: [
                    // {id:1,status:'11',points:222,paperTypesName:"当时的是",title:'哈哈1'},
                ],
		    }
        },
        mounted () {
            this.jiekou();
        },
        methods:{
            back () {
                this.$router.push({path:'/test'});
            },
            soloGo (paperId,remark) {
                if(remark != "1"){
                this.$router.push({path:'/StartAnswers?paperId='+paperId+ '&modeId='+this.$route.query.modeId})
                }else{
                     this.$Toast("您已经答过题了,请答下套题");
                }
            },
            jiekou () {
                 console.log('created');
            this.axios(
            {
            method:"get",
            url:this.$baseurl +"/api/answer/getPaperList",
            headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
            params:{
                },
            }) .then( res => {
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
                this.items = res.data.data.list.list;
               

              }else{
                this.$Toast({
                  message: res.data.msg,
                  position: 'bottom'
                });
              }
                console.log(res);
            }).catch( err => {
              console.log(err);
         });
            }
        },
	}
</script>
<style lang="scss" scoped>
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
    .solo-list{
        font-size:.3rem;
        margin-top: 1rem;
    }
	.item-icon{
        font-size: .3rem;
        color: #9e9e9e;
        display: inline-block;
        margin-left: .24rem;
    }
    .solo-list-li{
        width: 100%;
        height: 1.96rem;
        background: #ffffff;
        box-shadow: 0px 3px 2px 0px
        rgba(3, 2, 2, 0.05);
        margin-bottom:.12rem;
    }
    .solo-p{
        font-size: .30rem;
    	display:inline-block;
    	margin-left: .24rem;
    	padding-top: .37rem;
    	padding-bottom: .40rem;
    }
    .solo_er{
        padding-left:.24rem;
    }
    .footer-list-li span:first-child{
    	margin-left: .24rem;
    }
    .footer-list-li {
    	/*width: 0.90rem;*/
    	width: 27.1%;
		height: 0.52rem;
    	display:block;
        float: left;
        background-color: #ffffff;
        border: solid 1px #2083d1;
        font-size: 13px;
        line-height: .52rem;
        color: #2083d1;
        text-align: center;
        margin-right: .28rem;
        border-radius: .30rem;
    }
</style>
