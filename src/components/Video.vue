<template>
  <div class="player-wrapper">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
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
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
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
        height: "360",
        autoplay: false,
        muted: false,
        language: "en",
        playbackRates: [0.8, 1.0, 1.2, 1.4, 1.6],
        sources: [{ ...this.source }]
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
  // mounted() {
  // console.log('this is current player instance object', this.player)
  // setTimeout(() => {
  // console.log("dynamic change options", this.player);
  // change src
  // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
  // change item
  // this.$set(this.playerOptions.sources, 0, {
  //   type: "video/mp4",
  //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
  // })
  // change array
  // this.playerOptions.sources = [{
  //   type: "video/mp4",
  //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
  // }]
  // }, 5000);
  // },
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
    },
    // or listen state event
    // playerStateChanged(playerCurrentState) {
    //   console.log("player current update state", playerCurrentState);
    // },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(0);
    }
  }
};
</script>
<style lang="less">
.player-wrapper {
  width: 100%;
}
.player-wrapper .video-player {
  // height: 80%;
  width: 100%;
  .vjs-control-bar {
    display: none;
  }
}
.video-player > * {
  width: 100%;
}
.video-js .vjs-tech {
  height: auto;
}
</style>
