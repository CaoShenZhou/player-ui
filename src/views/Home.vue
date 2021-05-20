<template>
  <v-row>
    <v-col v-for="n in 4" :key="n" cols="6">
      <v-card height="400"></v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",

  data: () => ({}),

  components: {},
};
</script>
