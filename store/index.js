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
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    },
    {
      id: 'zxpocxzopc2131242421',
      retailer: '7 Eleven',
      address: '85-10 Northern Boulevard, Jackson Heights, NY, 11372',
      city: 'Jackson Heights',
      state: 'NY'
    }
  ],
  /**
   * Whether the "request local kiosk" dialog is open or not.
   * @type {Boolean}
   */
  isRequestKioskDialogOpen: false
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
  }
}
