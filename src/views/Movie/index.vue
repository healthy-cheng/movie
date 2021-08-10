<template>
    <div id="main">
       <Header title="世成电影"/>
       <div id="content">
           <div class="movie_menu">
                <router-link tag="div" to="/movie/city" class="city_name">
                    <div id="box" v-show="false"></div>
                    <span>{{city}}</span>
                    <i class="iconfont icon-triangle-down1"></i>
                </router-link>
                <div class="hot_swtich">
                    <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
                    <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
                </div>
                <router-link tag="div" to="/movie/search" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
           </div>
           <keep-alive>
                <router-view />
           </keep-alive>
       </div>
       <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { getLocation } from '@/util/location'

export default {
  data () {
    return {
      city: ''
    }
  },
  mounted () {
    getLocation('box', data => {
      console.log(data.replace('市', ''))
      this.city = data.replace('市', '')
    })
  },
  components: {
    Header,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
#main{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    #content{
        position: relative;
    }
}
#content .movie_menu{
    width: 100%;
    height: 45;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
}
.movie_menu .city_name{
    margin-left: 20px;
    height: 100%;
    line-height: 45px;
}
.movie_menu .city_name.active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .city_name.router-link-active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .hot_swtich{
    display: flex;
    height: 100%;
    line-height: 45px;
}
.movie_menu .hot_item{
    font-size: 15px;
    color: #666;
    width: 80px;
    text-align: center;
    margin: 0 12px;
    font-weight: 700;
}
.movie_menu .hot_item.active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .hot_item.router-link-active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .search_entry{
    margin-right: 20px;
    height: 100%;
    line-height: 45px;
}
.movie_menu .search_entry.active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .search_entry.router-link-active{
    color: red;
    border-bottom: 2px solid red;
}
.movie_menu .search_entry i{
    font-size: 24px;
    color: red;
}
</style>
