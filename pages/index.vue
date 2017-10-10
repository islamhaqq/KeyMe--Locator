<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- Google Maps -->
      <v-card
        img="/google-maps.jpg"
        flat
        height="300px"
        class="mb-2"
      >
        <v-toolbar
          dense
          light
        >
          <v-text-field prepend-icon="search" hide-details single-line light></v-text-field>
          <v-btn icon>
            <v-icon>my_location</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>

      <!-- Kiosk Locations -->
      <v-card>
        <v-card-title class="title">Locations</v-card-title>

        <v-list>
          <v-list-tile v-for="location of locations" :key="location.id" three-line class="mb-3">
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ location.retailer }}</v-list-tile-title>
              <v-list-tile-sub-title>
                {{ `${location.city}, ${location.state}` }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                {{ location.address }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary flat>Request Local Kiosk</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      locations () {
        return this.$store.state.locations
      }
    }
  }
</script>
