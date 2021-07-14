<template>
  <div>
    <v-card>
      <v-card-title>
        视频标签列表
        <v-spacer></v-spacer>
        <v-icon color="green" @click="getVideoList()">mdi-cached</v-icon>
      </v-card-title>
      <!-- 分割线 -->
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="desserts" :search="search">
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
};
</script>

<style>
</style>