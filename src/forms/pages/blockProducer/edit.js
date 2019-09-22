import { validationMixin } from 'vuelidate'
import { maxLength, minLength, url, required } from 'vuelidate/lib/validators'

export const editBlockProducerForm = {
  mixins: [validationMixin],
  validations: {
    blockProducer: {
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
  },
  methods: {
    isDetailsFormValid() {
      this.$v.blockProducer.name.$touch()
      this.$v.blockProducer.websiteUrl.$touch()
      this.$v.blockProducer.location.$touch()
      
      return !(
        this.$v.blockProducer.name.$invalid ||
        this.$v.blockProducer.websiteUrl.$invalid ||
        this.$v.blockProducer.location.$invalid
      )
    },
    isDescriptionFormValid() {
      this.$v.blockProducer.shortDescription.$touch()
      this.$v.blockProducer.fullDescription.$touch()
      
      return !(
        this.$v.blockProducer.shortDescription.$invalid ||
        this.$v.blockProducer.fullDescription.$invalid
      )
    },
    isReferenceLinksFormValid() {
      this.$v.blockProducer.linkedInUrl.$touch()
      this.$v.blockProducer.twitterUrl.$touch()
      this.$v.blockProducer.mediumUrl.$touch()
      this.$v.blockProducer.githubUrl.$touch()
      this.$v.blockProducer.facebookUrl.$touch()
      this.$v.blockProducer.redditUrl.$touch()
      this.$v.blockProducer.telegramUrl.$touch()
      this.$v.blockProducer.steemitUrl.$touch()
      this.$v.blockProducer.slackUrl.$touch()
      this.$v.blockProducer.wikipediaUrl.$touch()

      return !(
        this.$v.blockProducer.linkedInUrl.$invalid ||
        this.$v.blockProducer.twitterUrl.$invalid ||
        this.$v.blockProducer.mediumUrl.$invalid ||
        this.$v.blockProducer.githubUrl.$invalid ||
        this.$v.blockProducer.facebookUrl.$invalid ||
        this.$v.blockProducer.redditUrl.$invalid ||
        this.$v.blockProducer.telegramUrl.$invalid ||
        this.$v.blockProducer.steemitUrl.$invalid ||
        this.$v.blockProducer.slackUrl.$invalid ||
        this.$v.blockProducer.wikipediaUrl.$invalid
      )
    },
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.blockProducer.name.$dirty) return errors
      !this.$v.blockProducer.name.maxLength && errors.push('Name must be at most 50 characters long.')
      !this.$v.blockProducer.name.minLength && errors.push('Name must be at least 3 characters long.')
      !this.$v.blockProducer.name.required && errors.push('Name is required.')
      return errors
    },
    websiteUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.websiteUrl.$dirty) return errors
      !this.$v.blockProducer.websiteUrl.url && errors.push('This should be URL.')
      !this.$v.blockProducer.websiteUrl.required && errors.push('Website is required.')
      return errors
    },
    locationUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.location.$dirty) return errors
      !this.$v.blockProducer.location.maxLength && errors.push('Location must be at most 100 characters long.')
      return errors
    },
    shortDescriptionErrors () {
      const errors = []
      if (!this.$v.blockProducer.shortDescription.$dirty) return errors
      !this.$v.blockProducer.shortDescription.maxLength && errors.push('Short description must be at most 100 characters long.')
      !this.$v.blockProducer.shortDescription.required && errors.push('Short description is required.')
      return errors
    },
    fullDescriptionErrors () {
      const errors = []
      if (!this.$v.blockProducer.fullDescription.$dirty) return errors
      !this.$v.blockProducer.fullDescription.maxLength && errors.push('Full description must be at most 1000 characters long.')
      return errors
    },
    facebookUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.facebookUrl.$dirty) return errors
      !this.$v.blockProducer.facebookUrl.url && errors.push('This should be URL.')
      return errors
    },
    githubUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.githubUrl.$dirty) return errors
      !this.$v.blockProducer.githubUrl.url && errors.push('This should be URL.')
      return errors
    },
    linkedInUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.linkedInUrl.$dirty) return errors
      !this.$v.blockProducer.linkedInUrl.url && errors.push('This should be URL.')
      return errors
    },
    redditUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.redditUrl.$dirty) return errors
      !this.$v.blockProducer.redditUrl.url && errors.push('This should be URL.')
      return errors
    },
    mediumUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.mediumUrl.$dirty) return errors
      !this.$v.blockProducer.mediumUrl.url && errors.push('This should be URL.')
      return errors
    },
    steemitUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.steemitUrl.$dirty) return errors
      !this.$v.blockProducer.steemitUrl.url && errors.push('This should be URL.')
      return errors
    },
    telegramUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.telegramUrl.$dirty) return errors
      !this.$v.blockProducer.telegramUrl.url && errors.push('This should be URL.')
      return errors
    },
    slackUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.slackUrl.$dirty) return errors
      !this.$v.blockProducer.slackUrl.url && errors.push('This should be URL.')
      return errors
    },
    twitterUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.twitterUrl.$dirty) return errors
      !this.$v.blockProducer.twitterUrl.url && errors.push('This should be URL.')
      return errors
    },
    wikipediaUrlErrors () {
      const errors = []
      if (!this.$v.blockProducer.wikipediaUrl.$dirty) return errors
      !this.$v.blockProducer.wikipediaUrl.url && errors.push('This should be URL.')
      return errors
    },
  },
}

export default editBlockProducerForm
