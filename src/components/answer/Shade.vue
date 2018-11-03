<template>
    <div class="shade">
        <div class="header clearfix">
            <a><img src="../../../static/images/h_return.png" alt=""></a>
            {{ mgs }}
        </div>
        <div class="shade_h">
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
        mgs: '标题'
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
    .Shade{
        position: relative;
    }
    .header{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size:0.4rem;
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
    .shade_h{
        width: 100%;
        height: 20rem;
        background-color:#000000;
        opacity: 0.42;
        z-index: 100;
    }
    
</style>
