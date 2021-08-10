<template>
  <div>
    <div id="box" style="width:100%;height:300px"></div>
  </div>
</template>

<script>
import { getLocation } from '@/util/location'

export default {
  mounted () {
    getLocation('box', data => {
      console.log(data.replace('市', ''))
    })
  }
}
</script>
