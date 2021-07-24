<template>
  <div>
    <v-row>
      <v-col cols="12" xl="6" lg="6">
        <VideoLabelCount></VideoLabelCount>
      </v-col>
      <v-col cols="12" xl="6" lg="6">
        <v-card elevation="10" class="rounded-lg">
          <v-card-title>
            随机播放
            <v-spacer></v-spacer>
            <v-icon color="green" @click="getVideoList()">mdi-cached</v-icon>
          </v-card-title>
          <!-- 分割线 -->
          <v-divider></v-divider>
          <v-card-text>
            <player
              :playerHeight="'384px'"
              :videoId="'123'"
              :videoUrl="'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'"
            ></player>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
    Player: () => import("@/components/Player/Player.vue"),
    VideoLabelCount: () =>
      import("@/components/VideoLabel/VideoLabelCount.vue"),
  },

  created() {
    this.getVideoLabelCountList();
  },

  data: () => ({
    search: "",
    headers: [
      { text: "名称", value: "name" },
      { text: "标记数", value: "count" },
    ],
    videoLabelCount: [],
  }),

  methods: {
    getVideoLabelCountList() {
      this.videoList = [];
      this.$get("/video-label/count").then((res) => {
        this.videoLabelCount = res;
      });
    },
  },
};
</script>
