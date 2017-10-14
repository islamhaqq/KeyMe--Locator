<!-- The application layout containing how the UI is structured at every
route. -->

<template>
  <v-app dark>
    <NavToolbar />
    <main>
      <v-content>
        <v-container>
          <v-slide-y-transition mode="out-in">
            <nuxt />
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
    <Snackbar />
  </v-app>
</template>

<script>
  import NavToolbar from '@/components/nav-toolbar'
  import Snackbar from '@/components/snackbar'

  export default {
    components: {
      NavToolbar,
      Snackbar
    }
  }
</script>
