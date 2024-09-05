<template>
   <v-container class="mt-15 d-flex flex-column align-center" >
    <LaunchList @launchSelected="handleLaunchSelected" />
    <LaunchDetails v-if="selectedLaunch" :launch="selectedLaunch" @close="handleClose" />
   </v-container>
 
</template>

<script setup>
import { ref } from 'vue';

const selectedLaunch = ref(null);

const handleLaunchSelected = (launch) => {
  selectedLaunch.value = launch;
};

const handleClose = () => {
  selectedLaunch.value = null; 
};
</script>
