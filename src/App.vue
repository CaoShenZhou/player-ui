<template>
  <v-app>
    <v-app-bar app>
      <v-tabs centered class="ml-n9">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container class="py-8 px-8" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    links: ["首页", "视频列表", "设置"],
  }),
};
</script>
