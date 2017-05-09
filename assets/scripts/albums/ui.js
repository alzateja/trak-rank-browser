'use strict'
const modalEvents = require('../modal-load/events.js')
const store = require('../store')
const showAlbumsTemplate = require('../templates/album-listing.handlebars')

// ADD AN ALBUM
const addAlbumSuccess = (data) => {
  console.log('Album add success', data)
  $('#add-album-api-success-alert').show()
  $('.add-album-input-hides').hide()
  $('#createalbumsubmit').hide()
}

const addAlbumFailure = (error) => {
  console.log('Album failure')
  console.error(error)

  if (error.statusText === 'error') {
    $('#add-album-api-failure-alert').show()
    return
  }
}

const resetAlbumModal = () => {
  console.log('Resetting the Add Album Modal')
  $('.add-album-modal-alert').hide()
  $('.add-album-input-hides').show()
  $('.album-input').val('')
  $('#createalbumsubmit').show()
  $('#addAlbumForm').modal('hide')
}

// GET ALL ALBUMS
const getAlbumsSuccess = (data) => {
  console.log(data)
  store.albums = data.albums
  console.log(store)
  renderAlbums(0)
}

// GET RATINGS
const getRatingsSuccess = (data) => {
  console.log('Get All Ratings success')
  console.log(data)
  store.user_ratings = data.user_ratings
  calculateStats()
}

const resetRatingModal = () => {
  console.log('Resetting the Add Album Modal')
  $('.album-input').text('')
  $('.album-input').val('')
  $('#commentDisplay').val('')

}

// CALCULATE STATS
const calculateStats = function () {
  console.log(store.albums)
  let totalAlbums = store.albums.length

  let completeStat = 0
  let progressStat = 0
  let notStartedStat = 0
  let ratingSum = 0

  if (store.user_ratings.length === 0) {
    notStartedStat === totalAlbums
  } else {
    for (let i = 0; i < store.user_ratings.length; i++) {

      if (store.user_ratings[i].status === 'Completed') {
        completeStat++
      }
      if (store.user_ratings[i].status === 'In progress') {
          progressStat++
        }

      if (store.user_ratings[i].ratings > 0 ){
        ratingSum += store.user_ratings[i].ratings
      }

    }

    notStartedStat = totalAlbums - progressStat - completeStat

    let avg = ratingSum / (progressStat + completeStat)
    console.log('Total Albums ' + totalAlbums)
    console.log('Complete ' + completeStat)
    console.log('In Progress ' + progressStat);
    console.log('Not Started ' + notStartedStat);
    console.log(store.user_ratings)

   $('#album-count').text('Total Albums: ' + totalAlbums)
   $('#album-completed').text('Completed: ' + completeStat)
   $('#album-in-progress').text('In Progress: ' + progressStat)
   $('#album-not-started').text('Not Started: ' + notStartedStat)
   $('#album-avg-ratings').text('Avg. Rating: ' + avg)

  }



}

// UI Rendering
const clearContent = () => {
  console.log('Album clear sucess')
  $('#content').empty()
}

const renderAlbums = (start) => {
  clearContent()
  let end = start + 49
  let pages = Math.ceil(store.albums.length / 50)
  generatePages(pages)

  let temp = []
  if (end > store.albums.length) {
    end = store.albums.length - 1
  }

  for (let i = start; i <= end; i++) {
    if (i => start && i <= end) {
      temp.push(store.albums[i])
    }
  }

  let showAlbumsHtml = showAlbumsTemplate({albums: temp})
  $('.content').append(showAlbumsHtml)
  $('.rate-album').on('click', modalEvents.onViewAlbumDetail)
}

const generatePages = function(needed) {
  $('#page-lister').empty()
  for (let i = 1; i <= needed; i++) {
    $('#page-lister').append('<li class=""><a href="#" id ="page-' + i + '">' + i + '<span class="sr-only">(current)</span></a></li>')
    $('#page-' + i).on('click', selectPage)
  }
}

const selectPage = function (event) {
  event.preventDefault()
  const elementId = event.currentTarget.id.replace('page-', '')
  const num = elementId.toString()
  console.log(num)
  let start = (num - 1) * 50
  console.log(start)
  renderAlbums(start)
}



module.exports = {
  addAlbumFailure,
  addAlbumSuccess,
  getAlbumsSuccess,
  getRatingsSuccess,
  renderAlbums,
  resetRatingModal,
  resetAlbumModal

}
