<!-- The app snackbar. -->

<template>
  <v-snackbar v-model="snackbar.display" bottom>
    <span>{{ snackbar.message }}</span>
    <!-- <v-btn @click.native="snackbar.display = false" flat color="pink">
      Close
    </v-btn> -->
  </v-snackbar>
</template>

<script>
  export default {
    computed: {
      /**
       * Whether the snackbar is open/displaying or not.
       * @type {Boolean}
       */
      snackbar: {
        get () {
          return this.$store.state.snackbar
        },
        set (value) {
          this.$store.commit('toggleSnackbar', {
            display: value
          })
        }
      }
    }
  }
</script>
