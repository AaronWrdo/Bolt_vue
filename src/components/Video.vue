<template>
  <div class="player-wrapper">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      @timeupdate="onPlayerTimeupdate($event)"
      @loadeddata="onPlayerLoadeddata($event)"
    >
    </video-player>
    <Control
      :shieldBarVisible="shieldBarVisible"
      @change-shieldbar-visible="changeShieldBarVis"
      @change-velocity="changeVelocity"
    >
      <Slider
        class="progress-bar"
        :value="progressVal"
        :max="duration"
        :show-tip="'hover'"
        :marks="marks"
        :on-change="changeTime"
      />
      {{ currentTimeStr }}/{{ durationStr }}
    </Control>
    <OperatingArea
      v-if="transcriptsLoaded"
      :scrollHandler="scrollHandler"
      :onMark="remarkSentence"
      :onPlayOrPause="toggleIsPlaying"
    >
      <ShieldBar v-if="shieldBarVisible" />
    </OperatingArea>
    <div class="star" v-if="showStar" />
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import ShieldBar from "./ShieldBar.vue";
import Control from "./Control.vue";
import OperatingArea from "./OperatingArea.vue";
import { formatSeconds } from "../utils/index.js";

export default {
  components: {
    videoPlayer,
    ShieldBar,
    Control,
    OperatingArea
  },
  data() {
    return {
      shieldBarVisible: false,
      currentTime: 0,
      timer: null,
      duration: 10000
    };
  },
  props: {
    source: {
      type: Object
    },
    transcriptsLoaded: {
      type: Boolean
    },
    subtitles: {
      type: Array
    },
    remarks: {
      type: Array
    },
    activeTranscriptIndex: {
      type: Number
    }
  },
  computed: {
    playerOptions() {
      return {
        // height: "360",
        autoplay: false,
        muted: false,
        language: "en",
        playbackRates: [0.8, 1.0, 1.2, 1.4, 1.6],
        sources: [{ ...this.source }],
        controls: true
      };
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
    progressVal() {
      return parseInt(this.currentTime);
    },
    showStar() {
      return (
        this.remarks.findIndex(
          remark =>
            remark.from < this.currentTime && remark.to > this.currentTime
        ) !== -1
      );
    },
    durationStr() {
      return formatSeconds(this.duration);
    },
    currentTimeStr() {
      return formatSeconds(this.currentTime);
    },
    marks() {
      let res = {};
      this.remarks.forEach(remark => {
        res[remark.from] = { label: "" };
      });
      return res;
    }
  },
  mounted() {
    document.addEventListener("keydown", this.videoShortcutHandler);
    if (this.transcriptsLoaded) {
      document.addEventListener("keydown", this.transcriptShortcutHandler);
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.videoShortcutHandler);
    document.removeEventListener("keydown", this.transcriptShortcutHandler);
  },
  watch: {
    transcriptsLoaded(val) {
      if (val) {
        document.addEventListener("keydown", this.transcriptShortcutHandler);
      }
    }
  },
  methods: {
    onPlayerLoadeddata(player) {
      this.duration = player.duration();
    },
    onPlayerTimeupdate(player) {
      this.$emit("update-time", player.currentTime());
      this.currentTime = player.currentTime();
    },
    changeTime(time) {
      this.player.currentTime(time);
    },
    changeShieldBarVis(isVisible) {
      this.shieldBarVisible = isVisible;
    },
    changeVelocity(velo) {
      this.player.playbackRate(velo);
    },
    toggleIsPlaying() {
      if (this.player.paused()) this.player.play();
      else this.player.pause();
    },
    playPrevLine() {
      this.player.currentTime(
        this.subtitles[this.activeTranscriptIndex - 1].from
      );
      this.player.play();
    },
    playNextLine() {
      this.player.currentTime(
        this.subtitles[this.activeTranscriptIndex + 1].from
      );
      this.player.play();
    },
    playPrevSecs() {
      this.player.currentTime(this.player.currentTime() + 2);
      this.player.play();
    },
    playNextSecs() {
      this.player.currentTime(this.player.currentTime() - 2);
      this.player.play();
    },
    remarkSentence() {
      this.$emit("mark-line", this.subtitles[this.activeTranscriptIndex]);
    },
    videoShortcutHandler(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (!e) return;
      switch (e.keyCode) {
        // 按 E 暂停/播放
        case 69:
          this.toggleIsPlaying();
          break;
        // 按 W 回退2秒
        case 87:
          this.playPrevSecs();
          break;
        // 按 R 前进2秒
        case 82:
          this.playNextSecs();
          break;
      }
    },
    transcriptShortcutHandler(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (!e) return;
      switch (e.keyCode) {
        // 按 D 暂停/播放
        case 68:
          this.toggleIsPlaying();
          break;
        // 按 S 播放上一句
        case 83:
          this.playPrevLine();
          break;
        // 按 F 播放下一句
        case 70:
          this.playNextLine();
          break;
      }
    },
    scrollHandler(e) {
      if (!e) return;
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) this.playPrevLine();
        else this.playNextLine();
      }
      if (e.detail) {
        if (e.detail < 0) this.playPrevLine();
        else this.playNextLine();
      }
    }
  }
};
</script>
<style lang="less">
.player-wrapper {
  width: 100%;
}
.player-wrapper .video-player {
  width: 100%;
  height: 80%;
}
.video-player > * {
  width: 100%;
  height: 100%;
}
.video-js .vjs-tech {
  height: calc(100% - 1px);
}
.video-js .vjs-control-bar {
  display: none;
}
.star {
  background: yellow;
  position: absolute;
  top: 18%;
  left: 3%;
  width: 5%;
  height: 4%;
}

.player-wrapper .ivu-slider-stop {
  width: 1px;
  height: 10px;
  margin-top: -2px;
  background-color: red;
}
</style>
