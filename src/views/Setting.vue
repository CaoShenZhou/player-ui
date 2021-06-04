<template>
  <div>
    <v-card>
      <v-card-title>
        视频目录列表
        <v-spacer></v-spacer>
        <v-btn fab x-small>
          <v-icon color="green">mdi-cached</v-icon>
        </v-btn>
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
  </div>
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
      { text: "路径", sortable: false, value: "path" },
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