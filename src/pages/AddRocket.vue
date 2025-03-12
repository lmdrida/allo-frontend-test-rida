<template>
  <div>
    <v-dialog :model-value="modelValue" max-width="500" persistent>
      <v-card>
        <v-card-title>
          <p class="headline font-weight-bold fz-20 py-4">
            <span>Add Rocket</span>
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-center">
          <v-row>
            <v-col class="pb-0">
              <p class="text-start"><b>Rocket Name*</b></p>
              <v-text-field
                flat
                variant="outlined"
                maxlength="30"
                v-model="name"
                placeholder="Rocket Name"
                :error-messages="
                  $v.name?.$errors?.length
                    ? String($v.name.$errors[0].$message)
                    : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <p class="text-start"><b>Cost Per Launch*</b></p>
              <v-text-field
                flat
                variant="outlined"
                maxlength="10"
                prefix="$"
                v-model="costPerLaunch"
                @keypress="isNumber($event)"
                placeholder="Cost Per Launch"
                :error-messages="
                  $v.costPerLaunch?.$errors?.length
                    ? String($v.costPerLaunch.$errors[0].$message)
                    : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <p class="text-start"><b>First Flight*</b></p>
              <v-text-field
                flat
                variant="outlined"
                v-model="firstFlight"
                placeholder="First Flight"
                type="date"
                :error-messages="
                  $v.firstFlight?.$errors?.length
                    ? String($v.firstFlight.$errors[0].$message)
                    : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <p class="text-start"><b>Country*</b></p>
              <v-select
                v-model="country"
                variant="outlined"
                placeholder="Choose Country"
                :items="countries"
                item-value="value"
                item-title="text"
                :error-messages="
                  $v.country?.$errors?.length
                    ? String($v.country.$errors[0].$message)
                    : ''
                "
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <p class="text-start"><b>Description*</b></p>
              <v-textarea
                flat
                variant="outlined"
                maxlength="300"
                v-model="description"
                placeholder="Description"
                :error-messages="
                  $v.description?.$errors?.length
                    ? String($v.description.$errors[0].$message)
                    : ''
                "
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-btn color="grey" block depressed @click="onCancel()">
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                block
                @click="onSubmit()"
                :loading="loading"
              >
                Submit
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
import { computed, ref } from "vue";
import { countries, imagesRocket, randomString } from "@/lib/data";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const rocket = useRocketStore();
const props = defineProps({
  modelValue: Boolean,
  action: String,
});
const emit = defineEmits(["update:modelValue", "add"]);
const rocketList = computed(() => rocket.rocketList);
const name = ref("");
const country = ref();
const costPerLaunch = ref();
const description = ref();
const firstFlight = ref();
const loading = computed(() => rocket.loading);
const info = computed(() => rocket.info);
const $v = useVuelidate(
  {
    name: {
      required: helpers.withMessage("Name couldn't be empty.", required),
    },
    costPerLaunch: {
      required: helpers.withMessage(
        "Cost Per Launch couldn't be empty.",
        required
      ),
    },
    firstFlight: {
      required: helpers.withMessage(
        "First Flight couldn't be empty.",
        required
      ),
    },
    country: {
      required: helpers.withMessage("Country couldn't be empty.", required),
    },
    description: {
      required: helpers.withMessage("Description couldn't be empty.", required),
    },
  },
  { name, costPerLaunch, firstFlight, country, description }
);
const onSubmit = () => {
  $v.value.$touch();
  if ($v.value.$errors.length) {
    return;
  }
  const dataUpdate = { ...rocketList.value[0] };

  (dataUpdate.name = name.value),
    (dataUpdate.country = country.value),
    (dataUpdate.cost_per_launch = parseInt(costPerLaunch.value)),
    (dataUpdate.description = description.value),
    (dataUpdate.first_flight = firstFlight.value),
    (dataUpdate.flickr_images = imagesRocket),
    (dataUpdate.id = randomString(24)),
    // rocketList.value.unshift(dataUpdate);
    // rocket.setSuccess("Success Add Rocket");
  emit("add", dataUpdate);
  emit("update:modelValue", false);
};
const onCancel = () => {
  emit("update:modelValue", false);
};
const isNumber = (e: KeyboardEvent) => {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  } else {
    return true;
  }
};
</script>

<style lang="scss" scoped>
.fz-20 {
  font-size: 20px;
}
.fz-70 {
  font-size: 70px;
}
:deep(.v-messages__message) {
  float: left;
}
</style>
