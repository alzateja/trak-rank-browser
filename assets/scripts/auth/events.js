'use strict'
const store = require('../store')
const authApi = require('./api')
const authUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

// SIGNUP FUNCTIONALITY LAUNCHED WHEN CLICKED IN MODAL___________________
const onSignUp = function (event) {
  event.preventDefault()
  $('.signupmodalalert').hide()
  const data = getFormFields(this)
  // Criteria Check

// Blank Field Check
  if (
    data.credentials.password === '' || data.credentials.password_confirmation === '' || data.email === '') {
    $('#sign-up-blank-field-failure-alert').show()
    return
  }

// Password Match Check
  if (data.credentials.password !== data.credentials.password_confirmation) {
    console.log('Your passwords do not match')
    $('#sign-up-password-failure-alert').show()
    return
  }

// Create User API request
  authApi.signUp(data)
  .then(authUi.signUpSuccess)
  .catch(authUi.signUpFailure)
}

// SIGNIN FUNTIONALITY LAUNCHED WHEN CLICKED IN MODAL___________________
const onSignIn = function (event) {
  event.preventDefault()

  console.log('Sign In run')
  const data = getFormFields(this)
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInFailure)
}

// SIGNOUT FUNCTION EXECUTED WHEN BUTTON CLICKED___________________
const onSignOut = function (event) {
  event.preventDefault()
  console.log('Sign out run')
  if (store.user === undefined) {
    console.log('Not signed In')
    return
  }
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutFailure)
}

// CHANGE PASSWORD FUNTIONALITY LAUNCHED WHEN CLICKED IN MODAL___________________
const onChangePassword = function (event) {
  event.preventDefault()
  console.log('Changing password run')
  const data = getFormFields(this)
  console.log(data)
  if (store.user === undefined) {
    console.log('Not signed In. Please Sign In to change password')
    return
  }
  if (
    data.passwords.old === '' || data.passwords.new === '') {
    console.log('No blank fields accepted')
    return
  }

  authApi.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordFailure)
}

// HANDLER TO ASSIGN AUTHORIZATION FUNCTIONS TO OBJECTS___________________
const addHandlers = () => {
  $(document).on('submit', '#signUpForm', onSignUp)
  $(document).on('submit', '#signInForm', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#changePasswordForm').on('submit', onChangePassword)
  $('#signupclose').on('click', authUi.resetSignupModal)
}

module.exports = {
  addHandlers
}
