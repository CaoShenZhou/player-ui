<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        <div class="player">
          <video-player
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
        </div>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <div class="player">
          <video-player
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions1"
          ></video-player>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
window.videojs = require("video.js");
require("video.js/dist/lang/zh-CN");
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";

export default {
  name: "Home",

  components: {
    videoPlayer,
  },

  data: () => ({
    playerOptions: {
      height: "360",
      autoplay: true,
      muted: true,
      language: "zh-CN",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: "video/mp4",
          src: "http://localhost:8090/data/720(5).MP4",
        },
      ],
    },
    playerOptions1: {
      height: "360",
      autoplay: true,
      muted: true,
      language: "en",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: "video/mp4",
          src: "http://localhost:8090/data/720(2).MP4",
        },
      ],
    },
  }),
};
</script>
