<template>
  <VueDragResize
    class="shield-bar"
    :isActive="true"
    :parentLimitation="true"
    :w="400"
    :h="50"
    v-on:resizing="resize"
    v-on:dragging="resize"
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
<style>
.shield-bar {
  background-color: #222;
}
</style>
