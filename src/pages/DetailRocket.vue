<template>
  <v-card v-if="loading" class="ma-5">
    <v-skeleton-loader
      class="skeleton-loader"
      type="image, article"
    ></v-skeleton-loader>
  </v-card>
  <v-card class="pb-3" flat v-else>
    <v-card-title class="ml-5"
      >Detail Rocket {{ rocketDetail?.name }}</v-card-title
    >
    <v-card-tex>
      <v-carousel
        hide-delimiters
        show-arrows="hover"
        v-if="rocketDetail?.flickr_images"
      >
        <v-carousel-item
          v-for="(row, i) in rocketDetail?.flickr_images"
          :key="i"
        >
          <v-img :src="row" contain class="carousel-img"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-card-tex>
    <v-card-text v-if="rocketDetail">
      <RocketCard :data-rocket="rocketDetail"></RocketCard>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRocketStore } from "@/store/store";
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import RocketCard from "@/components/RocketCard.vue";

const rocket = useRocketStore();
const route = useRoute();
onMounted(async () => {
  await rocket.getRocketById(route.params.id as string);
});
const rocketDetail = computed(() => rocket.rocketDetail);
const loading = computed(() => rocket.loading);
</script>

<style lang="scss" scoped>
.carousel-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.skeleton-loader {
  width: 100vw;
  height: 100vh;
}
::v-deep(.v-skeleton-loader__image) {
  width: 100%;
  height: 500px !important;
}
</style>
