<template>
  <div>
    <v-card>
      <v-card-title>
        多片同看
        <v-spacer></v-spacer>
        <v-btn fab x-small @click="getVideoList()">
          <v-icon color="green">mdi-cached</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="6"
            xl="6"
            v-for="(playerOptions, index) in playerOptionsArr"
            :key="playerOptions.id"
          >
            <v-card>
              <video-player
                class="vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
              <v-card-actions>
                <v-btn
                  class="mr-2"
                  fab
                  x-small
                  @click="
                    updateVideoLike(
                      index,
                      playerOptions.id,
                      !playerOptions.like
                    )
                  "
                >
                  <v-icon :color="playerOptions.like ? 'pink' : ''">
                    {{ playerOptions.like ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                </v-btn>
                <v-btn fab x-small @click="playVideo(playerOptions.id)">
                  <v-icon>mdi-television</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
  name: "Home",

  components: {
    videoPlayer,
  },

  created() {
    this.getVideoList();
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

  methods: {
    getVideoList() {
      this.videoList = [];
      this.playerOptionsArr = [];
      this.$get("/video/list").then((res) => {
        this.videoList = res;
        let playerOptionsId = [];
        // 随机排列对象数组
        for (var i = this.videoList.length - 1; i >= 0; i--) {
          var randomIndex = Math.floor(Math.random() * (i + 1));
          var itemAtIndex = this.videoList[randomIndex];
          this.videoList[randomIndex] = this.videoList[i];
          this.videoList[i] = itemAtIndex;
        }
        for (let i = 0; i < this.videoList.length; i++) {
          // 避免出现重复的视频
          if (playerOptionsId.indexOf(this.videoList[i].id) == -1) {
            playerOptionsId.push(this.videoList[i].id);
            // 屏幕大小
            let screenSize = this.$vuetify.breakpoint.name;
            // 如果是最小屏
            if (screenSize == "xs") {
              // 将播放器控制栏取消
              this.playerOptionsTemplate.controls = false;
            }
            let playerOptions = JSON.parse(
              JSON.stringify(this.playerOptionsTemplate)
            );
            playerOptions.id = this.videoList[i].id;
            playerOptions.sources = "video/" + this.videoList[i].format;
            playerOptions.sources =
              "http://127.0.0.1:8090/data/" + this.videoList[i].name;
            playerOptions.like = this.videoList[i].like;
            this.playerOptionsArr.push(playerOptions);
            // 如果视频数量达到4个就退出循环
            if (this.playerOptionsArr.length == 4) {
              break;
            }
          }
        }
      });
    },
    updateVideoLike(index, id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.playerOptionsArr[index].like = isLike;
        }
      });
    },
    playVideo(id) {
      this.$router.push({
        path: `/video/${id}`,
      });
    },
  },
};
</script>
