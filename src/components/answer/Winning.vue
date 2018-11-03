<template>
  <div class="integral">
    <shadeintegral></shadeintegral>
    <img class="shade_img" src="../../assets/liansheng.png" alt="">
    <p class="shade_txet">获得8点积分</p>
  </div>
</template>

<script>
import shadeintegral from './Shade'
export default {
  data() {
    return {

    }
  },
  components: {
    shadeintegral
  }
}
</script>

<style scoped lang="scss">
    .shade_img{
        position: absolute;
        z-index: 101;
        top: 30%;
        left: 59%;
        margin-left: -3.25rem;
        width: 5.17rem;
	      height: 3.43rem;
    }
    .shade_txet{
        position: absolute;
        height: .63rem;
        font-family: MicrosoftYaHei;
        font-size: .64rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #ffffff;
        top: 60%;
        left: 27%;
    }
</style>
