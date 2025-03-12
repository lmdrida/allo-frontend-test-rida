<template>
 <v-card
    class="mx-auto center-screen"
    color="surface-variant"
    :image="myImage"
  >
    <v-card-actions class="align-self-start justify-center">
      <v-btn
        @click="$router.push('/')"
        color="blue"
        variant="flat"
        height="45"
        width="200"
      >
        Back Home</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
// import an image
import myImage from "@/assets/page-not-found.jpg"

</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
