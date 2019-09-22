import { validationMixin } from 'vuelidate'
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'

export const signUpForm = {
  mixins: [validationMixin],
  validations: {
      email: { required, email },
      username: { required, minLength: minLength(3), maxLength: maxLength(25) },
      password: { required, minLength: minLength(5) },
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Please enter a valid e-mail address.')
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Username must be at most 25 characters long.')
      !this.$v.username.minLength && errors.push('Username must be at least 3 characters long.')
      !this.$v.username.required && errors.push('Username is required.')
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

export default signUpForm
