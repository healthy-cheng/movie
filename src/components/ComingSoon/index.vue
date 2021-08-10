<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else >
      <ul>
        <li v-for="data in comList" :key="data.filmId">
          <div class="pic_show">
            <img :src="data.poster" alt="图片">
          </div>
          <div class="info_list">
            <h2>{{data.name}}</h2>
            <p><span class="person">17578</span>人想看</p>
            <p>主演：{{data.actors | actorfilter}}</p>
            <p>{{data.premiereAt | moment}}上映</p>
          </div>
          <div class="btn_pre">
              预售
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
Vue.filter('moment', function(value, formatString) {
  value = value * 1000
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})
Vue.filter('actorfilter', function(data) {
  var newlist = data.map(item => item.name)
  return newlist.join(' ')
})
export default {
  data() {
    return {
      comList: [],
      isLoading: true
    }
  },
  mounted () {
    this.axios({
      url:
        'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=2006675',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16278699626244775074201601","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      var msg = res.data.msg
      if (msg === 'ok') {
        this.comList = res.data.data.films
        this.isLoading = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#content .movie_body {
  float: 1;
  overflow: auto;
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
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.movie_body .info_list .person {
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
.movie_body .btn_pre {
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
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
