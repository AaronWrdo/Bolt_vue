<template>
  <div class="subtitle scroll">
    <div v-for="(item, index) in subtitles" :key="index">
      <SubtitleLine
        :item="item"
        :index="index"
        :curPlaySecs="curPlaySecs"
        :subtitlesNum="subtitles.length"
        :remarks="remarks"
        @start-play-from="onPlay"
        @mark-line="onMark"
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
    remarks: {
      type: Array
    },
    curPlaySecs: {
      type: Number
    }
  },
  methods: {
    onPlay(from) {
      this.$emit("start-play-from", from);
    },
    onMark(line) {
      this.$emit("mark-line", line);
    }
  }
};
</script>
<style>
.scroll {
  overflow: auto;
}
</style>
