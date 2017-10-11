<template>
  <v-app dark>
    <NavToolbar />
    <main>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import NavToolbar from '@/components/NavToolbar'

  export default {
    components: {
      NavToolbar
    }
  }
</script>
