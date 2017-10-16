<!-- Google Maps displayed in a card hooked up to the Vuex store. -->

<template>
  <v-card lat class="mb-2">
    <v-toolbar dense light>
      <!-- TODO: optimizations. Debounce the keyup. -->
      <v-text-field v-model="search" type="text" placeholder="Search locations..." prepend-icon="search" hide-details single-line light />

      <!-- TODO: fix issue where you can't go to geolocation after panning.
      Make use of reportedCenter. -->
      <v-btn @click.native="goToGeolocation" icon>
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Map display. -->
    <v-card-media height="300px">
      <v-layout align-center row>
        <gmap-map v-if="geolocation.lat" :center="gMapCenter" @center_changed="reportNewCenter" :zoom="gMapZoom" map-type-id="terrain" style="width: 100%; height: 100%">
          <!-- Markers denoting kiosk locations  -->
          <gmap-marker v-for="location of filteredLocations" :key="location.id" :position="location.coordinates" :clickable="true" @click="focusOnLocation(location)" />
        </gmap-map>
        <v-flex v-else class="text-xs-center">
          <v-progress-circular indeterminate :size="128" color="primary" />
        </v-flex>
      </v-layout>
    </v-card-media>
  </v-card>
</template>

<script>
  import RequestKioskDialog from '@/components/request-kiosk-dialog'

  export default {
    components: {
      RequestKioskDialog
    },
    data: function () {
      return {
        reportedCenter: {
          lat: null,
          lng: null
        }
      }
    },
    computed: {
      /**
       * What the user is typing in to the search bar for locating kiosks.
       * @type {String}
       */
      search: {
        /**
         * Get what the user typed in the search bar.
         * @method get
         * @return {String} - What the user typed in the search bar.
         */
        get () {
          return this.$store.state.search
        },
        /**
         * Update the search bar input with the new input.
         * @method set
         * @param {String} newInput - The new search query.
         */
        set (newInput) {
          this.$store.commit('updateSearch', newInput)
        }
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
        return this.$store.getters.filteredLocations
      },
      /**
       * The location the map is currently centered at.
       * @method gMapCenter
       * @return {Object} - Latitudinal and longitudinal coordinates.
       * Automatically centers to user search request. Otherwise defaults
       * to geolocation.
       */
      gMapCenter () {
        return this.filteredLocations.length === 1 ? this.filteredLocations[0].coordinates : this.geolocation
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
      try {
        // get geolocation of user using HTML5 geolocation API
        await navigator.geolocation.getCurrentPosition((position) => {
          this.$store.commit('updateGeolocation', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    methods: {
      reportNewCenter (reportedCenter) {
        this.reportedCenter.lat = reportedCenter.lat()
        this.reportedCenter.lng = reportedCenter.lng()
      },
      goToGeolocation () {
        // clear the search input
        this.search = ''
      },
      /**
       * Update the search query so that GMaps focuses on the specified
       * location, which triggers the location details FAB to display.
       * @method focusOnLocation
       * @param  {Object} location - The store/kiosk location meta.
       * @return {Void}
       */
      focusOnLocation (location) {
        this.search = location.address
      }
    }
  }
</script>
