import { extend, setInteractionMode } from 'vee-validate';
setInteractionMode('passive')

export default {
  namespaced: true,

  state: {
    required: extend('required', {
      validate (value) {
        if (value == '' || value == null || value == undefined) {
          return 'Requerido'
        } else {
          return true
        }
      },
      computesRequired: true
    }),

    requiredId: extend('requiredId', {
      validate (value) {
        if (value == -1) {
          return 'Requerido'
        } else {
          return true
        }
      },
    }),

    min: extend('min', {
      validate (value, { length }: any) {
        if (value.length < length) {
          return 'Al menos {length} caracteres.'
        } else {
          return true
        }
      },
      params: ['length']
    }),

    confirmed: extend('confirmed', {
      validate (value,  { text }: any) {
        if (value != text) {
          return 'Contraseña no coincide.'
        } else {
          return true
        }
      },
      params: ['text']
    }),
    
    length: extend('length', {
      validate (value, { length }: any) {
        if (value.length != length) {
          return 'Sólo {length} caracteres.'
        } else {
          return true
        }
      },
      params: ['length']
    }),

    onlyNumbers: extend('onlyNumbers', {
      validate (value) {
        if (!value.match(/^\d+(\.\d+)?$/)) {
          return 'Sólo números.'
        } else {
          return true
        }
      },
    }),

    invalidEmail: extend('invalidEmail', {
      validate (value) {
        if (!/.+@.+\..+/.test(value)) {
          return 'Correo electrónico no válido.'
        } else {
          return true
        }
      },
    }),
  }
}

