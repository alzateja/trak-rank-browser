const api = require('./api.js')
const ui = require('./ui.js')

//  Populate the modals
const onViewAlbumDetail = (event) => {
  event.preventDefault()
  const elementId = event.currentTarget.id.replace('modify-', '')
  const num = elementId.toString()

  console.log('view Album Detail')

  // Store selection to pass as argument
  api.getAlbumInfo(num)
    .then(ui.getOneAlbumSuccess)
    .catch(ui.failure)
  console.log('Get Album Ratings')
  onGetAlbumRating(num)
}

const onGetAlbumRating = (num) => {
  console.log('run Album get2')
  api.getAlbumRatingInfo(num)
    .then(ui.getAlbumRatingInfoSuccess)
    .catch(ui.failure)
}

module.exports = {
  onViewAlbumDetail,
  onGetAlbumRating
}
