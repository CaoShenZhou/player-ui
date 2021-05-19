<template>
  <v-card>
    <v-card-title>
      视频列表
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
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
