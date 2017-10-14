<!-- The home page. This page displays the kiosk locator. -->

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- Google Maps -->
      <v-card lat class="mb-2">
        <v-toolbar dense light>
          <!-- TODO: optimizations. Debounce the keyup. -->
          <v-text-field v-model="search" @keyup="updateMapCenterToGeolocation(false)" type="text" placeholder="Search locations..." prepend-icon="search" hide-details single-line light />
          <v-btn @click.native="updateMapCenterToGeolocation(true)" icon>
            <v-icon>my_location</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-media height="300px">
          <gmap-map :center="gMapCenter" :zoom="gMapZoom" map-type-id="terrain" style="width: 500px; height: 300px">
            <!-- Markers denoting kiosk locations  -->
            <gmap-marker v-for="location of filteredLocations" :key="location.id" :position="location.coordinate" :clickable="true" @click="updateSearch(location)"/>
          </gmap-map>
        </v-card-media>
      </v-card>

      <!-- Kiosk Locations -->
      <v-card>
        <v-card-title class="title">{{ `Locations (${filteredLocations.length})` }}</v-card-title>

        <!-- Listed locations. -->
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

        <!-- A button that enables users to request a kiosk in their location
        if they don't have one around them or would like more. -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <RequestKioskDialog />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import RequestKioskDialog from '@/components/request-kiosk-dialog'

  export default {
    components: {
      RequestKioskDialog
    },
    data: function () {
      return {
        /**
         * What the user is typing in to the search bar for locating kiosks.
         * @type {String}
         */
        search: '',
        /**
         * Whether the user wants the map to center on their location or not.
         * @type {Boolean}
         */
        isCenteredAtGeolocation: false
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
       * The user's geolocation via HTML5's geolocation GPS API.
       * @type {Object}
       */
      geolocation () {
        return this.$store.state.geolocation
      },
      /**
       * Tries to get the kiosk location that the user is trying to search for.
       * @method filteredLocations
       * @return {Array} - An array of kiosk locations.
       */
      filteredLocations () {
        // allows user to search with tags or individual words
        const filterTags = this.search.toLowerCase().split(' ')

        return this.locations.filter(location => {
          // combine all the searchable criteria and lowercase it
          let locationBlob = location.address + location.retailer + location.state + location.city

          locationBlob = locationBlob.toLowerCase()

          // see if the location matches all provided filter tags
          let matches = true
          filterTags.forEach((filterTag) => {
            if (!locationBlob.includes(filterTag)) {
              matches = false
            }
          })

          return matches
        })
      },
      /**
       * The location the map is currently centered at.
       * @method gMapCenter
       * @return {Object} - Latitudinal and longitudinal coordinates.
       */
      gMapCenter () {
        if (this.isCenteredAtGeolocation) {
          return this.geolocation
        } else {
          return this.filteredLocations.length === 1 ? this.filteredLocations[0].coordinate : {lat: 40.7556469, lng: -73.88191789999996}
        }
      },
      /**
       * The current zoom level of the map.
       * @method gMapZoom
       * @return {Number} - The zoom level of the map. Far to near.
       */
      gMapZoom () {
        return this.filteredLocations.length === 1 ? 15 : 10
      }
    },
    async mounted () {
      // get geolocation of user using HTML5 geolocation API
      await navigator.geolocation.getCurrentPosition((position) => {
        this.$store.commit('updateGeolocation', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    },
    methods: {
      // TODO: We might not need this method since its just a simple assignment.
      /**
       * Updates the Google Map to user's current location if GPS allowed.
       * @method updateMapCenterToGeolocation
       * @return {Void}
       */
      updateMapCenterToGeolocation (value) {
        // reset searchbar if its filled since map display is changing
        if (value) this.search = ''

        this.isCenteredAtGeolocation = value
      },
      updateSearch (location) {
        this.search = location.address
      }
    }
  }
</script>
