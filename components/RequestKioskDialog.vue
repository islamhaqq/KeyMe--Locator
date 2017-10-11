<!-- A dialog for customers who desire a kiosk near them. This will allow
for analytics to determine priority locaitons for future KeyMe kiosks. -->

<template>
  <v-dialog v-model="isRequestKioskDialogOpen" fullscreen>
    <!-- The button that opens the dialog. -->
    <v-btn slot="activator" color="primary" flat>Request Local Kiosk</v-btn>

    <!-- Main dialog content. -->
    <v-card>
      <v-toolbar dark class="secondary">
        <v-btn @click.native="close" icon>
          <v-icon color="primary">clear</v-icon>
        </v-btn>
        <v-toolbar-title>Request a Local Kiosk</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <p class="mb-3">Don't have a KeyMe kiosk near you? No worries, you can request one and we'll get one setup around your location as soon as possible.</p>

        <form @submit.prevent="submit">
          <v-layout column>
            <!-- User's name. -->
            <v-text-field label="Name" v-model="request.name" prepend-icon="face" />

            <!-- User's email. -->
            <v-text-field type="email" label="Email" v-model="request.email" prepend-icon="email" />

            <!-- The zip code in which the user is requesting a kiosk. -->
            <v-text-field label="Zip Code" v-model="request.zipCode" prepend-icon="location_city" />

            <!-- Any other comments they have regarding their request. -->
            <v-text-field textarea v-model="request.additionalComments" label="Additional comments" prepend-icon="comment" />

            <!-- Button that submits the request form. -->
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-layout>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: function () {
      return {
        request: {
          name: '',
          email: '',
          zipCode: '',
          additionalComments: ''
        }
      }
    },
    computed: {
      isRequestKioskDialogOpen: {
        get () {
          return this.$store.state.isRequestKioskDialogOpen
        },
        set (value) {
          this.$store.commit('toggleRequestKioskDialog', value)
        }
      }
    },
    methods: {
      /**
       * Close the dialog.
       * @method close
       * @return {Void}
       */
      close () {
        this.$store.commit('toggleRequestKioskDialog', false)
      },
      /**
       * Submit the user's request for a local kiosk.
       * @method submit
       * @return {Void}
       */
      submit () {
        this.$store.commit('submitLocalKioskRequest', this.request)

        // close the dialog after successful submission
        this.close()
      }
    }
  }
</script>
