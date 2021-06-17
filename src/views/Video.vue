<template>
  <div>
    <v-card>
      <v-card-title>
        视频ID：{{ video.id }}
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
          style="width:60%"
          class="vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
        <!-- 已选中表标签 -->
        <v-chip
          v-for="item in selectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
          color="green"
          text-color="white"
        >
          {{ item.name }}
          <v-icon right @click="delVideoLabel(video.id, item.id)">
            mdi-minus-circle
          </v-icon>
        </v-chip>
        <v-divider></v-divider>
        <!-- 未选中标签 -->
        <v-chip
          v-for="item in unselectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
        >
          {{ item.name }}
          <v-icon right @click="addVideoLabel(video.id, item.id)">
            mdi-plus-circle
          </v-icon>
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
    video: {},
    selectedLabel: [],
    unselectedLabel: [],
    playerOptions: {
      controls: true,
      autoplay: true,
      muted: false,
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
        // this.video.sources =
        //   "http://127.0.0.1:8090/video/" + id;
      this.$get("/video/" + id).then((res) => {
        this.video = res.video;
        this.playerOptions.sources = "video/" + this.video.format;
        this.playerOptions.sources =
        "http://127.0.0.1:8090/data/" + this.video.name;

        this.unselectedLabel = res.labelList;
        // 遍历全部标签
        for (let i = this.unselectedLabel.length - 1; i != -1; i--) {
          console.log(this.unselectedLabel[i]);
          res.videoLabelList.forEach((videoLable) => {
            if (this.unselectedLabel[i].id == videoLable.labelId) {
              console.log(111);
              this.selectedLabel.push(this.unselectedLabel[i]);
              this.$delete(this.unselectedLabel, i);
            }
          });
        }
        console.log(this.selectedLabel, this.unselectedLabel);
        console.log(this.video.sources)
      });
    },
    // 更新视频喜欢
    updateVideoLike(id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.video.like = isLike;
        }
      });
    },
    // 添加视频标签
    addVideoLabel(videoId, labelId) {
      this.$post("/video-label/add", {
        videoId: videoId,
        labelId: labelId,
      }).then((res) => {
        if (res) {
          // 未选中标签的下标
          let index = this.unselectedLabel.findIndex(
            (videoLabel) => videoLabel.id === labelId
          );
          let tempLabel = this.unselectedLabel[index];
          this.$delete(this.unselectedLabel, index);
          this.selectedLabel.push(tempLabel);
        }
      });
    },
    // 删除视频标签
    delVideoLabel(videoId, labelId) {
      this.$post("/video-label/del", {
        videoId: videoId,
        labelId: labelId,
      }).then((res) => {
        if (res) {
          // 已选中标签的下标
          let index = this.selectedLabel.findIndex(
            (videoLabel) => videoLabel.id === labelId
          );
          let tempLabel = this.selectedLabel[index];
          this.$delete(this.selectedLabel, index);
          this.unselectedLabel.push(tempLabel);
        }
      });
    },
  },
  created() {
    this.video.id = this.$route.params.id;
    this.getVideoById(this.video.id);
  },
};
</script>

<style></style>
