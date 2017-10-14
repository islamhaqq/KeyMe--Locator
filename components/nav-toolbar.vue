<!-- The app layout toolbar that provides basic navigation and branding. -->

<template>
  <v-toolbar fixed app>
    <img src="~assets/key-me-logo.png"/>
    <v-toolbar-title class="ml-0">
      <span class="black--text">Key</span>
      <span class="primary--text">Me</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span class="title">Kiosk Locator</span>
  </v-toolbar>
</template>

<script>
  export default {}
</script>

<style lang="stylus" scoped>
  img
    height 100%
    transform scale(.8)
</style>
