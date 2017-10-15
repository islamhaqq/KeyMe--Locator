<!-- A floating action button that allows
users to see the store details of the store
they are focusing on. -->

<template>
  <v-btn v-if="showOpenLocationDetailsFAB" @click.native="toggleLocationDetails" color="accent" light fixed small  bottom right fab>
    <v-icon>store</v-icon>
  </v-btn>
</template>

<script>
  export default {
    computed: {
      /**
       * Whether to show the FAB under the condition that the user is
       * "focusing" on a store/kiosk location or not. All the user has to do is
       * type in the search bar to find one store and the FAB will appear.
       * @method showOpenLocationDetailsFAB
       * @return {Boolean} - Whether to
       */
      showOpenLocationDetailsFAB () {
        return this.$store.getters.filteredLocations.length === 1
      }
    },
    methods: {
      /**
       * Opens the location details bottom sheet.
       * @method toggleLocationDetails
       * @return {Void}
       */
      toggleLocationDetails () {
        this.$store.commit('toggleLocationDetails', {
          visible: true,
          location: this.$store.getters.filteredLocations[0]
        })
      }
    }
  }
</script>
