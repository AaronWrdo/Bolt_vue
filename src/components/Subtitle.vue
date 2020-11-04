<template>
  <div class="subtitle scroll">
    <div v-for="(item, index) in subtitles" :key="index">
      <SubtitleLine
        :item="item"
        :index="index"
        :curPlaySecs="curPlaySecs"
        :subtitlesNum="subtitles.length"
        @start-play-from="onPlay"
      />
    </div>
  </div>
</template>
<script>
import SubtitleLine from "./SubtitleLine.vue";
export default {
  name: "subtitle",
  components: {
    SubtitleLine
  },
  props: {
    subtitles: {
      type: Array
    },
    curPlaySecs: {
      type: Number
    }
  },
  methods: {
    onPlay(from) {
      this.$emit("start-play-from", from);
    }
  }
};
</script>
<style>
.scroll {
  overflow: auto;
}
</style>
