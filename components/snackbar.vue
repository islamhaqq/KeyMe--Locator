<!-- The app snackbar. -->

<template>
  <v-snackbar v-model="isSnackbarOpen" bottom>
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
        get () {
          return this.$store.state.isSnackbarOpen
        },
        set (value) {
          this.$store.commit('toggleSnackbar', {
            display: value
          })
        }
      },
      snackbarMessage () {
        return this.$store.state.snackbarMessage
      }
    }
  }
</script>
