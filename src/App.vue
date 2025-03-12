<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="6" color="primary">
        <template v-slot:prepend>
          <v-icon class="ml-5">mdi-rocket</v-icon>
        </template>

        <v-app-bar-title>Rocket App</v-app-bar-title>
      </v-app-bar>
      <Breadcrumbs></Breadcrumbs>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Breadcrumbs from "@/components/breadcrumbs.vue";
//
</script>
