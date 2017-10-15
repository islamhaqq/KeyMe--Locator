<template>
  <v-btn v-if="showOpenLocationDetailsFAB" @click.native="toggleLocationDetails" color="accent" light small absolute bottom left fab>
    <v-icon>store</v-icon>
  </v-btn>
</template>

<script>
  export default {
    computed: {
      showOpenLocationDetailsFAB () {
        return this.$store.getters.filteredLocations.length === 1
      }
    },
    methods: {
      toggleLocationDetails () {
        this.$store.commit('toggleLocationDetails', {
          visible: true,
          location: this.$store.getters.filteredLocations[0]
        })
      }
    }
  }
</script>
