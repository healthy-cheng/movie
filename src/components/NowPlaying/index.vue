<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="data in moviList" :key="data.filmId">
          <div class="pic_show">
            <img :src="data.poster" alt="图片">
          </div>
          <div class="info_list">
            <span class="h2">{{data.name}}</span>
            <span class="bq">{{data.filmType.name}}</span>
            <p>观众评分:<span class="grade">{{data.grade}}</span></p>
            <p>主演：{{data.actors | actorfilter}}</p>
            <p>今天55家影院放映607场</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>
<script>
import Vue from 'vue'
import { setTimeout } from 'timers'
Vue.filter('actorfilter', function(data) {
  var newlist = data.map(item => item.name)
  return newlist.join(' ')
})
export default {
  data () {
    return {
      moviList: [],
      pullDownMsg: '',
      isLoading: true
    }
  },
  mounted () {
    this.axios({
      url:
        'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8273421',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16273680225835872712785921","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      var msg = res.data.msg
      if (msg === 'ok') {
        this.moviList = res.data.data.films
        this.isLoading = false
      }
    })
  },
  methods: {
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '正在更新中'
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios({
          url:
            'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8273421',
          headers: {
            'X-Client-Info':
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"16273680225835872712785921","bc":"310100"}',
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res => {
          var msg = res.data.msg
          if (msg === 'ok') {
            this.pullDownMsg = '更新成功！'
            setTimeout(() => {
              this.moviList = res.data.data.films
              this.pullDownMsg = ''
            }, 1000)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#content .movie_body {
  float: 1;
  overflow: auto;
  position: relative;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
}
.movie_body .pullDown{
  margin: 0;
  padding: 0;
  border: none;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list .h2 {
  font-size: 17px;
  height: 24px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
}
.movie_body .info_list .bq {
  font-size: 9px;
  height: 17px;
  line-height: 17px;
  color: #fff;
  background-color: #d2d6dc;
  margin: 0 2px 4px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  border-color: red;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_mall {
  background-color: #3c9fe6;
}
</style>
