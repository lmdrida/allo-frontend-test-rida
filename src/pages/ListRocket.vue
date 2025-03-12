<template>
  <v-card class="ma-5">
    <v-data-iterator
      :items="search ? filterRockets : rocketList"
      :items-per-page="rocketList.length"
      :loading="loading"
    >
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            clearable
            hide-details
            @input="onSearch()"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="primary"
            size="large"
            @click="openAddRocket = true"
          >
            <template v-slot:prepend> <v-icon>mdi-plus</v-icon> </template
            ><span>Add Rocket</span>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="(item, i) in items" :key="i" cols="auto" md="6">
              <v-card class="pb-3" flat>
                <v-carousel hide-delimiters show-arrows="hover">
                  <v-carousel-item
                    v-for="(image, i) in item.raw.flickr_images"
                    :key="i"
                    :src="image"
                    cover
                  ></v-carousel-item>
                </v-carousel>

                <v-list-item :subtitle="item.raw.description" class="mb-2">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.name }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis me-1"
                  >
                    <v-icon icon="mdi-rocket" start></v-icon>

                    <div class="text-truncate">
                      {{ item.raw.company }} - {{ item.raw.country }}
                    </div>
                  </div>

                  <v-btn
                    class="text-none"
                    size="small"
                    text="More Details"
                    variant="outlined"
                    color="grey"
                    @click="$router.push(`/rocket/${item.raw.id}`)"
                  >
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:loader>
        <v-row>
          <v-col
            v-for="(_, k) in [0, 1, 2, 3]"
            :key="k"
            cols="12"
            sm="6"
            xl="3"
          >
            <v-skeleton-loader
              class="border"
              type="image, article"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
      <template v-slot:no-data>
        <v-row>
          <v-col>
            <v-card class="text-center ma-5" color="lighten-3">
              <v-card-text>
                <v-icon size="100">mdi-rocket-launch</v-icon>
                <p class="text-h5">No Data</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-card>
  <DialogInfo v-if="openDialog" v-model="openDialog"></DialogInfo>
  <AddRocket
    v-if="openAddRocket"
    v-model="openAddRocket"
    @add="pushList"
  ></AddRocket>
</template>

<script setup lang="ts">
import { useRocketStore } from "@/store/store";
import { onMounted, computed, ref } from "vue";
import DialogInfo from "@/components/DialogInfo.vue";
import AddRocket from "@/pages/AddRocket.vue";

const rocket = useRocketStore();
onMounted(async () => {
  await rocket.getRocketList();
});

const rocketList = computed(() => rocket.rocketList);
const filterRockets = ref<
  {
    id: string;
    name: string;
    description: string;
    company: string;
    country: string;
    flickr_images: string[];
  }[]
>([]);
const loading = computed(() => rocket.loading);
const search = ref("");
const openAddRocket = ref(false);
const openDialog = computed(() => rocket.open);
const onSearch = () => {
  filterRockets.value = rocketList.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase());
  });
};

const pushList = (data: any) => {
  rocket.setSuccess("Rocket added successfully.");
  rocketList.value.unshift(data);
};
</script>

<style scoped>
.res-img {
  width: 100%;
  height: 480px;
}
</style>
