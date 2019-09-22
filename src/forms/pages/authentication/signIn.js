import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export const signInForm = {
  mixins: [validationMixin],
  validations: {
      usernameOrEmail: { required },
      password: { required, minLength: minLength(5) },
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
      !this.$v.password.minLength && errors.push('Password must be at least 5 characters long.')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
  },
}

export default signInForm
