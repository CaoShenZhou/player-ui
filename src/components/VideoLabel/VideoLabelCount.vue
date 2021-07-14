<template>
  <div>
    <v-card>
      <v-card-title>视频标签统计</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" xl="7" lg="7" style="height: 400px">
            <div id="videoLabelChart" style="width: 100%; height: 100%"></div>
          </v-col>
          <v-col cols="12" xl="5" lg="5">
            <v-simple-table fixed-header dense height="376px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">名称</th>
                    <th class="text-left">标记数</th>
                    <th class="text-left">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in videoLabelCount" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.count }}</td>
                    <td>操作</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    videoLabelChartOption: {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "0",
      },
      series: [
        {
          name: "视频标签统计",
          type: "pie",
          radius: [30, 150],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [],
        },
      ],
    },
    videoLabelCount: [],
  }),

  methods: {
    draw() {
      let videoLabelChart = this.$echarts.init(
        document.getElementById("videoLabelChart")
      );
      videoLabelChart.setOption(this.videoLabelChartOption);
      window.addEventListener("resize", () => {
        videoLabelChart.resize();
      });
    },

    getVideoLabelCount() {
      this.$get("/video-label/count").then((res) => {
        this.videoLabelCount = res;
        res.forEach((element) => {
          this.videoLabelChartOption.series[0].data.push({
            name: element.name,
            value: element.count,
          });
          this.draw();
        });
      });
    },
  },

  created() {
    this.getVideoLabelCount();
  },

  mounted() {},

  watch: {
    videoLabelCount: {
      handler() {
        let videoLabelChart = this.$echarts.init(
          document.getElementById("videoLabelChart")
        );
        videoLabelChart.setOption(this.videoLabelChartOption);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>