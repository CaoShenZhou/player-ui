<template>
  <div id="videoLabelChart" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  data: () => ({
    videoLabelChartOption: {
      title: {
        text: "视频标签统计",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "0",
      },
      series: [
        {
          name: "视频标签",
          type: "pie",
          radius: ["40%", "70%"],
          itemStyle: {
            borderRadius: 5,
            borderColor: "#fff",
            borderWidth: 1,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
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
      });
    },
  },

  mounted() {
    this.draw();
    this.getVideoLabelCount();
  },

  watch: {
    videoLabelCount: {
      handler(newVal) {
        let videoLabelChart = this.$echarts.init(
          document.getElementById("videoLabelChart")
        );
        this.videoLabelChartOption.series[0].data = newVal;
        videoLabelChart.setOption(this.videoLabelChartOption);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>