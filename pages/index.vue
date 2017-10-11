<!-- The home page. This page displays the kiosk locator. -->

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- Google Maps -->
      <v-card img="/google-maps.jpg" height="300px" flat class="mb-2">
        <v-toolbar dense light>
          <v-text-field v-model="search" type="text" placeholder="Search locations..." prepend-icon="search" hide-details single-line light />
          <v-btn icon>
            <v-icon>my_location</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>

      <!-- Kiosk Locations -->
      <v-card>
        <v-card-title class="title">Locations</v-card-title>

        <v-list three-line>
          <v-list-tile v-for="location of filteredLocations" :key="location.id" class="mb-3" ripple>
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <RequestKioskDialog />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import RequestKioskDialog from '@/components/RequestKioskDialog'

  export default {
    components: {
      RequestKioskDialog
    },
    data: function () {
      return {
        search: ''
      }
    },
    computed: {
      /**
       * Gets all the data on all the locations kiosks are present in.
       * @method locations
       * @return {Array} - An array of kiosk location objects.
       */
      locations () {
        return this.$store.state.locations
      },
      /**
       * Tries to get the kiosk location that the user is trying to search for.
       * @method filteredLocations
       * @return {Array} - An array of kiosk locations.
       */
      filteredLocations () {
        return this.locations.filter(location => {
          return (
            location.address.toLowerCase().includes(this.search.toLowerCase()) || location.retailer.toLowerCase().includes(this.search.toLowerCase()) ||
            location.state.toLowerCase().includes(this.search.toLowerCase()) ||
          location.city.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      }
    }
  }
</script>
