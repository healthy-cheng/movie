<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller ref="cityListScroll" v-else>
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clerafix">
              <li v-for="item in hotList" :key="item.id">{{item.name}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="itemList.id">
                  {{itemList.nm}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">
          {{item.index}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    }
  },
  mounted () {
    this.axios({
      url: 'https://m.maizuo.com/gateway?k=7805515',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16272671595768136783560705"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      var msg = res.data.msg
      if (msg === 'ok') {
        var cities = res.data.data.cities
        var { cityList, hotList } = this.formatCityList(cities)
        this.cityList = cityList
        this.hotList = hotList
        this.isLoading = false
      }
    })
  },
  methods: {
    formatCityList (cities) {
      var cityList = []
      var hotList = []
      for (var k = 0; k < cities.length; k++) {
        if (cities[k].isHot === 1) {
          hotList.push(cities[k])
        }
      }
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].pinyin.substring(0, 1).toUpperCase()
        if (toCom(firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].name, id: cities[i].cityId }]
          })
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({
                nm: cities[i].name,
                id: cities[i].cityId
              })
            }
          }
        }
      }
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })
      function toCom (firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true
      }
      return {
        cityList,
        hotList
      }
    },
    handleToIndex (index) {
      var h2 = this.$refs.sort.getElementsByTagName('h2')
      // this.$refs.sort.parentNode.scrollTop = h2[index].offsetTop
      this.$refs.cityListScroll.toScrollTop(-h2[index].offsetTop)
    }
  }
}
</script>

<style lang="scss" scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.city_body .city_sort {
  margin-top: 100px;
}
.city_body .city_sort div {
  margin-top: 10px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
}
.city_body .city_index {
  position: fixed;
  top: 25%;
  right: 0;
  font-size: 13px;
  max-height: 100%;
  background-color: #fff;
  justify-content: center;
}
.city_body .city_index ul {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px solid #e6e6e6;
}
</style>
