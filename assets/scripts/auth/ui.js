'use strict'

let store = require('../store')
const albumEvents = require('../albums/events.js')
const indexFile = require('../index')

// Sign UP SUCCESS AND FAILURE MESSAGING ________________________
const signUpSuccess = (data) => {
  console.log('User sucessfully created:', data)
  $('#sign-up-api-success-alert').show()
  $('.signup-input-hides').hide()
  $('.signupclear').val('')
}

const signUpFailure = (error) => {
  if (error.responseText === '{"email":["has already been taken"]}') {
    $('#sign-up-api-duplicate-account-alert').show()
    return
  }
  $('#sign-up-api-failure-alert').show()
}

// RESET SIGNUP MODAL
const resetSignUpModal = function () {
  console.log('Resetting signup Modal')
  $('.signupmodalalert').hide()
  $('.signupclear').val('')
  $('.signup-input-hides').show()
  $('#signUpForm').modal('hide')
}

//  SIGN IN SUCCESS AND FAILURE MESSAGING ________________________

const signInSuccess = (data) => {
  console.log('signIn success ran, data is: ', data)
  store.user = data.user

  // Update Sign In modal
  $('#sign-in-api-success-alert').show()
  $('.signin-input-hides').hide()
  $('.signinclear').val('')

  // Show AI ,new game, sign out, change pass, and options
  signInShow()

  $('#display-current-user').text('Signed in as ' + data.user.email)
  albumEvents.onGetAlbums()
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
  console.log(error.statusText)

  if (error.statusText === 'error') {
    $('#sign-in-api-failure-alert').show()
    return
  }

  if (error.statusText === 'Unauthorized') {
    $('#sign-in-api-unknown-account-alert').show()
    return
  }
  // Catch all modal
  $('#sign-in-hell-if-i-know-failure-alert').show()
}

// Reset Sign In Modal
const resetSignInModal = function () {
  console.log('Resetting signin Modal')
  $('.signinmodalalert').hide()
  $('.signinclear').val('')
  $('#signInForm').modal('hide')
}

// Hide and show Sign In objects
const signInShow = function () {
  $('.signin-hide').hide()
  $('#signupbut').hide()
  $('#signinbut').hide()
  $('#launch-video').empty()
  $('.signin-show').show()
}

//  SIGN OUT SUCCESS AND FAILURE MESSAGING ______________________

const signOutSuccess = () => {
  console.log('signOut success ran, and nothing was returned')

// Hide elements
  console.log(store.user)
  $('.signin-hide').show()

  store.user = null
  console.log(store.user)
  $('#display-current-user').text('')
  $('.signin-hide').show()
  $('.signin-show').hide()
  $('#content').empty()
  let array = store.videos
  signOutLoadVideo(array)
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
}

//  Change Password SUCCESS AND FAILURE MESSAGING ______________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed')
  $('#changePasswordForm').modal('hide')
  $('#changePassNew').val('')
  $('#changePassOld').val('')
}

const changePasswordFailure = (error) => {
  console.log('Password was not succesfully changed', error)
}

const signInClose = function () {
  $('#signInPlayerPassword').val('')
  $('#signInPlayerEmail').val('')
}

const signOutLoadVideo = function (array) {
  console.log(store)
  let options = array.length
  let random = Math.floor(Math.random() * (options - 0 + 1)) + 0
  let video = array[random]
  $('#launch-video').append('<iframe class="embed-responsive-item" src="' + video + '&autoplay=1"></iframe>')
}





const resetChangePasswordModal = function () {
  $('.passwordchangeclear').val('')
  $('#changePasswordForm').modal('hide')
}

const addHandlers = () => {

}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  signInClose,
  resetSignUpModal,
  resetSignInModal,

}
