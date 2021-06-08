<template>
  <div>
    <v-card>
      <v-card-title>
        视频ID：{{ id }}
        <v-spacer></v-spacer>
        <v-icon
          :color="video.like ? 'pink' : ''"
          @click="updateVideoLike(video.id, !video.like)"
        >
          {{ video.like ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon>
      </v-card-title>
      <!-- 分割线 -->
      <v-divider></v-divider>
      <v-card-text>
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
        <v-chip
          v-for="item in selectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
          color="green"
          text-color="white"
        >
          {{ item.name }}
          <v-icon right>mdi-minus-circle</v-icon>
        </v-chip>
        <v-divider></v-divider>
        <v-chip
          v-for="item in unselectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
        >
          {{ item.name }}
          <v-icon right>mdi-plus-circle</v-icon>
        </v-chip>
      </v-card-text>
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
    selectedLabel: [],
    unselectedLabel: [],
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
        this.video = res.video;
        this.playerOptions.sources = "video/" + this.video.format;
        this.playerOptions.sources =
          "http://127.0.0.1:8090/data/" + this.video.name;
        // 已选中标签
        res.labelList.forEach((label) => {
          res.videoLabelList.forEach((videoLable) => {
            if (label.id == videoLable.labelId) this.selectedLabel.push(label);
          });
        });
        // 未选择标签
        this.unselectedLabel = this.selectedLabel
          .concat(res.labelList)
          .filter(function (v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
          });
      });
    },
    updateVideoLike(id, isLike) {
      console.log(this.video);
      console.log(isLike);
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.video.like = isLike;
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
