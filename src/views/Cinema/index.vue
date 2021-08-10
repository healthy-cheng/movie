<template>
    <div id="main">
      <Header title="世成影院"/>
        <div id="content">
          <div class="cinema_menu">
            <div class="city_swith">
                全城<i class="iconfont icon-triangle-down1"></i>
            </div>
            <div class="city_swith">
                品牌<i class="iconfont icon-triangle-down1"></i>
            </div>
            <div class="city_swith">
                特色<i class="iconfont icon-triangle-down1"></i>
            </div>
          </div>
          <CiList />
        </div>
      <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import CiList from '@/components/CiList'

export default {
  components: {
    Header,
    TabBar,
    CiList
  }
}
</script>

<style scoped>
#main{
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
}
#content{
  position: relative;
}
#content .cinema_menu{
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
</style>
