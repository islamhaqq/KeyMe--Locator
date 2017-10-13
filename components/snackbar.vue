<!-- The snackbar that displays in the bottom of the app. Can be configured to
close or open whenever, provided with a message. -->

<template>
  <v-snackbar v-model="isSnackbarOpen" bottom>
    <!-- TODO: default message? -->
    <span>{{ snackbarMessage }}</span>
    <v-btn @click.native="isSnackbarOpen = false" flat color="pink">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    computed: {
      /**
       * Whether the snackbar is open/displaying or not.
       * @type {Boolean}
       */
      isSnackbarOpen: {
        /**
         * Gets whether the snackbar is open or not.
         * @method get
         * @return {Boolean} - Whether the snackbar is open or not.
         */
        get () {
          return this.$store.state.isSnackbarOpen
        },
        /**
         * Opens or closes the snackbar.
         * @method set
         * @param  {Boolean} value - Whether to open orclose the snackbar.
         */
        set (value) {
          this.$store.commit('toggleSnackbar', {
            display: value
          })
        }
      },
      /**
       * The text displaying in the snackbar.
       * @method snackbarMessage
       * @return {String} - The snackbar message.
       */
      snackbarMessage () {
        return this.$store.state.snackbarMessage
      }
    }
  }
</script>
