<template>
  <div>
    <v-row>
      <v-col cols="12" xl="6" lg="6">
        <VideoLabelCount></VideoLabelCount>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
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
