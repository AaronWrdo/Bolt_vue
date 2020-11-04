<template>
  <div class="player-wrapper">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
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
    }
  },
  computed: {
    // videojs options
    playerOptions() {
      return {
        // height: "360",
        autoplay: true,
        muted: false,
        language: "en",
        playbackRates: [0.8, 1.0, 1.2, 1.4, 1.6],
        sources: [{ ...this.source }],
        controls: false
      };
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    // this.player.currentTime(10);
    // this.player.play();
    // console.log("play");
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("player ended!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    onPlayerWaiting(player) {
      console.log("player Waiting!", player);
    },
    onPlayerPlaying(player) {
      console.log("player Playing!", player);
    },
    onPlayerTimeupdate(player) {
      this.$emit("update-time", player.currentTime());
    },
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
    },
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
      this.player.play().then(res => console.log(res));
    },
    // or listen state event
    // playerStateChanged(playerCurrentState) {
    //   console.log("player current update state", playerCurrentState);
    // },
    // player is ready
    playerReadied(player) {
      console.log("example player 1 readied", player);
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
