<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1,
      scrollbar: {
        fade: true,
        interactive: false
      }
    })
    this.scroll = scroll
    // 如果需要滚动，先刷新滚动视图，就可以在可滚动范围内滚动
    scroll.on('beforeScrollStart', () => {
      scroll.refresh()
    })
    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos)
    })
    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos)
    })
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper{
  overflow: hidden;
  height: 600px;
}
</style>
