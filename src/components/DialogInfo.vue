<template>
  <div>
    <v-dialog :model-value="modelValue" max-width="500" persistent>
      <v-card>
        <v-card-title>
          <p class="headline font-weight-bold fz-20 py-4">
            <v-icon class="mb-1">mdi-information-outline</v-icon>
            <span class="ml-2">Information</span>
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-center">
          <v-row>
            <v-col class="fz-70"
              ><v-icon color="green" v-if="action === 'success'"
                >mdi-check-circle-outline</v-icon
              >
              <v-icon color="red" v-else
                >mdi-close-circle-outline</v-icon
              ></v-col
            >
          </v-row>
        </v-card-text>
        <v-card-text class="pb-0 text-center" v-if="action !== 'success'">
          <p class="font-weight-bold fz-20">Something Went Wrong</p>
        </v-card-text>
        <v-card-text class="pb-0 text-center">
          <p class="font-weight-bold fz-20">{{ info }}</p>
        </v-card-text>
        <v-card-text v-if="action === 'success'">
          <v-row>
            <v-col
              ><v-btn color="green" block depressed @click="onCancel()">
                Close
              </v-btn></v-col
            >
          </v-row>
        </v-card-text>

        <v-card-text v-else>
          <v-row class="my-2">
            <v-col cols="6">
              <v-btn color="grey" block depressed @click="onCancel()">
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="red" block @click="onRetry()" :loading="loading">
                Retry Request
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useRocketStore } from "@/store/store";
import { computed } from "vue";

const rocket = useRocketStore();
const props = defineProps({
  modelValue: Boolean,
  action: String,
});
const loading = computed(() => rocket.loading);
const info = computed(() => rocket.info);
const action = computed(() => rocket.action);
const onRetry = () => {
  rocket.getRocketList();
};
const onCancel = () => {
  rocket.open = false;
};
</script>

<style lang="scss" scoped>
.fz-20 {
  font-size: 20px;
}
.fz-70 {
  font-size: 70px;
}
</style>
