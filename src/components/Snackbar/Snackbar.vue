<template>
  <v-snackbar v-model="snackbar" top :color="color">
    {{ tipsText }}
    <template v-slot:action="{ attrs }">
      <v-btn fab small text v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      color: "",
      tipsText: "",
      snackbar: false,
    };
  },
  methods: {
    info(msg) {
      this.color = "#1867c0";
      this.tipsText = msg;
      this.snackbar = true;
    },
    success(msg) {
      this.color = "#4caf50";
      this.tipsText = msg;
      this.snackbar = true;
    },
    warning(msg) {
      this.color = "#fb8c00";
      this.tipsText = msg;
      this.snackbar = true;
    },
    error(msg) {
      this.color = "#ff5252";
      this.tipsText = msg;
      this.snackbar = true;
    },
  },
};
</script>

<style></style>
