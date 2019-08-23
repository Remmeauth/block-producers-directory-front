import { validationMixin } from 'vuelidate'
import { email, maxLength, minLength, url } from 'vuelidate/lib/validators'

export const userSettingsForm = {
  mixins: [validationMixin],
  validations: {
    details: {
      email: { email },
      firstName: { minLength: minLength(3), maxLength: maxLength(50) },
      lastName: { minLength: minLength(3), maxLength: maxLength(50) },
      location: { maxLength: maxLength(50) },
    },
    other: {
      additionalInformation: { maxLength: maxLength(1000) },
    },
    referenceLinks: {
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
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.details.email.$dirty) return errors
      !this.$v.details.email.email && errors.push('Please enter a valid email address.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.details.firstName.$dirty) return errors
      !this.$v.details.firstName.maxLength && errors.push('First name must be at most 50 characters long.')
      !this.$v.details.firstName.minLength && errors.push('First name must be at least 3 characters long.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.details.lastName.$dirty) return errors
      !this.$v.details.lastName.maxLength && errors.push('Last name must be at most 50 characters long.')
      !this.$v.details.lastName.minLength && errors.push('Last name must be at least 3 characters long.')
      return errors
    },
    locationErrors () {
      const errors = []
      if (!this.$v.details.location.$dirty) return errors
      !this.$v.details.location.maxLength && errors.push('Location must be at most 100 characters long.')
      return errors
    },
    additionalInformationErrors () {
      const errors = []
      if (!this.$v.other.additionalInformation.$dirty) return errors
      !this.$v.other.additionalInformation.maxLength && errors.push('Short description must be at most 1000 characters long.')
      return errors
    },
    websiteUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.websiteUrl.$dirty) return errors
      !this.$v.referenceLinks.websiteUrl.url && errors.push('This should be URL.')
      return errors
    },
    facebookUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.facebookUrl.$dirty) return errors
      !this.$v.referenceLinks.facebookUrl.url && errors.push('This should be URL.')
      return errors
    },
    githubUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.githubUrl.$dirty) return errors
      !this.$v.referenceLinks.githubUrl.url && errors.push('This should be URL.')
      return errors
    },
    linkedInUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.linkedInUrl.$dirty) return errors
      !this.$v.referenceLinks.linkedInUrl.url && errors.push('This should be URL.')
      return errors
    },
    redditUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.redditUrl.$dirty) return errors
      !this.$v.referenceLinks.redditUrl.url && errors.push('This should be URL.')
      return errors
    },
    mediumUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.mediumUrl.$dirty) return errors
      !this.$v.referenceLinks.mediumUrl.url && errors.push('This should be URL.')
      return errors
    },
    steemitUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.steemitUrl.$dirty) return errors
      !this.$v.referenceLinks.steemitUrl.url && errors.push('This should be URL.')
      return errors
    },
    telegramUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.telegramUrl.$dirty) return errors
      !this.$v.referenceLinks.telegramUrl.url && errors.push('This should be URL.')
      return errors
    },
    twitterUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.twitterUrl.$dirty) return errors
      !this.$v.referenceLinks.twitterUrl.url && errors.push('This should be URL.')
      return errors
    },
  },
}


export default userSettingsForm
