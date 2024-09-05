<template>
  <v-dialog v-model="isDialogOpen" max-width="500" persistent>
    <v-card v-if="selectedLaunch">
      <v-card-title>{{ selectedLaunch.name }}</v-card-title>
      <v-card-text>
        <div>
          Launch Time: {{ new Date(selectedLaunch.date_utc).toLocaleString() }}
        </div>
        <div v-if="selectedLaunch.rocket">
          Rocket: {{ selectedLaunch.rocket.name }}
        </div>
        <div v-if="selectedLaunch.crew">
          Crew Members:
          {{ selectedLaunch.crew.length === 0 ? "0": selectedLaunch.crew }}
        </div>
        <div v-if="selectedLaunch.launchpad">
          Launchpad: {{ selectedLaunch.launchpad.name }}
        </div>
        <div>{{ selectedLaunch.details }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useLaunchStore } from "../stores/launches.js";

const launchStore = useLaunchStore();
const selectedLaunch = computed(() => launchStore.selectedLaunch);
const isDialogOpen = computed(() => !!selectedLaunch.value);

const closeDialog = () => {
  launchStore.clearSelectedLaunch();
};
</script>
