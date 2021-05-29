<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <!-- 工具栏 -->
            <v-toolbar :elevation="0">
              <v-toolbar-title class="mr-2">SQL主机列表</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outlined>
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
            :headers="headers"
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  methods: {
    clickMe() {
      alert(11);
    },
  },
  data: () => ({
    path: "",
    loading: false,
    search: "",
    headers: [
      {
        text: "编号",
        align: "start",
        sortable: false,
        value: "uuid",
      },
      { text: "名称", value: "name" },
      { text: "MD5", sortable: false, value: "md5" },
      { text: "格式", value: "format" },
      { text: "大小", value: "size" },
      { text: "时长", value: "protein" },
      { text: "分辨率", value: "resolution" },
    ],
    desserts: [
      {
        uuid: "1",
        name: "三国志",
        md5: "F681F98BB01FF254232BFE8FF4662B16",
        format: "mp4",
        size: "30M",
        protein: 4.0,
        resolution: "1920*1080",
      },
    ],
  }),
};
</script>
