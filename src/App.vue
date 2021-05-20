<template>
  <v-app>
    <v-app-bar app>
      <v-tabs centered class="ml-n9">
        <v-tab v-for="link in links" :key="link" :to="link.url">
          {{ link.title }}
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
    links: [
      {
        title: "首页",
        // icon: "mdi-dip-switch",
        url: "/",
      },
      {
        title: "视频列表",
        url: "/video-list",
      },
      {
        title: "设置",
        url: "/setting",
      },
    ],
  }),
};
</script>
