<template>
  <div>
    <v-card>
      <v-card-title>
        视频列表
        <v-spacer></v-spacer>
        <v-icon color="green" @click="getVideoList()">mdi-cached</v-icon>
      </v-card-title>
      <!-- 分割线 -->
      <v-divider></v-divider>
      <v-text-field
        v-model="path"
        label="添加路径"
        single-line
        hide-details
        clearable
        class="mx-4"
      >
        <template v-slot:append-outer>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </template>
      </v-text-field>
      <v-text-field
        v-model="search"
        label="搜索"
        single-line
        hide-details
        clearable
        class="mx-4"
      >
        <template v-slot:append-outer>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="videoList"
        :search="search"
      >
        <template v-slot:item.size="{ item }">
          {{ $common.bytesToSize(item.size) }}
        </template>
        <template v-slot:item.duration="{ item }">
          {{ $common.formatSecond(item.duration) }}
        </template>
        <template v-slot:item.like="{ item }">
          <v-icon
            :color="item.like ? 'pink' : ''"
            @click="updateVideoLike(item.id, !item.like)"
          >
            {{ item.like ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </template>
        <template v-slot:item.operate="{ item }">
          <v-icon class="mr-2" @click="playVideo(item.id)">
            mdi-play-circle-outline
          </v-icon>
          <v-icon @click="delVideo(item.id)">
            mdi-delete-circle-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  data: () => ({
    path: "",
    loading: false,
    search: "",
    headers: [
      {
        text: "编号",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "名称", value: "name" },
      { text: "是否喜欢", value: "like" },
      { text: "MD5", sortable: false, value: "md5" },
      { text: "格式", value: "format" },
      { text: "大小", value: "size" },
      { text: "时长", value: "duration" },
      { text: "分辨率", value: "resolution" },
      { text: "创建时间", value: "createTime" },
      { text: "更新时间", value: "updateTime" },
      { text: "操作", value: "operate" },
    ],
    videoList: [],
  }),
  created() {
    this.getVideoList();
  },
  methods: {
    getVideoList() {
      this.loading = true;
      this.videoList = [];
      this.$get("/video/list").then((res) => {
        this.videoList = res;
        this.loading = false;
      });
    },
    updateVideoLike(id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.getVideoList();
        }
      });
    },
    delVideo(id) {
      this.$del("/video/" + id).then((res) => {
        if (res) {
          this.getVideoList();
        }
      });
    },
    playVideo(id) {
      let routeUrl = this.$router.resolve({
        path: `/video/${id}`,
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>
