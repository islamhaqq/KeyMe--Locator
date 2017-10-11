/**
 * Configuration & installation of Vue's Google Maps service.
 */

import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

// install the package while specifying the API key and GMAP libraries to use
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDiDSE1n9M809VxrXaVjEFzV47mdGMAbHo',
    libraries: 'places'
  }
})
