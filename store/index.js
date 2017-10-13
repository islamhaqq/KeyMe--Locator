export const state = () => ({
  /**
   * All the retailer stores that a KeyMe kiosk can be found.
   * @type {Array}
   */
  locations: [
    {
      id: 'asdoiasdi2132193OIODioasd234',
      retailer: 'Rite Aid',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY',
      coordinate: {
        lat: 40.7556469,
        lng: -73.88191789999996
      }
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: 'Kroger',
      address: '300 N Dean Rd, Auburn, AL',
      city: 'Auburn',
      state: 'AL',
      coordinate: {
        lat: 32.6107717,
        lng: -85.46340179999999
      }
    },
    {
      id: 'vcbcvbcv3444214214safdasf',
      retailer: 'Rite Aid',
      address: '337 Central Ave, Jersey City, NJ, 07307',
      city: 'Jersey City',
      state: 'NJ',
      coordinate: {
        lat: 40.7465856,
        lng: -74.04924389999996
      }
    },
    {
      id: 'hosadas2132412412',
      retailer: 'Bed Bath & Beyond',
      address: '850 3rd Avenue, Brooklyn, NY, 11232',
      city: 'Brooklyn',
      state: 'NY',
      coordinate: {
        lat: 40.6592281,
        lng: -74.0042818
      }
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '1381 Atlantic Ave, Brooklyn, NY, 11216',
      city: 'Crown Heights',
      state: 'NY',
      coordinate: {
        lat: 40.6786822,
        lng: -73.94443160000003
      }
    },
    {
      id: 'assd45522132132',
      retailer: 'Rite Aid',
      address: 'W 24th Street, NY 282 8th Avenue, New York, NY, 10001',
      city: 'New York',
      state: 'NY',
      coordinate: {
        lat: 40.7459871,
        lng: -73.9975427
      }
    }
  ],
  /**
   * Whether the "request local kiosk" dialog is open or not.
   * @type {Boolean}
   */
  isRequestKioskDialogOpen: false,
  /**
   * All the requests of users for kiosks in their location.
   * @type {Array}
   */
  localKioskRequests: [],
  /**
   * The user's geolocation via HTML5's geolocation GPS API.
   * @type {Object}
   */
  geolocation: {
    /**
     * The latitudinal location of the user fetched by HTML5 gps api.
     * @type {Number}
     */
    lat: null,
    /**
     * The longitudinal locatio nof the user fetched by HTML5 gps api.
     * @type {Number}
     */
    lng: null
  },
  /**
   * Whether the app snackbar is open.
   * @type {Boolean}
   */
  isSnackbarOpen: false,
  snackbarMessage: ''
})

export const mutations = {
  /**
   * Open or close the "request local kiosk" dialog.
   * @method toggleRequestKioskDialog
   * @param  {Object} state - The application level state.
   * @param  {Boolean} payload - Optional parameter whether the dialog is open.
   * @return {Void}
   */
  toggleRequestKioskDialog (state, payload) {
    if (payload) {
      state.isRequestKioskDialogOpen = payload
    } else {
      state.isRequestKioskDialogOpen = !state.isRequestKioskDialogOpen
    }
  },
  /**
   * Add a user request for a kiosk in a location.
   * @method submitLocalKioskRequest
   * @param  {Object} state   - The application level state.
   * @param  {Object} payload - The content of the request the user made.
   * @return {Void}
   */
  submitLocalKioskRequest (state, payload) {
    state.localKioskRequests.push(payload)
  },
  /**
   * Updates the geolocation of the user.
   * @method updateGeolocation
   * @param  {Object} state - The application level state.
   * @param  {Object} payload - The coordinates of the user.
   * @return {Void}
   */
  updateGeolocation (state, payload) {
    state.geolocation = {
      lat: payload.lat,
      lng: payload.lng
    }
  },
  /**
   * Opens or closes the app snackbar.
   * @method toggleSnackbar
   * @param  {Object} state - The application state.
   * @param  {Boolean} payload - Whether to open the snackbar or close.
   * @return {Void}
   */
  toggleSnackbar (state, payload) {
    if (payload.display) state.isSnackbarOpen = payload.display
    if (payload.message) state.snackbarMessage = payload.message
  }
}
