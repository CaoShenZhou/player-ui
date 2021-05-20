<template>
  <v-card>
    <v-card-title>
      视频目录列表
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
  name: "Setting",
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
      { text: "路径", sortable: false, value: "path" }
    ],
    desserts: [
      {
        uuid: "1",
        name: "三国志",
        path: "D://视频",
      },
    ],
  }),
};
</script>

<style>
</style>