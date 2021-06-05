<template>
  <div>
    <v-card>
      <v-card-title>
        视频ID：{{ id }}
        <v-spacer></v-spacer>
        <v-btn
          fab
          x-small
          @click="updateVideoLike(playerOptions.id, !playerOptions.like)"
        >
          <v-icon :color="video.like ? 'pink' : ''">
            {{ video.like ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <!-- 分割线 -->
      <v-divider></v-divider>
      <v-card-text>
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player
      ></v-card-text>
    </v-card>
  </div>
</template>

<script>
window.videojs = require("video.js");
require("video.js/dist/lang/zh-CN");
require("vue-video-player/src/custom-theme.css");
require("video.js/dist/video-js.css");
import { videoPlayer } from "vue-video-player";

export default {
  name: "Video",

  components: {
    videoPlayer,
  },

  data: () => ({
    id: "",
    screenSize: null,
    video: {},
    playerOptions: {
      controls: true,
      autoplay: true,
      muted: true,
      aspectRatio: "16:9",
      language: "zh-CN",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      notSupportedMessage: "此视频暂无法播放，请稍后再试",
      sources: [
        {
          type: "",
          src: "",
        },
      ],
      controlBar: {
        remainingTimeDisplay: true,
      },
    },
  }),

  watch: {
    "$route.params.id": function (newVal, oldVal) {
      console.log(newVal, oldVal);
      this.id = newVal;
      this.getVideoById(newVal);
    },
  },

  methods: {
    getVideoById(id) {
      this.$get("/video/" + id).then((res) => {
        if (res != null) {
          this.video = res;
          this.playerOptions.sources = "video/" + this.video.format;
          this.playerOptions.sources =
            "http://127.0.0.1:8090/data/" + this.video.name;
        }
      });
    },
    updateVideoLike(id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.getVideoList();
        }
      });
    },
  },

  created() {
    this.id = this.$route.params.id;
    this.getVideoById(this.$route.params.id);
  },
};
</script>

<style></style>
