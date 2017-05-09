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

const resetAddAlbumModal = () => {
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

const getAlbumsFailure = (error) => {
  console.log('Unimaginable failure', error)
}

// GET RATINGS
const getRatingsSuccess = (data) => {
  console.log('Get All Ratings success! You have ratings:' + data.user_ratings.length)
  console.log('Your data looks like ', data)
  store.user_ratings = data.user_ratings
}

const getRatingsFailure = (error) => {
  console.log('Get All Ratings was a failure', error)
}

// CALCULATE STATS
const calculateStats = function () {
  console.log(store.albums)
  const totalAlbums = store.albums.length
  let completeStat = 0
  let progressStat = 0
  let notStartedStat = 0
  let ratingSum = 0
  let ratingCount = 0

// If no user_ratings then Not Started equals ALbums
  if (store.user_ratings.length === 0) {
    notStartedStat === totalAlbums
  } else {
    // Else loop through user ratings
    for (let i = 0; i < store.user_ratings.length; i++) {
      // If current rating is completed Increment the completed count
      if (store.user_ratings[i].status === 'Completed') {
        completeStat++
      }
      // If current rating is in Progress Increment the in Progress count
      if (store.user_ratings[i].status === 'In progress') {
        progressStat++
      }
      // If user rating is greater than 0 save rating into the sum
      if (store.user_ratings[i].ratings > 0) {
        ratingSum += store.user_ratings[i].ratings
        ratingCount++
      }
    }
  }
    // Finish Calculating Stats
  notStartedStat = totalAlbums - progressStat - completeStat
  const avg = (ratingSum / ratingCount).toFixed(2)

    // Console log counts
  console.log('Total Albums ' + totalAlbums)
  console.log('Complete ' + completeStat)
  console.log('In Progress ' + progressStat)
  console.log('Not Started ' + notStartedStat)
  console.log(store.user_ratings)
  console.log(avg)

    // Update Modals
  $('#album-count').text(totalAlbums)
  $('#album-completed').text(completeStat)
  $('#album-in-progress').text(progressStat)
  $('#album-not-started').text(notStartedStat)
  if (avg > 0) {
    $('#album-avg-ratings').text(avg)
  }
  else {
    $('#album-avg-ratings').text('No ratings on file.')
  }
}

const resetUserStatsModal = () => {
  console.log('Resetting the User StatsModal')
  $('.user-stat-display').text('')
  $('#userStatsForm').modal('hide')
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
  resetAddAlbumModal,
  getAlbumsSuccess,
  getAlbumsFailure,
  getRatingsSuccess,
  getRatingsFailure,
  calculateStats,
  resetUserStatsModal,
  renderAlbums

}
