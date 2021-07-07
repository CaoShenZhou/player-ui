<template>
  <div>
    <v-card>
      <v-card-title>
        视频ID：{{ video.id }}
        <v-spacer></v-spacer>
        <v-icon
          :color="video.like ? 'pink' : ''"
          @click="updateVideoLike(video.id, !video.like)"
        >
          {{ video.like ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon>
      </v-card-title>
      <!-- 分割线 -->
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" xl="10" lg="10">
            <player :videoId="videoId" :videoUrl="videoUrl"></player>
          </v-col>
          <v-col cols="12" xl="2" lg="2">
            <v-tabs fixed-tabs>
              <v-tab>观看列表</v-tab>
              <v-tab>喜欢列表</v-tab>
              <v-tab-item style="height: 525px">
                <vue-custom-scrollbar
                  :settings="settings"
                  style="height: 525px"
                  class="my-3"
                >
                  <div v-for="v in watchList" :key="v.id" class="mx-3 mb-3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-card outlined rounded="0" :elevation="hover ? 4 : 0">
                          <v-img
                            class="white--text align-end"
                            height="117px"
                            :src="v.url"
                          >
                            <v-card-title>{{ v.name }}</v-card-title>
                            <v-card-subtitle class="white--text align-end">
                              {{ v.duration }}
                            </v-card-subtitle>
                          </v-img>
                          <v-card-actions>
                            <v-btn small color="primary" text>播放</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-hover>
                  </div>
                </vue-custom-scrollbar>
              </v-tab-item>
              <v-tab-item style="height: 525px">
                <vue-custom-scrollbar
                  :settings="settings"
                  style="height: 525px"
                  class="my-3"
                >
                  <div v-for="v in likeList" :key="v.id" class="mx-3 mb-3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-card outlined rounded="0" :elevation="hover ? 4 : 0">
                          <v-img
                            class="white--text align-end"
                            height="117px"
                            :src="v.url"
                          >
                            <v-card-title>{{ v.name }}</v-card-title>
                            <v-card-subtitle class="white--text align-end">
                              {{ v.duration }}
                            </v-card-subtitle>
                          </v-img>
                          <v-card-actions>
                            <v-btn small color="primary" text>播放</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-hover>
                  </div>
                </vue-custom-scrollbar>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <!-- 已选中表标签 -->
        <v-chip
          v-for="item in selectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
          color="green"
          text-color="white"
        >
          {{ item.name }}
          <v-icon right @click="delVideoLabel(video.id, item.id)">
            mdi-minus-circle
          </v-icon>
        </v-chip>
        <v-divider></v-divider>
        <!-- 未选中标签 -->
        <v-chip
          v-for="item in unselectedLabel"
          :key="item.id"
          class="mt-4 mb-4 mr-4"
        >
          {{ item.name }}
          <v-icon right @click="addVideoLabel(video.id, item.id)">
            mdi-plus-circle
          </v-icon>
        </v-chip>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  name: "Video",

  components: {
    vueCustomScrollbar,
    Player: () => import("@/components/Player/Player.vue"),
  },

  data: () => ({
    tab: null,
    settings: {
      wheelPropagation: false,
    },
    videoArr: [],
    video: {},
    videoId: null,
    videoUrl: null,
    watchList: [],
    likeList: [],
    selectedLabel: [],
    unselectedLabel: [],
  }),

  watch: {
    "$route.params.id": function (newVal, oldVal) {
      console.log(newVal, oldVal);
      this.id = newVal;
      this.getVideoById(newVal);
    },
  },

  created() {
    let id = this.$route.params.id;
    this.getVideoById(id);

    for (let i = 0; i < 10; i++) {
      let videoInfo = {
        id: i + 1,
        name: `视频${i + 1}`,
        duration: "00:16:35",
        url: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      };
      this.watchList.push(videoInfo);
      this.likeList.push(videoInfo);
    }
  },

  methods: {
    getVideoById(id) {
      this.$get("/video/" + id).then((res) => {
        this.video = res.video;
        this.videoId = this.video.id;
        this.videoUrl = "http://127.0.0.1:8090/data/" + this.video.name;
        this.unselectedLabel = res.labelList;
        // 遍历全部标签
        for (let i = this.unselectedLabel.length - 1; i != -1; i--) {
          res.videoLabelList.forEach((videoLable) => {
            if (this.unselectedLabel[i].id == videoLable.labelId) {
              this.selectedLabel.push(this.unselectedLabel[i]);
              this.$delete(this.unselectedLabel, i);
            }
          });
        }
      });
    },
    // 更新视频喜欢
    updateVideoLike(id, isLike) {
      this.$post("/video/update-like", { id: id, like: isLike }).then((res) => {
        if (res) {
          this.video.like = isLike;
        }
      });
    },
    // 添加视频标签
    addVideoLabel(videoId, labelId) {
      this.$post("/video-label/add", {
        videoId: videoId,
        labelId: labelId,
      }).then((res) => {
        if (res) {
          // 未选中标签的下标
          let index = this.unselectedLabel.findIndex(
            (videoLabel) => videoLabel.id === labelId
          );
          let tempLabel = this.unselectedLabel[index];
          this.$delete(this.unselectedLabel, index);
          this.selectedLabel.push(tempLabel);
        }
      });
    },
    // 删除视频标签
    delVideoLabel(videoId, labelId) {
      this.$post("/video-label/del", {
        videoId: videoId,
        labelId: labelId,
      }).then((res) => {
        if (res) {
          // 已选中标签的下标
          let index = this.selectedLabel.findIndex(
            (videoLabel) => videoLabel.id === labelId
          );
          let tempLabel = this.selectedLabel[index];
          this.$delete(this.selectedLabel, index);
          this.unselectedLabel.push(tempLabel);
        }
      });
    },
  },
};
</script>
