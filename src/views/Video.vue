<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
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
            <player
              :playerHeight="'585px'"
              :videoId="videoId"
              :videoUrl="videoUrl"
            ></player>
          </v-col>
          <v-col cols="12" xl="2" lg="2">
            <v-tabs fixed-tabs>
              <v-tab>视频详情</v-tab>
              <v-tab>观看列表</v-tab>
              <v-tab>喜欢列表</v-tab>
              <v-tab-item style="height: 525px">
                <vue-custom-scrollbar
                  :settings="settings"
                  style="height: 525px"
                  class="my-3"
                >
                  <v-card rounded="0" :elevation="hover ? 4 : 0">
                    <v-card-title>视频名称</v-card-title>
                    <v-card-text>
                      <p>
                        <b>视频大小：</b>
                        {{ $common.bytesToSize(video.size) }}
                      </p>
                      <p>
                        <b>视频时长：</b
                        >{{ $common.formatSecond(video.duration) }}
                      </p>
                      <p><b>上传时间：</b>{{ video.createTime }}</p>
                      <p><b>视频分辨率：</b>{{ video.resolution }}</p>
                      <p>
                        <b>视频描述：</b>
                        fasffasfasfsafasasgfddhfdhfdhfdhfdhffasfasfas
                      </p>
                    </v-card-text>
                  </v-card>
                </vue-custom-scrollbar>
              </v-tab-item>
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
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                          >
                            <v-card-title>{{ v.id }}</v-card-title>
                            <v-card-subtitle class="white--text align-end">
                              {{ $common.formatSecond(v.duration) }}
                            </v-card-subtitle>
                          </v-img>
                          <v-card-actions>
                            <v-btn small color="primary" text>
                              <router-link :to="'/video/' + v.id">
                                <button>播放</button>
                              </router-link>
                            </v-btn>
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

        <v-slide-group show-arrows>
          <v-chip class="mt-4 mr-4" @click="addVideoLabelDialog = true" label>
            添加视频标签
            <v-icon right> mdi-plus-circle </v-icon>
          </v-chip>
          <!-- 已选中表标签 -->
          <v-chip
            class="mt-4 mr-4"
            v-for="item in selectedLabel"
            :key="item.id"
            color="green"
            text-color="white"
            label
          >
            {{ item.name }}
            <v-icon right @click="delVideoLabel(video.id, item.id)">
              mdi-minus-circle
            </v-icon>
          </v-chip>
        </v-slide-group>
      </v-card-text>
    </v-card>
    <v-dialog v-model="addVideoLabelDialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>
          添加视频标签
          <v-spacer></v-spacer>
          <v-btn icon @click="addVideoLabelDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="labelSearch"
            label="搜索"
            single-line
            hide-details
            clearable
          >
            <template v-slot:append-outer>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text style="height: 300px; padding: unset !important">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(keyword, i) in keywords" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="keyword.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon @click="addVideoLabel(video.id, keyword.id)">
                    mdi-plus-circle
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    settings: {
      wheelPropagation: false,
    },
    tab: null,
    videoArr: [],
    video: {},
    videoId: null,
    videoUrl: null,
    watchList: [],
    likeList: [],
    selectedLabel: [],
    unselectedLabel: [],
    labelSearch: "",
    addVideoLabelDialog: false,
  }),

  computed: {
    keywords() {
      if (!this.labelSearch) return this.unselectedLabel;

      const keywords = [];

      for (const search of this.searching) {
        keywords.push(search);
      }

      return keywords;
    },
    searching() {
      if (!this.labelSearch) {
        return this.unselectedLabel;
      } else {
        const labelSearch = this.labelSearch;
        return this.unselectedLabel.filter((item) => {
          const text = item.name;
          return text.indexOf(labelSearch) > -1;
        });
      }
    },
  },

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
    }
    this.getVideoLikeList();
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
    // 获取视频喜欢列表
    getVideoLikeList() {
      this.$get("/video/like-list").then((res) => {
        console.log(res);
        this.likeList = res;
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
