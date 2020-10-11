<template>
  <div>
    <div class="py-5 no-visible-xs"></div>
    <v-row class="m-0">
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto p-0">
        <v-card
          class="px-3"
          width="100%">
          <v-card-text>
            <Logo />
            <hr>
            <div class="black--text title-login text-center">Recuperar contraseña</div>
            <v-col cols="12">
              <v-alert
                dense
                v-if="message" 
                type="success">
                {{ message }}
              </v-alert>
              <v-alert
                dense
                v-if="error" 
                type="error">
                {{ error }}
              </v-alert>
            </v-col>
            <ValidationObserver ref="datoEmailRef">
              <v-col cols="12">
                <ValidationProvider rules="required|invalidEmail" v-slot="{ errors }">
                  <v-text-field
                    label="Correo electrónico"
                    v-model="email"
                    outlined
                    :error-messages="errors"
                    dense
                    color="primary"
                    placeholder="Escriba..."
                    @keyup.enter="resetPassword"> 
                  </v-text-field>
                </ValidationProvider>
              </v-col>
            </ValidationObserver>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <v-btn
                    outlined
                    color="cancel"
                    block
                    @click="previus">
                    Atrás
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    :disabled="emailEnviado"
                    color="primary"
                    block
                    @click="resetPassword">
                    Restablecer
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data: () => {
    return {
      email: '',
      message: '',
      error: '',
      emailEnviado: false,
    }
  },

  created() {
    this.email = ''
    this.message = ''
  },

  computed: {
    ...mapState('rulesValidate',['required','invalidEmail'])
  },

  methods: {
    previus() {
      this.$router.push({ name: 'Login' })
    },

    async resetPassword() {
      const isValid = await this.$refs.datoEmailRef.validate()
      if (isValid) {
        this.message = ''
        this.error = ''
        try {        
          this.message = 'Se ha enviado un mensaje a tu correo electrónico para restablecer tu contraseña.'
          this.emailEnviado = true
        } catch(error) {
          console.log(error)
        }
      }
    },
  }
};
</script>