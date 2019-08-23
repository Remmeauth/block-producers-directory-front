import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export const passwordRecoveryRequestForm = {
  mixins: [validationMixin],
  validations: {
      email: { required, email },
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Please enter a valid e-mail address.')
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
  },
}

export default passwordRecoveryRequestForm
