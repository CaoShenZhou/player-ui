<template>
  <div>
    <div :style="'height:' + playerHeight" :id="videoId"></div>
  </div>
</template>

<script>
import DPlayer from "dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  props: {
    playerHeight: String,
    videoId: String,
    videoUrl: String,
  },

  data: () => ({
    dp: null,
  }),

  mounted() {
    this.createPlayer();
  },

  watch: {
    videoUrl: function (newVal, oldVal) {
      console.log("切换：", newVal, oldVal);
      // 切换视频
      this.dp.switchVideo({
        url: newVal,
      });
    },
  },
  methods: {
    // 创建播放器
    createPlayer() {
      console.log("初始：", this.videoId, this.videoUrl);
      this.dp = new DPlayer({
        container: document.getElementById(this.videoId),
        lang: "zh-cn",
        screenshot: true,
        mutex: false,
        volume: 0.5,
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.75],
        video: {
          url: this.videoUrl,
        },
      });
      // 等播放器渲染完毕后更改循环播放的文字
      this.$nextTick(function () {
        document.getElementsByClassName("dplayer-label")[1].innerText =
          "循环播放";
      });
    },
  },
};
</script>

<style>
/* 播放速度列表高度 */
.dplayer-controller
  .dplayer-icons
  .dplayer-setting
  .dplayer-setting-box.dplayer-setting-box-narrow {
  height: unset;
}
/* 时间轴文字阴影 */
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  width: unset;
}
</style>