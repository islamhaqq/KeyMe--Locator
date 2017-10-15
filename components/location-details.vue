<template>
  <v-bottom-sheet v-model="isLocationDetailsOpen" v-if="isLocationDetailsOpen" :scrollable="true" full-width>
    <v-card>
      <v-card-text>
        <v-list two-line>
          <v-subheader>{{ locationDetails.retailer }}</v-subheader>
          <v-subheader>{{ locationDetails.address }}</v-subheader>

          <!-- Button that takes user to Google Maps for directions. -->
          <v-list-tile>
            <v-list-tile-content>
              <v-btn @click.native="getDirections" color="primary">
                GET DIRECTIONS
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>

          <v-subheader>STORE INFORMATION</v-subheader>
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

            <v-list-tile v-for="(storeHour, day) in locationDetails.storeHours">
              <v-list-tile-content>
                <v-list-tile-title>{{ day }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ storeHour }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>date_range</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  export default {
    computed: {
      isLocationDetailsOpen: {
        get () {
          return this.$store.state.locationDetails.visible
        },
        set () {
          this.$store.commit('toggleLocationDetails', {
            visible: false,
            location: {}
          })
        }
      },
      locationDetails () {
        return this.$store.state.locationDetails.location
      }
    },
    methods: {
      getDirections () {
        console.log('get directions')
      }
    }
  }
</script>
