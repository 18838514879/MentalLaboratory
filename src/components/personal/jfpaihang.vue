<template>
	<div class="ranking-list">
		<div class="header clearfix">
            <a @click="back"><img src="../../../static/images/h_return.png" alt=""></a>
            <span style="margin-right:.45rem;">{{mgs}}</span>
        </div>
		<div class="ranking-button">
			<button>积分排行</button>
		</div>
		<div class="ranking-li" style="overflow: hidden;">
			<ul>
				<li class="ranking_list_li speal clearfix"  >
					<img :src="imgUrl" class="ranking-li-img">
					<span class="ranking-li-text">{{ nickname }}</span>
					<span class="paiming1">我的积分:{{ points }}积分</span>
					<span class="ranking-li-mine">当前排名</span>
					<span class="ranking-li-num">{{ ranking }}</span>
				</li>

				<li class="ranking_list_li clearfix"  v-for="ranking in rankings" :key="ranking.id">
					<img :src="ranking.imgUrl" class="ranking-li-img">
					<span class="ranking-li-text" v-if="ranking.nickname==null">匿名网友</span>
					<span class="ranking-li-text" v-if="ranking.nickname!=null">{{ ranking.nickname }}</span>
					<span class="paiming1">总积分:{{ ranking.points }}积分</span>
					<span class="ranking-li-num">{{ ranking.ranking }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'Ranking',
  		data () {
		    return {
				mgs: '排行榜',
				imgUrl:'',
				nickname:'',
				ranking:'',
				points:'',
				// show:true,
		      	rankings: [
		      		// {id:1, text:"丰田宝来", img:"当时", num: 102},
		      		// {id:2, text:"丰田宝来", img:"当时", num: 102},
		      		// {id:3, text:"丰田宝来", img:"当时", num: 102},
		      		// {id:4, text:"丰田宝来", img:"当时", num: 102},
		      		// {id:5, text:"丰田宝来", img:"当时", num: 102},
		      		// {id:6, text:"丰田宝来", img:"当时", num: 102}
		      	]
		    }
		  },
		  mounted () {
			  this.jifen();
		  },
		methods: {
            
			back () {
				this.$router.go(-1);
			},
			jifen () {
			//获取连胜排行榜数据接口
				this.axios({
					method:"get",
					url:this.$baseurl + "/api/member/getPointsRanking",
					headers:{token:localStorage.getItem('token'),"Content-Type": "application/x-www-form-urlencoded"},
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
                    	console.log(res);
                    if(res.data.data.list.imgUrl==null){
                    	this.rankings.imgUrl='';
                    }
                    if(res.data.data.member.imgUrl==null){
                    	this.imgUrl='';
                    }else{
                    	this.imgUrl=res.data.data.member.imgUrl;
                    }if(res.data.data.member.nickname == null){
						this.nickname = '匿名网友'
					}else{
						this.nickname=res.data.data.member.nickname;
					}
						this.rankings = res.data.data.list;
						// this.nickname=res.data.data.member.nickname;
						this.points=res.data.data.member.points;
						this.ranking=res.data.data.member.ranking;
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
		},

	}

</script>

<style lang="scss" scoped>
	li:first-child .ranking-li-num{
		background-color: #ff8043;
		border: solid 2px #f05e18;
		color: #ffffff;
	}
	li:nth-child(2) .ranking-li-num{
		background-color: #ffd24a;
		border: solid 2px #fbc10a;
		color: #ffffff;
	}
	li:nth-child(3) .ranking-li-num{
		background-color: #c7c7c7;
		border: solid 2px #919191;
		color: #ffffff;
	}
	li:nth-child(4) .ranking-li-num{
		background-color: #e2a570;
		border: solid 2px #d57623;
		color: #ffffff;
	}
	.header{
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.36rem;
        background-color: #2083d1;
        color:#fff;
        text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
        z-index: 2;
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
	.ranking-list-text{
    	width: 100%;
    	height: .88rem;
    	background-color: #2083d1;
      	margin-bottom: -.88rem;
    }
	.ranking-list-text p{
		font-family: SourceHanSansCN-Regular;
		font-size: .36rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.88em;
		letter-spacing: 0px;
		color: #ffffff;
		text-align: center;
		padding-top: .26rem;
  }
  .ranking-li-mine{
    font-size:.3rem;
    color: #b9b9b9;
  }
	.ranking-button{
		display: flex;
		justify-content:center;
		text-align: center;
		margin-bottom: .44rem;
		// margin-top:.44rem;
		margin-top: 1.35rem;
	}
	.ranking-button button{
    	font-size:.3rem;
		width: 5.99rem;
		height: .89rem;
		background-color: #ffffff;
		border:solid 1px #2782d7;
	}
	.ranking-button button:first-child{
		border-top-left-radius: 2em;
    	border-bottom-left-radius: 2em;
	}
	.ranking-button button:last-child{
		border-top-right-radius: 2em;
     	border-bottom-right-radius: 2em;
	}
	.ranking_list_li{
		width: 100%;
		height: 1.57rem;
    	line-height: 0.21rem;
    	padding-left: .27rem;
		padding-right: .27rem;
		 box-sizing: border-box;
        -webkit-box-sizing: border-box;
		position: relative;
	}
	.speal{
		 background-color: #f2f2f2;
		 border-top: solid 1px #fbc10a;
		 border-bottom: solid 1px #fbc10a;

	}
	.ranking-li-img{
		display: block;
		border-radius:50%;
		width: 1.17rem;
		height: 1.17rem;
		line-height: 1.14rem;
		border: solid 2px #ff8043;
		text-align: center;
		font-size:.3rem;
		margin-top: .15rem;
		float: left;
	}
	.ranking-li-text{
		width: 1.5rem;
		font-family: SourceHanSansCN-Medium;
		font-size: .30rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: .35rem;
		letter-spacing: 0px;
		color: #000000;
		font-weight: 800;
		float: left;
		margin-left: .4rem;
		margin-top: .45rem;
		overflow: hidden; 
		white-space: nowrap; 
		text-overflow: ellipsis; 
	}
	.ranking-li-jifen{
		font-size: .14rem;
	}
	.paiming2{
        display: none;
	}
	.paiming1{
		display: block;
        font-family: SourceHanSansCN-Medium;
		font-size: .24rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: .21rem;
		letter-spacing: 0px;
		color: #7f7f7f;
		position: absolute;
		top: 1rem;
		left: 1.85rem;
	}
	.ranking-li-mine{
		float: left;
		margin-left: 1.4rem;
		margin-top: .65rem;

	}
	.ranking-li-num{
		display: block;
		width: .60rem;
		height: .60rem;
		background-color: #c4c4c4;
		border: solid 2px #939393;
		font-size: .24rem;
		color: #000000;
		border-radius: 50%;
		text-align: center;
		line-height: .60rem;
		float: right;
		margin-top: .45rem;
	}
</style>
