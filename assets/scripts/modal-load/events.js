const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

//  Populate the modals
const onViewAlbumDetail = (event) => {
  event.preventDefault()
  $('.view-album-modal-alert').hide()
  const num = event.currentTarget.id.replace('modify-', '')
  // console.log('view Album Detail')
  store.album = null

  // Store selection to pass as argument
  api.getAlbumInfo(num)
    .then(ui.getAlbumInfoSuccess)
    .catch(ui.getAlbumInfoFailure)
  // console.log('Get Album Ratings')
  onGetAlbumRating(num)
  $('#viewAlbumForm').modal({backdrop: 'static', keyboard: false})
}

// Get album specific Rating information
const onGetAlbumRating = (num) => {
  // console.log('run Album get2')
  api.getAlbumRatingInfo(num)
    .then(ui.getAlbumRatingInfoSuccess)
    .catch(ui.getAlbumRatingInfoFailure)
}

module.exports = {
  onViewAlbumDetail,
  onGetAlbumRating
}
