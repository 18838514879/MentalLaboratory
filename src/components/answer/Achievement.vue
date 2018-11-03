<template>
  <div class="integral">
    <shadeintegral></shadeintegral>
    <img class="shade_img" src="../../assets/chengjiu.png" alt="">
    <p class="shade_txet">成就</p>
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
        left: 76%;
        margin-left: -3.25rem;
        width: 2.69rem;
	      height: 2.89rem;
    }
    .shade_txet{
        position: absolute;
        width: 2.56rem;
        height: .63rem;
        font-family: MicrosoftYaHei;
        font-size: .64rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: .21rem;
        letter-spacing: 0px;
        color: #ffffff;
        top: 58%;
        left: 42%;
    }
</style>
