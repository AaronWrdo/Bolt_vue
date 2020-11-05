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
  <div>
    <nav>
      <div class="nav-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shandian"></use>
        </svg>
        <h1>Bolt</h1>
      </div>
      <ul class="nav-right">
        <li><a>使用说明</a></li>
        <li>
          <a>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-rijianmoshi"></use>
            </svg>
            <svg class="icon hidden" aria-hidden="true">
              <use xlink:href="#icon-yejianmoshi"></use>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    <h3 id="title"></h3>
    <Split v-model="split" class="container">
      <div slot="left" class="left-panel">
        <label v-if="videoName.length === 0" for="file" class="file-choser">
          <div class="file-choser-desc">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianying"></use>
            </svg>
            <p>点击或拖拽添加文件</p>
          </div>
        </label>
        <Video
          v-else
          ref="videoRef"
          :source="videoSourceInfo"
          :transcriptsLoaded="subtitles.length > 0"
          :subtitles="subtitles"
          :activeTranscriptIndex="activeTranscriptIndex"
          @update-time="playerUpdateTime"
        />
      </div>
      <div slot="right" class="right-panel scroll">
        <Subtitle
          v-if="subtitles.length > 0"
          :subtitles="subtitles"
          :curPlaySecs="currentPlayTime"
          @start-play-from="subtitleStartPlayFrom"
        />
        <label v-else for="file" class="file-choser">
          <div class="file-choser-desc">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jishiben"></use>
            </svg>
            <p>点击或拖拽添加文件</p>
          </div>
        </label>
      </div>
    </Split>
    <FileInput @upload-video="updateVideo" @upload-subtitle="updateSubtitle" />
  </div>
</template>
<script>
import "./main.css";
import FileInput from "./FileInput.vue";
import Video from "./Video.vue";
import Subtitle from "./Subtitle.vue";

export default {
  name: "Hello",
  components: { FileInput, Video, Subtitle },
  data() {
    return {
      split: 0.6,
      videoSourceInfo: {
        src: "",
        type: ""
      },
      videoName: "",
      subtitles: [],
      currentPlayTime: 0,
      videoRef: {}
    };
  },
  computed: {
    videoPlayer() {
      return this.$refs.videoRef.player;
    },
    activeTranscriptIndex() {
      return this.subtitles.findIndex(
        line =>
          line.from < this.currentPlayTime && line.to > this.currentPlayTime
      );
    }
  },
  methods: {
    updateVideo(video) {
      this.videoSourceInfo = {
        src: video.src,
        type: video.type
      };
      this.videoName = video.name;
    },
    updateSubtitle(subtitles) {
      this.subtitles = subtitles;
    },
    playerUpdateTime(curTime) {
      this.currentPlayTime = curTime;
    },
    subtitleStartPlayFrom(from) {
      // console.log(this.$refs.videoRef);
      // console.log(this.videoPlayer);
      this.currentPlayTime = from;
      this.videoPlayer.currentTime(from);
      this.videoPlayer.play();
    }
  }
};
</script>
<style>
.container {
  height: 600px;
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

.file-choser {
  display: block;
  width: 100%;
  height: 100%;
  border: 3px #ddd dashed;
  border-radius: 5px;
}

.file-choser:hover {
  border: 3px #69c0ff dashed;
}

.file-choser-desc {
  text-align: center;
  color: #ddd;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.file-choser-desc * {
  font-size: 22px;
  margin: 5px 0;
}
</style>
