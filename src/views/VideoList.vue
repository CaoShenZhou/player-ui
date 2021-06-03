<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <!-- 工具栏 -->
            <v-toolbar :elevation="0">
              <v-toolbar-title class="mr-2">视频列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outlined @click="getVideoList()">
                <span>刷新</span>
                <v-icon right>mdi-cached</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <!-- 分割线 -->
          <v-divider></v-divider>
          <v-text-field
            v-model="path"
            label="添加路径"
            single-line
            hide-details
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
            <template v-slot:item.operate="{ item }">
              <v-icon class="mr-2" @click="editItem(item)">
                mdi-play-circle
              </v-icon>
              <v-icon @click="deleteItem(item)">mdi-delete-circle</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
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
  },
};
</script>
