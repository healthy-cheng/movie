<template>
	<footer id="footer">
		<ul>
			<router-link tag="li" to="/movie">
			<i class="iconfont icon-dianying"></i>
			<p>电影</p>
			</router-link>
			<router-link tag="li" to="/cinema">
			<i class="iconfont icon-dianyingpiao"></i>
			<p>影院</p>
			</router-link>
			<router-link tag="li" to="/mine">
			<i class="iconfont icon-wode"></i>
			<p>我的</p>
			</router-link>
		</ul>
	</footer>
</template>

<script>
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0px;
  left: 0px;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 50px;
  align-items: center;
}
#footer ul li {
  flex: 1;
  line-height: 25px;
}
#footer ul li.active {
  color: red;
}
#footer ul li.router-link-active {
  color: red;
}
#footer ul i {
  font-size: 20px;
}
#footer ul p {
  font-size: 12px;
  line-height: 18px;
}
</style>
