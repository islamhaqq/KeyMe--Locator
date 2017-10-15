<!-- The home page. This page displays the kiosk locator. -->

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- Google Maps -->
      <v-card lat class="mb-2">
        <v-toolbar dense light>
          <!-- TODO: optimizations. Debounce the keyup. -->
          <v-text-field v-model="search" type="text" placeholder="Search locations..." prepend-icon="search" hide-details single-line light />
          <v-tooltip bottom>
            <v-btn @click.native="goToGeolocation" icon slot="activator">
              <v-icon>my_location</v-icon>
            </v-btn>
            <span>Go to your location</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-media height="300px">
          <v-layout align-center row>
            <gmap-map v-if="geolocation.lat" :center="gMapCenter" @center_changed="reportNewCenter" :zoom="gMapZoom" map-type-id="terrain" style="width: 100%; height: 100%">
              <!-- Markers denoting kiosk locations  -->
              <gmap-marker v-for="location of filteredLocations" :key="location.id" :position="location.coordinates" :clickable="true" @click="updateSearch(location)" @dblclick="toggleLocationDetails(location)"/>
            </gmap-map>
            <v-flex v-else class="text-xs-center">
              <v-progress-circular indeterminate :size="128" color="primary" />
            </v-flex>
          </v-layout>
        </v-card-media>
      </v-card>

      <!-- Kiosk Locations -->
      <v-card>
        <v-card-title class="title">
          {{ `Locations (${filteredLocations.length})` }}
        </v-card-title>

        <!-- Listed locations. -->
        <v-list three-line>
          <v-list-tile v-for="location of filteredLocations" :key="location.id" @click="updateSearch(location)" class="mb-3">
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

  export default {
    components: {
      RequestKioskDialog,
      LocationDetails
    },
    data: function () {
      return {
        /**
         * What the user is typing in to the search bar for locating kiosks.
         * @type {String}
         */
        search: '',
        reportedCenter: {
          lat: null,
          lng: null
        }
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
      updateSearch (location) {
        this.search = location.address
      },
      reportNewCenter (reportedCenter) {
        this.reportedCenter.lat = reportedCenter.lat()
        this.reportedCenter.lng = reportedCenter.lng()
      },
      goToGeolocation () {
        // clear the search input
        this.search = ''
      },
      toggleLocationDetails (location) {
        this.$store.commit('toggleLocationDetails', {
          visible: true,
          location: location
        })
      }
    }
  }
</script>
