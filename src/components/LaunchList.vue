<template>
  <v-data-table
    :headers="headers"
    :items="launches"
    :sort-by="['name', 'date_utc']" 
    :sort-desc="[false, false]"
    item-key="id"
  >
    <template #item.date_utc="{ item }">
      {{ new Date(item.date_utc).toLocaleString() }}
    </template>
    <template #item.img="{ item }">
      <v-icon small class="mr-2" @click="preview(item.links.patch.small)">
        mdi-image-search
      </v-icon>
    </template>
    <template #item.crew="{ item }">
      {{ item.crew.length }}
    </template>
    <template #item.actions="{ item }">
      <v-icon small class="mr-2" @click="selectLaunch(item)">
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>

  <v-dialog
    v-model="dialog"
    width="400px"
  >
    <v-card max-width="400" class="pa-5">
      <img :src="image" alt="Launch Image" />
      <template v-slot:actions>
        <v-btn class="ms-auto" text @click="dialog = false">Ok</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLaunchStore } from '../stores/launches.js';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['launchSelected']);
const launchStore = useLaunchStore();
const dialog = ref(false);
const image = ref(null);
const { fetchLaunches, launches, loading } = storeToRefs(launchStore);

const headers = [
  { title: 'Name', value: 'name', sortable: true },
  { title: 'Launch Time', value: 'date_utc', sortable: true }, 
  { title: 'Image', value: 'img', sortable: false },
  { title: 'Crew Members', value: 'crew', sortable: false },
  { title: 'Detail', value: 'actions', sortable: false },
];

const selectLaunch = (launch) => {
  emit('launchSelected', launchStore.fetchLaunchDetails(launch.id));
};

const preview = (img) => {
  dialog.value = true;
  image.value = img;
};

onMounted(() => {
  launchStore.fetchLaunches();
});
</script>
