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
        <div id="dplayer"></div>
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
        <v-chip v-for="item in unselectedLabel" :key="item.id" class="mt-4 mb-4 mr-4">
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
import DPlayer from "dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  name: "Video",

  components: {},

  data: () => ({
    video: {},
    selectedLabel: [],
    unselectedLabel: [],
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
        new DPlayer({
          container: document.getElementById("dplayer"),
          lang: "zh-cn",
          screenshot: true,
          volume: 0.5,
          playbackSpeed: [0.5, 0.75, 1, 1.25, 1.75],
          video: {
            url: "http://192.168.1.27:8090/data/" + this.video.name,
          },
        });
        // 等播放器渲染完毕后更改循环播放的文字
        this.$nextTick(function () {
          let div = document.getElementsByClassName("dplayer-label");
          console.log((div[1].innerText = "循环播放"));
        });
        this.unselectedLabel = res.labelList;
        // 遍历全部标签
        for (let i = this.unselectedLabel.length - 1; i != -1; i--) {
          console.log(this.unselectedLabel[i]);
          res.videoLabelList.forEach((videoLable) => {
            if (this.unselectedLabel[i].id == videoLable.labelId) {
              this.selectedLabel.push(this.unselectedLabel[i]);
              this.$delete(this.unselectedLabel, i);
            }
          });
        }
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

<style>
.dplayer-controller
  .dplayer-icons
  .dplayer-setting
  .dplayer-setting-box.dplayer-setting-box-narrow {
  height: unset;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  width: unset;
}
</style>
