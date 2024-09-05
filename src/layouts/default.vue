<template>
  <v-app>
    <v-app-bar dark>
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1920px-SpaceX-Logo.svg.png"
        alt="SpaceX Logo"
        contain
        max-height="50"
        class="mr-4"
      />

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class=" ">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>

</script>
