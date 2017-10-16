<!-- The location details component is a bottom sheet similar to a dialog
that displays a store's details regarding the KeyMe kiosks. It includes meta
such as store hours, the keys that are available, as well as the retailer and
address. It also allows users to get directions to the area. -->

<template>
  <v-bottom-sheet v-model="isLocationDetailsOpen" v-if="isLocationDetailsOpen" :scrollable="true" full-width>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-subheader>{{ locationDetails.retailer }}</v-subheader>
          <v-subheader>{{ locationDetails.address }}</v-subheader>

          <!-- Button that takes user to Google Maps for directions to the
          kiosk. -->
          <v-list-tile>
            <v-list-tile-content>
              <v-btn :href="directions" rel="noopener noreferrer" target="_blank" color="primary">
                GET DIRECTIONS
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>

          <!-- Extra details on the store. -->
          <v-subheader>STORE INFORMATION</v-subheader>
          <!-- Store phone number. -->
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Phone Number
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ locationDetails.phoneNumber }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group>
            <!-- Expandable list item to display store hours. -->
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>store</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Store Hours</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <!-- Sub list items that reveal when user clicks the expandable
            list item. -->
            <v-list-tile v-for="(storeHour, day) in locationDetails.storeHours" :key="day">
              <v-list-tile-content>
                <v-list-tile-title>{{ day }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ storeHour }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>date_range</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-subheader>AVAILABLE KEYS</v-subheader>
        </v-list>

        <!-- The keys the kiosk in the store that customers can purchase. -->
        <v-carousel>
          <v-carousel-item v-for="(availableKey, name) in locationDetails.availableKeys" v-bind:src="availableKey.src" :key="name" />
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import querystring from 'querystring'

  export default {
    computed: {
      /**
       * Whether the location details bottom sheet is visible or not.
       * @type {Object}
       */
      isLocationDetailsOpen: {
        /**
         * Accesses the vuex store to get whether the bottom sheet should be
         * opened or not.
         * @method get
         * @return {Boolean} - Whether the location details bottom sheet is
         * visible or not.
         */
        get () {
          return this.$store.state.locationDetails.visible
        },
        /**
         * Updates the vuex store state to close the bottom sheet and as well
         * as clear the store location to get data from.
         * @method set
         */
        set () {
          this.$store.commit('toggleLocationDetails', {
            visible: false,
            location: {}
          })
        }
      },
      /**
       * The meta information on the store such as store hours, keys available,
       * etc.
       * @method locationDetails
       * @return {Object} - Information on the kiosk & store.
       */
      locationDetails () {
        return this.$store.state.locationDetails.location
      },
      /**
       * Gets the google maps directions url to direct user to use the GMaps
       * app or web app for the directions to the kiosk in the store.
       * See developers.google.com/maps/documentation for more info.
       * @method directions
       * @return {String} - The url to get directions to the store.
       */
      directions () {
        const baseURI = 'https://www.google.com/maps/dir/?api=1&'

        // add in parameters for the directions url
        const parameters = {
          origin: `${this.$store.state.geolocation.lng},${this.$store.state.geolocation.lat}`,
          destination: `${this.locationDetails.address}`
        }

        // convert parameter into queryable string for GMaps API
        return baseURI + querystring.stringify(parameters)
      }
    }
  }
</script>
