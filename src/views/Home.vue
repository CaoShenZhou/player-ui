<template>
  <div>
    <v-card>
      <v-card-title>
        多片同看
        <v-spacer></v-spacer>
        <v-icon color="green" @click="getVideoList()">mdi-cached</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="6"
            lg="6"
            xl="6"
            v-for="(video, index) in videoArr"
            :key="video.id"
          >
            <v-card>
              <player :videoId="video.id" :videoUrl="video.url"></player>
              <v-card-actions>
                <v-btn
                  class="mr-2"
                  fab
                  x-small
                  @click="
                    updateVideoLike(
                      index,
                      videoArr[index].id,
                      !videoArr[index].like
                    )
                  "
                >
                  <v-icon :color="videoArr[index].like ? 'pink' : ''">
                    {{
                      videoArr[index].like ? "mdi-heart" : "mdi-heart-outline"
                    }}
                  </v-icon>
                </v-btn>
                <v-btn fab x-small @click="playVideo(videoArr[index].id)">
                  <v-icon>mdi-television</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
    Player: () => import("@/components/Player/Player.vue"),
  },

  created() {
    this.getVideoList();
  },

  data: () => ({
    videoArr: [],
  }),

  methods: {
    getVideoList() {
      this.$get("/video/list").then((res) => {
        for (let i = 0; i < 4; i++) {
          let video = res[i];
          video.url = "http://127.0.0.1:8090/data/" + video.name;
          this.videoArr.push(res[i]);
        }
      });
    },
    updateVideoLike(index, id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.videoArr[index].like = isLike;
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
