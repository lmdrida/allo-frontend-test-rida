<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <p><b>Name :</b></p>
          {{ dataRocket?.name }}
        </v-col>
        <v-col>
          <p><b>Country :</b></p>
          {{ dataRocket?.country }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p><b>First Flight :</b></p>
          {{ dataRocket?.first_flight }}
        </v-col>
        <v-col>
          <p><b>Cost Per Launch :</b></p>
          {{ formatted(dataRocket?.cost_per_launch) }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p><b>Company :</b></p>
          {{ dataRocket?.company }}
        </v-col>
        <v-col>
          <p><b>Status :</b></p>
          <v-chip
            :color="dataRocket?.active ? 'green' : 'red'"
            variant="outlined"
            size="small"
            >{{ dataRocket?.active ? "Active" : "Inactive" }}</v-chip
          >
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col>
          <p><b>Description :</b></p>
          {{ dataRocket?.description }}
        </v-col>
      </v-row>

      <v-divider></v-divider>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        :href="'https://en.wikipedia.org/wiki/Falcon_1'"
        target="_blank"
        >Read More</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  dataRocket: Object,
});
const formatted = (data: any) => {
  return data?.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
</script>

<style scoped></style>
