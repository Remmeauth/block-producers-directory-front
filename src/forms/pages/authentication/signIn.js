import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export const signInForm = {
  mixins: [validationMixin],
  validations: {
      usernameOrEmail: { required },
      password: { required },
  },
  computed: {
    usernameOrEmailErrors () {
      const errors = []
      if (!this.$v.usernameOrEmail.$dirty) return errors
      !this.$v.usernameOrEmail.required && errors.push('Username or e-mail address is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
  },
}

export default signInForm
