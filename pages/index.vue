<!-- The home page. This page displays the kiosk locator. -->

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- Google Maps -->
      <GoogleMapsCard />

      <!-- Kiosk Locations -->
      <v-card>
        <v-card-title class="title">
          {{ `Locations (${filteredLocations.length})` }}
        </v-card-title>

        <!-- Listed locations. -->
        <v-list three-line>
          <v-list-tile v-for="location of filteredLocations" :key="location.id" @click="focusOnLocation(location)" class="mb-3">
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>
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

        <!-- A button that enables users to request a kiosk in their location
        if they don't have one around them or would like more. -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <RequestKioskDialog />
        </v-card-actions>
      </v-card>
    </v-flex>
    <LocationDetails />
  </v-layout>
</template>

<script>
  import RequestKioskDialog from '@/components/request-kiosk-dialog'
  import LocationDetails from '@/components/location-details'
  import GoogleMapsCard from '@/components/google-maps-card'

  export default {
    components: {
      RequestKioskDialog,
      LocationDetails,
      GoogleMapsCard
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
