<template>
  <div>
    <v-card>
      <v-card-title>
        多片同看
        <v-btn class="ml-2" small outlined>
          <span>换一批</span>
          <v-icon right>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="mdi-magnify"
          label="搜索"
          filled
          rounded
          dense
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-row class="mx-0" align="center">
        <v-col
          cols="12"
          md="6"
          lg="6"
          xl="6"
          v-for="playerOptions in playerOptionsArr"
          :key="playerOptions.id"
        >
          <v-card>
            <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
            ></video-player>
          </v-card>
        </v-col>
      </v-row>
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
  name: "Home",

  components: {
    videoPlayer,
  },

  created() {
    // 屏幕大小
    let screenSize = this.$vuetify.breakpoint.name;
    // 如果是最小屏
    if (screenSize == "xs") {
      // 将播放器控制栏取消
      this.playerOptionsTemplate.controls = false;
    }
    for (let i = 0; i < 2; i++) {
      this.playerOptionsArr[i] = JSON.parse(
        JSON.stringify(this.playerOptionsTemplate)
      );
      this.playerOptionsArr[i].id = i;
      if (i == 0) {
        this.playerOptionsArr[i].sources = "video/mp4";
        this.playerOptionsArr[i].sources = "http://vjs.zencdn.net/v/oceans.mp4";
      } else if (i == 1) {
        this.playerOptionsArr[i].sources = "video/webm";
        this.playerOptionsArr[i].sources =
          "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
      }
    }
  },

  data: () => ({
    screenSize: null,
    playerOptionsArr: [],
    playerOptionsTemplate: {
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
};
</script>
