<template>
  <v-card class="ma-5" rounded="0">
    <v-card-text class="py-0 font-weight-medium">
      <v-breadcrumbs
        class="py-4"
        :items="breadcrumbs"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const breadcrumbs = computed(() => route.meta.breadcrumb);
</script>
<style>
.v-breadcrumbs-item {
  padding: 0px 2.5px !important;
}
</style>
