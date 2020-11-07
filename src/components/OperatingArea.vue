<template>
  <div
    class="operating-area"
    @mousewheel="scrollHandler"
    @DOMMouseScroll="scrollHandler"
    @click="onClick"
    @dblclick="onDoubleClick"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "OperatingArea",
  data() {
    return {
      timer: null
    };
  },
  props: {
    scrollHandler: {
      type: Function
    },
    onMark: {
      type: Function
    },
    onPlayOrPause: {
      type: Function
    }
  },
  methods: {
    onClick() {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = window.setTimeout(this.onPlayOrPause, 300);
    },
    onDoubleClick() {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
      this.onMark();
    }
  }
};
</script>
<style lang="less">
.operating-area {
  //   visibility: hidden;
  //   border: 3px burlywood dashed;
  //   border-radius: 50%;
  //   &:hover {
  //     background-color: burlywood;
  //   }
  //   & > * {
  //     width: 100%;
  //     height: 100%;
  //   }
}
</style>
