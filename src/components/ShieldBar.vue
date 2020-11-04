<template>
  <VueDragResize
    class="shield-bar"
    :isActive="true"
    :w="200"
    :h="200"
    v-on:resizing="resize"
    v-on:dragging="resize"
  >
    <p>{{ top }} х {{ left }}</p>
    <p>{{ width }} х {{ height }}</p>
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
      top: 0,
      left: 0
    };
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
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
