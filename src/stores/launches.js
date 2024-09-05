import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://api.spacexdata.com/v4';

export const useLaunchStore = defineStore('launchStore', {
  state: () => ({
    launches: [],
    selectedLaunch: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLaunches() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/launches`);
        this.launches = response.data;
      } catch (err) {
        this.error = 'Failed to fetch launches';
      } finally {
        this.loading = false;
      }
    },

    async fetchLaunchDetails(launchId) {
      this.loading = true;
      this.error = null;
      try {
        const launch = this.launches.find(l => l.id === launchId);
        if (launch) {
          const rocket = await axios.get(`${API_URL}/rockets/${launch.rocket}`);
          const crew = await Promise.all(launch.crew.map((id) => axios.get(`${API_URL}/crew/${id}`)));

          const launchpad = await axios.get(`${API_URL}/launchpads/${launch.launchpad}`);
          this.selectedLaunch = {
            ...launch,
            rocket: rocket.data,
            crew: crew.map(c => c.data.name),
            launchpad: launchpad.data,
          };

        }
      } catch (err) {
        this.error = 'Failed to fetch launch details';
      } finally {
        this.loading = false;
      }
    },

    clearSelectedLaunch() {
      this.selectedLaunch = null;
    }
  },
});
