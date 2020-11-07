<template>
  <VueDragResize
    class="shield-bar"
    :isActive="true"
    :parentLimitation="false"
    :w="400"
    :h="50"
    v-on:resizing="resize"
    v-on:dragging="resize"
    @click.stop
  >
  </VueDragResize>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  name: "ShieldBar",
  components: {
    VueDragResize
  },
  data() {
    return {
      width: 0,
      height: 0,
      bottom: 0,
      left: 0
    };
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.bottom = newRect.bottom;
      this.left = newRect.left;
    }
  }
};
</script>
<style lang="less">
.shield-bar {
  background-color: #222;
  border-radius: 10px;
  &:hover {
    background-color: #333;
  }
}
</style>
