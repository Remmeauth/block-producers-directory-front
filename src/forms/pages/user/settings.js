import { validationMixin } from 'vuelidate'
import { required, email, maxLength, minLength, url } from 'vuelidate/lib/validators'

export const userSettingsForm = {
  mixins: [validationMixin],
  validations: {
    user: {
      email: { required, email },
    },
    oldPassword: { required, minLength: minLength(5) },
    newPassword: { required, minLength: minLength(5) },
    profile: {
      firstName: { minLength: minLength(3), maxLength: maxLength(50) },
      lastName: { minLength: minLength(3), maxLength: maxLength(50) },
      location: { maxLength: maxLength(50) },
      additionalInformation: { maxLength: maxLength(1000) },
      websiteUrl: { url },
      linkedInUrl: { url },
      twitterUrl: { url },
      mediumUrl: { url },
      githubUrl: { url },
      facebookUrl: { url },
      redditUrl: { url },
      telegramUrl: { url },
      steemitUrl: { url },
    },
  },
  methods: {
    isDetailsFormValid() {
      this.$v.profile.firstName.$touch()
      this.$v.profile.lastName.$touch()
      this.$v.profile.location.$touch()

      return !(
        this.$v.profile.firstName.$invalid ||
        this.$v.profile.lastName.$invalid ||
        this.$v.profile.location.$invalid
      )
    },
    isEmailFormValid() {
      this.$v.user.email.$touch()
      return !this.$v.user.email.$invalid
    },
    isPasswordFormValid() {
      this.$v.oldPassword.$touch()
      this.$v.newPassword.$touch()

      return !(
        this.$v.oldPassword.$invalid ||
        this.$v.newPassword.$invalid
      )
    },
    isAdditionalInformationFormValid() {
      this.$v.profile.additionalInformation.$touch()
      return !this.$v.profile.additionalInformation.$invalid
    },
    isReferenceLinksFormValid() {
      this.$v.profile.websiteUrl.$touch()
      this.$v.profile.linkedInUrl.$touch()
      this.$v.profile.twitterUrl.$touch()
      this.$v.profile.mediumUrl.$touch()
      this.$v.profile.githubUrl.$touch()
      this.$v.profile.facebookUrl.$touch()
      this.$v.profile.redditUrl.$touch()
      this.$v.profile.telegramUrl.$touch()
      this.$v.profile.steemitUrl.$touch()

      return !(
        this.$v.profile.websiteUrl.$invalid ||
        this.$v.profile.linkedInUrl.$invalid ||
        this.$v.profile.twitterUrl.$invalid ||
        this.$v.profile.mediumUrl.$invalid ||
        this.$v.profile.githubUrl.$invalid ||
        this.$v.profile.facebookUrl.$invalid ||
        this.$v.profile.redditUrl.$invalid ||
        this.$v.profile.telegramUrl.$invalid ||
        this.$v.profile.steemitUrl.$invalid
      )
    },
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('Please enter a valid email address.')
      !this.$v.user.email.required && errors.push('Email is required.')
      return errors
    },
    oldPasswordErrors () {
      const errors = []
      if (!this.$v.oldPassword.$dirty) return errors
      !this.$v.oldPassword.minLength && errors.push('Password must be at least 5 characters long.')
      !this.$v.oldPassword.required && errors.push('Password is required.')
      return errors
    },
    newPasswordErrors () {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.minLength && errors.push('Password must be at least 5 characters long.')
      !this.$v.newPassword.required && errors.push('Password is required.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.profile.firstName.$dirty) return errors
      !this.$v.profile.firstName.maxLength && errors.push('First name must be at most 50 characters long.')
      !this.$v.profile.firstName.minLength && errors.push('First name must be at least 3 characters long.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.profile.lastName.$dirty) return errors
      !this.$v.profile.lastName.maxLength && errors.push('Last name must be at most 50 characters long.')
      !this.$v.profile.lastName.minLength && errors.push('Last name must be at least 3 characters long.')
      return errors
    },
    locationErrors () {
      const errors = []
      if (!this.$v.profile.location.$dirty) return errors
      !this.$v.profile.location.maxLength && errors.push('Location must be at most 100 characters long.')
      return errors
    },
    additionalInformationErrors () {
      const errors = []
      if (!this.$v.profile.additionalInformation.$dirty) return errors
      !this.$v.profile.additionalInformation.maxLength && errors.push('Short description must be at most 1000 characters long.')
      return errors
    },
    websiteUrlErrors () {
      const errors = []
      if (!this.$v.profile.websiteUrl.$dirty) return errors
      !this.$v.profile.websiteUrl.url && errors.push('This should be URL.')
      return errors
    },
    facebookUrlErrors () {
      const errors = []
      if (!this.$v.profile.facebookUrl.$dirty) return errors
      !this.$v.profile.facebookUrl.url && errors.push('This should be URL.')
      return errors
    },
    githubUrlErrors () {
      const errors = []
      if (!this.$v.profile.githubUrl.$dirty) return errors
      !this.$v.profile.githubUrl.url && errors.push('This should be URL.')
      return errors
    },
    linkedInUrlErrors () {
      const errors = []
      if (!this.$v.profile.linkedInUrl.$dirty) return errors
      !this.$v.profile.linkedInUrl.url && errors.push('This should be URL.')
      return errors
    },
    redditUrlErrors () {
      const errors = []
      if (!this.$v.profile.redditUrl.$dirty) return errors
      !this.$v.profile.redditUrl.url && errors.push('This should be URL.')
      return errors
    },
    mediumUrlErrors () {
      const errors = []
      if (!this.$v.profile.mediumUrl.$dirty) return errors
      !this.$v.profile.mediumUrl.url && errors.push('This should be URL.')
      return errors
    },
    steemitUrlErrors () {
      const errors = []
      if (!this.$v.profile.steemitUrl.$dirty) return errors
      !this.$v.profile.steemitUrl.url && errors.push('This should be URL.')
      return errors
    },
    telegramUrlErrors () {
      const errors = []
      if (!this.$v.profile.telegramUrl.$dirty) return errors
      !this.$v.profile.telegramUrl.url && errors.push('This should be URL.')
      return errors
    },
    twitterUrlErrors () {
      const errors = []
      if (!this.$v.profile.twitterUrl.$dirty) return errors
      !this.$v.profile.twitterUrl.url && errors.push('This should be URL.')
      return errors
    },
  },
}


export default userSettingsForm
