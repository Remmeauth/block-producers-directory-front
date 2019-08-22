import { validationMixin } from 'vuelidate'
import { maxLength, minLength, url } from 'vuelidate/lib/validators'

export const editBlockProducerForm = {
  mixins: [validationMixin],
  validations: {
    details: {
      name: { minLength: minLength(3), maxLength: maxLength(50) },
      websiteUrl: { url },
      location: { maxLength: maxLength(50) },
    },
    descriptions: {
      shortDescription: { maxLength: maxLength(100) },
      fullDescription: { maxLength: maxLength(1000) },
    },
    referenceLinks: {
      facebookUrl: { url },
      githubUrl: { url },
      linkedInUrl: { url },
      redditUrl: { url },
      mediumUrl: { url },
      steemitUrl: { url },
      telegramUrl: { url },
      slackUrl: { url },
      twitterUrl: { url },
      wikipediaUrl: { url },
    },
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.details.name.$dirty) return errors
      !this.$v.details.name.maxLength && errors.push('Name must be at most 50 characters long.')
      !this.$v.details.name.minLength && errors.push('Name must be at least 3 characters long.')
      return errors
    },
    websiteUrlErrors () {
      const errors = []
      if (!this.$v.details.websiteUrl.$dirty) return errors
      !this.$v.details.websiteUrl.url && errors.push('This should be URL.')
      return errors
    },
    locationUrlErrors () {
      const errors = []
      if (!this.$v.details.location.$dirty) return errors
      !this.$v.details.location.maxLength && errors.push('Location must be at most 100 characters long.')
      return errors
    },
    shortDescriptionErrors () {
      const errors = []
      if (!this.$v.descriptions.shortDescription.$dirty) return errors
      !this.$v.descriptions.shortDescription.maxLength && errors.push('Short description must be at most 100 characters long.')
      return errors
    },
    fullDescriptionErrors () {
      const errors = []
      if (!this.$v.descriptions.fullDescription.$dirty) return errors
      !this.$v.descriptions.fullDescription.maxLength && errors.push('Full description must be at most 1000 characters long.')
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
    slackUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.slackUrl.$dirty) return errors
      !this.$v.referenceLinks.slackUrl.url && errors.push('This should be URL.')
      return errors
    },
    twitterUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.twitterUrl.$dirty) return errors
      !this.$v.referenceLinks.twitterUrl.url && errors.push('This should be URL.')
      return errors
    },
    wikipediaUrlErrors () {
      const errors = []
      if (!this.$v.referenceLinks.wikipediaUrl.$dirty) return errors
      !this.$v.referenceLinks.wikipediaUrl.url && errors.push('This should be URL.')
      return errors
    },
  },
}

export default editBlockProducerForm
