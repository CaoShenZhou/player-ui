<template>
  <v-app>
    <v-app-bar app elevation="10">
      <v-tabs centered class="ml-n9">
        <v-tab v-for="nav in navLinks" :key="nav.url" :to="nav.url">
          {{ nav.title }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container class="py-6 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    navLinks: [
      {
        title: "首页",
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

<style>
.v-dialog > .v-card > .v-card__title {
  padding: 16px !important;
}
.v-dialog > .v-card > .v-card__text {
  padding: 16px !important;
}
.v-text-field {
  padding-top: unset !important;
  margin-top: unset !important;
}
</style>
