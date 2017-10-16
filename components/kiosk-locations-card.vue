<!-- A card displaying a list of all the kiosk locations that is clickable
which updates the google maps and search to focus on the location. This then
allows users to open the location details. -->

<template>
  <!-- Kiosk Locations -->
  <v-card>
    <v-card-title class="title">
      {{ `Locations (${filteredLocations.length})` }}
    </v-card-title>

    <!-- Listed kiosk locations. -->
    <v-list three-line>
      <!-- Clicking a location will update the GMap. -->
      <v-list-tile v-for="location of filteredLocations" :key="location.id" @click="focusOnLocation(location)" class="mb-3">
        <!-- Icon. -->
        <v-list-tile-action>
          <v-icon color="primary">location_on</v-icon>
        </v-list-tile-action>

        <!-- Kiosk location details. -->
        <v-list-tile-content>
          <v-list-tile-title>{{ location.retailer }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ `${location.city}, ${location.state}` }}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="accent--text">
            {{ location.address }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- A button that enables users to request a kiosk in their location
      if they don't have one around them or would like more. -->
      <RequestKioskDialog />
    </v-card-actions>
  </v-card>
</template>

<script>
  import RequestKioskDialog from '@/components/request-kiosk-dialog'
  import LocationDetails from '@/components/location-details'

  export default {
    components: {
      RequestKioskDialog,
      LocationDetails
    },
    computed: {
      /**
       * Tries to get the kiosk location that the user is trying to search for.
       * @method filteredLocations
       * @return {Array} - An array of kiosk locations.
       */
      filteredLocations () {
        return this.$store.getters.filteredLocations
      }
    },
    methods: {
      /**
       * Update the search query so that GMaps focuses on the specified
       * location, which triggers the location details FAB to display.
       * @method focusOnLocation
       * @param  {Object} location - The store/kiosk location meta.
       * @return {Void}
       */
      focusOnLocation (location) {
        this.$store.commit('updateSearch', location.address)
      }
    }
  }
</script>
