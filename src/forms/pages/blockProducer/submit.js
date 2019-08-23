import { validationMixin } from 'vuelidate'
import { required, url, maxLength, minLength } from 'vuelidate/lib/validators'

export const submitBlockProducerForm = {
  mixins: [validationMixin],
  validations: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      websiteUrl: { required, url },
      location: { maxLength: maxLength(50) },
      shortDescription: { required, maxLength: maxLength(100) },
      fullDescription: { maxLength: maxLength(1000) },
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
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 50 characters long.')
      !this.$v.name.minLength && errors.push('Name must be at least 3 characters long.')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    websiteUrlErrors () {
      const errors = []
      if (!this.$v.websiteUrl.$dirty) return errors
      !this.$v.websiteUrl.url && errors.push('This should be URL.')
      !this.$v.websiteUrl.required && errors.push('Website is required.')
      return errors
    },
    locationErrors () {
      const errors = []
      if (!this.$v.location.$dirty) return errors
      !this.$v.location.maxLength && errors.push('Location must be at most 100 characters long.')
      return errors
    },
    shortDescriptionErrors () {
      const errors = []
      if (!this.$v.shortDescription.$dirty) return errors
      !this.$v.shortDescription.maxLength && errors.push('Short description must be at most 100 characters long.')
      !this.$v.shortDescription.required && errors.push('Short description is required.')
      return errors
    },
    fullDescriptionErrors () {
      const errors = []
      if (!this.$v.fullDescription.$dirty) return errors
      !this.$v.fullDescription.maxLength && errors.push('Full description must be at most 1000 characters long.')
      return errors
    },
    facebookUrlErrors () {
      const errors = []
      if (!this.$v.facebookUrl.$dirty) return errors
      !this.$v.facebookUrl.url && errors.push('This should be URL.')
      return errors
    },
    githubUrlErrors () {
      const errors = []
      if (!this.$v.githubUrl.$dirty) return errors
      !this.$v.githubUrl.url && errors.push('This should be URL.')
      return errors
    },
    linkedInUrlErrors () {
      const errors = []
      if (!this.$v.linkedInUrl.$dirty) return errors
      !this.$v.linkedInUrl.url && errors.push('This should be URL.')
      return errors
    },
    redditUrlErrors () {
      const errors = []
      if (!this.$v.redditUrl.$dirty) return errors
      !this.$v.redditUrl.url && errors.push('This should be URL.')
      return errors
    },
    mediumUrlErrors () {
      const errors = []
      if (!this.$v.mediumUrl.$dirty) return errors
      !this.$v.mediumUrl.url && errors.push('This should be URL.')
      return errors
    },
    steemitUrlErrors () {
      const errors = []
      if (!this.$v.steemitUrl.$dirty) return errors
      !this.$v.steemitUrl.url && errors.push('This should be URL.')
      return errors
    },
    telegramUrlErrors () {
      const errors = []
      if (!this.$v.telegramUrl.$dirty) return errors
      !this.$v.telegramUrl.url && errors.push('This should be URL.')
      return errors
    },
    slackUrlErrors () {
      const errors = []
      if (!this.$v.slackUrl.$dirty) return errors
      !this.$v.slackUrl.url && errors.push('This should be URL.')
      return errors
    },
    twitterUrlErrors () {
      const errors = []
      if (!this.$v.twitterUrl.$dirty) return errors
      !this.$v.twitterUrl.url && errors.push('This should be URL.')
      return errors
    },
    wikipediaUrlErrors () {
      const errors = []
      if (!this.$v.wikipediaUrl.$dirty) return errors
      !this.$v.wikipediaUrl.url && errors.push('This should be URL.')
      return errors
    },
  },
}

export default submitBlockProducerForm
