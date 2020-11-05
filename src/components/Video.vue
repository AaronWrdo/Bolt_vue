<template>
  <div class="player-wrapper">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      @timeupdate="onPlayerTimeupdate($event)"
    >
    </video-player>
    <Control
      :shieldBarVisible="shieldBarVisible"
      @change-shieldbar-visible="changeShieldBarVis"
      @change-velocity="changeVelocity"
    />
    <ShieldBar v-if="shieldBarVisible" />
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import ShieldBar from "./ShieldBar.vue";
import Control from "./Control.vue";
import {
  handleVideoShortcut,
  handleTranscriptShortcut
} from "../utils/hotkeys";

export default {
  components: {
    videoPlayer,
    ShieldBar,
    Control
  },
  data() {
    return {
      shieldBarVisible: false
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
    activeTranscriptIndex: {
      type: Number
    }
  },
  computed: {
    // videojs options
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
    }
  },
  mounted() {
    document.addEventListener("keydown", e =>
      handleVideoShortcut(e, this.player)
    );
  },
  watch: {
    transcriptsLoaded(val) {
      console.log("cur", this.player.currentTime());
      if (val)
        document.addEventListener("keydown", e =>
          handleTranscriptShortcut(
            e,
            this.player,
            this.subtitles,
            this.activeTranscriptIndex
          )
        );
      // else
      //   document.removeEventListener("keydown", e =>
      //     handleVideoShortcut(e, this.player)
      //   );
    }
  },
  methods: {
    onPlayerTimeupdate(player) {
      this.$emit("update-time", player.currentTime());
    },
    changeShieldBarVis(isVisible) {
      this.shieldBarVisible = isVisible;
    },
    changeVelocity(velo) {
      console.log(this.player);
      console.log(velo);
      this.player.playbackRate(velo);
    },
    toggleIsPlaying() {
      console.log(this.player.paused());
      console.log(this.player);
      if (this.player.paused()) this.player.play();
      else this.player.pause();
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
  height: 70%;
}
.video-player > * {
  width: 100%;
  height: 100%;
}
// .video-js .vjs-tech {
//   height: 100%;
// }
.video-js .vjs-control-bar {
  display: none;
}
</style>
