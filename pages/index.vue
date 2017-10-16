<!-- The home page. This page displays the kiosk locator. -->

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="headline text-xs-center">Find the Closest Kiosk</h1>

      <!-- A Google Maps card displaying kiosk locations. -->
      <GoogleMapsCard />

      <!-- Kiosk Locations -->
      <KioskLocationsCard />
    </v-flex>

    <!-- Bottom sheet that opens up displaying kiosk/store details. -->
    <LocationDetails />
  </v-layout>
</template>

<script>
  import LocationDetails from '@/components/location-details'
  import GoogleMapsCard from '@/components/google-maps-card'
  import KioskLocationsCard from '@/components/kiosk-locations-card'

  export default {
    components: {
      LocationDetails,
      GoogleMapsCard,
      KioskLocationsCard
    }
  }
</script>
