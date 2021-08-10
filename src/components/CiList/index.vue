<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <Scroller v-else >
    <ul>
      <li v-for="data in cinemaList" :key="data.cinemaId">
        <div>
          <span>{{data.name}}</span>
          <span class="q"><span class="price">{{data.lowPrice/100}}</span>·元起</span>
        </div>
        <div class="address">
          <span>{{data.address}}</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
    </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'CiList',
  data() {
    return {
      cinemaList: [],
      isLoading: true
    }
  },
  mounted () {
    this.axios({
      url:
        'https://m.maizuo.com/gateway?cityId=320300&ticketFlag=1&k=779128',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16279570466301769290219521","bc":"320300"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      var msg = res.data.msg
      if (msg === 'ok') {
        this.cinemaList = res.data.data.cinemas
        this.isLoading = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body ul li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
  float: right;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  margin-left: 1px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #e6aa05;
  border: 2px solid #f0cc05;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
