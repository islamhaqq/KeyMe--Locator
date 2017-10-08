<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>
      <v-card>
        <v-card-title class="title">Locations</v-card-title>
        <!-- <v-card-text> -->
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
        <!-- </v-card-text> -->
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
