<template>
  <!--
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>Bolt</title>
    <link rel="icon"
          href="./logo.svg"
          type="image/x-icon" />
    <link rel="stylesheet"
          href="./css/main.css"
          type="text/css" />
  </head>
  -->
  <div class="container">
    <Nav />
    <Split v-model="split" class="main">
      <div slot="left" class="left-panel">
        <h3 id="title" v-if="this.videoName">{{ this.videoName }}</h3>
        <FilePrompt v-if="videoName.length === 0" />
        <Video
          v-else
          ref="videoRef"
          :source="videoSourceInfo"
          :transcriptsLoaded="subtitles.length > 0"
          :subtitles="subtitles"
          :remarks="remarks"
          :activeTranscriptIndex="activeTranscriptIndex"
          @update-time="playerUpdateTime"
          @mark-line="markLine"
        />
      </div>
      <div slot="right" class="right-panel scroll">
        <FilePrompt v-if="subtitles.length === 0" />
        <Subtitle
          v-else
          :subtitles="subtitles"
          :remarks="remarks"
          :curPlaySecs="currentPlayTime"
          @start-play-from="subtitleStartPlayFrom"
          @mark-line="markLine"
        />
      </div>
    </Split>
    <FileInput @upload-video="updateVideo" @upload-subtitle="updateSubtitle" />
  </div>
</template>
<script>
import Nav from "./Nav.vue";
import Video from "./Video.vue";
import Subtitle from "./Subtitle.vue";
import FilePrompt from "./FilePrompt.vue";
import FileInput from "./FileInput.vue";

export default {
  name: "Hello",
  components: { Nav, Video, Subtitle, FilePrompt, FileInput },
  data() {
    return {
      split: 0.6,
      videoSourceInfo: {
        src: "",
        type: ""
      },
      videoName: "",
      subtitles: [],
      remarks: [],
      currentPlayTime: 0,
      videoRef: {},
      activeTranscriptIndex: 0
    };
  },
  computed: {
    videoPlayer() {
      return this.$refs.videoRef.player;
    }
  },
  methods: {
    updateVideo(video) {
      this.videoSourceInfo = {
        src: video.src,
        type: video.type
      };
      this.videoName = video.name;
      this.markLine = window.localStorage.getItem(`${this.videoName}-remarks`);
    },
    updateSubtitle(subtitles) {
      this.subtitles = subtitles;
    },
    playerUpdateTime(curTime) {
      this.currentPlayTime = curTime;
      const index = this.subtitles.findIndex(
        line =>
          line.from < this.currentPlayTime && line.to > this.currentPlayTime
      );
      if (index !== -1) this.activeTranscriptIndex = index;
    },
    subtitleStartPlayFrom(from) {
      this.currentPlayTime = from;
      this.videoPlayer.currentTime(from);
      this.videoPlayer.play();
    },
    markLine(line) {
      const findIdx = this.remarks.findIndex(
        remark => remark.text1 === line.text1
      );
      if (findIdx !== -1) this.remarks.splice(findIdx, 1);
      else this.remarks.push({ ...line, notes: "" });
      window.localStorage.setItem(
        `${this.videoName}-remarks`,
        JSON.parse(this.remarks)
      );
    }
  }
};
</script>
<style>
.main {
  height: 100%;
  min-width: 800px;
  padding: 20px;
}

.ivu-split-horizontal {
  width: 100%;
  height: 560px;
}

.ivu-split-horizontal .ivu-split-pane {
  margin: 10px;
}

.ivu-split-horizontal .ivu-split-trigger-con {
  opacity: 0;
}

.hidden {
  display: none;
}

.left-panel {
  width: 100%;
  height: 100%;
}

.right-panel {
  width: 100%;
  height: 100%;
}

.left-panel .player-wrapper {
  height: 100%;
  width: 100%;
}

#title {
  margin: 18px;
  color: #444;
  font-size: 18px;
}

/*
    iconfont 使用，重要
*/
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
