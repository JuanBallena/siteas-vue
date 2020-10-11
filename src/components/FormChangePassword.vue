<template>
  <div>
    <ValidationObserver ref="datosPasswordRef">
      <v-row>
        <v-col cols="12">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Nueva contraseña"
              v-model="password"
              placeholder=" "
              dense
              outlined
              color="primary"
              :error-messages="errors"
              :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              @keyup.enter="updatePassword()"> 
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider mode="passive" :rules="`required|confirmed:${this.password}`" v-slot="{ errors }">
            <v-text-field
              label="Confirmar contraseña"
              v-model="confirmPassword"
              placeholder=" "
              dense
              outlined
              color="primary"
              :error-messages="errors"
              :append-icon="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              @keyup.enter="updatePassword()"> 
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <template v-if="!isLogged">
            <v-row>
              <v-col cols="6">
                <BtnLogout 
                  @click.native="logout()"
                />
              </v-col>
              <v-col cols="6">
                <BtnAccess 
                  :title="buttonCambiarTitle"
                  :disabled="deshabilitado"
                  @click.native="updatePassword()"
                />
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <BtnAccess 
              :title="buttonActualizarTitle"
              :disabled="deshabilitado" 
              @click.native="updatePassword()" 
            />
          </template>
        </v-col>
      </v-row>
    </ValidationObserver>
    <v-overlay :value="overlay" class="text-center">
      <h6>Cerrando sesión</h6>
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getBaseUrlApi } from "@/prototype/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { mapState } from 'vuex'
import { LOGGED_IN } from '@/common/sammcDefinition'
import { verificarStatusResponse } from "@/errors/functions"
import * as swal from '@/plugins/sweetAlertMessages'
import * as ls from '@/localStorage/index'
import * as routerCommon from "@/router/routerCommon"
import { ROL_SUPERVISOR } from "@/common/rolDefinition"
export default {
  data: () => {
    return {
      password: '',
      confirmPassword: '',
      idUsuario: parseInt(ls.getIdUsuario()),
      showPassword: false,
      showConfirmPassword: false,
      overlay: false,
      flagIsLogged: localStorage.getItem('isLogged'),
      guardando: false,
      flagCambiarPassword: parseInt(ls.getCambiarPassword()),
      idRol: parseInt(ls.getIdRol()),
    }
  },

  computed: {
    ...mapState('rulesValidate', ['required','confirmed']),

    isLogged() {
      return this.flagIsLogged == LOGGED_IN
    },

    deshabilitado() {
      return this.guardando
    },

    buttonActualizarTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },

    buttonCambiarTitle() {
      return this.guardando ? 'Cambiando...' : 'Cambiar'
    },
  },

  methods: {
    esSupervisor() {
      return this.idRol == ROL_SUPERVISOR
    },

    async updatePassword() {
      const isValid = await this.$refs.datosPasswordRef.validate()
      if (isValid) {
        const authorization = getAuthorization()
        const params = {
          "cambiar-password" : {
            data: {
              password: this.password,
              confirmPassword: this.confirmPassword
            }
          }
        }
        try {
          this.guardando = true
          const response = await axios.post(getBaseUrlApi()+`/usuario/cambiar-password/${this.idUsuario}`, params, authorization)
          const r = response.data['cambiar-password']
          if (responseCodeIsCero(r.responseCode)) {
            if (this.flagCambiarPassword === 0) {
              swal.successMessage('La contraseña se actualizó correctamente.')
            } else {
              if (this.esSupervisor()) {
                swal.successMessage('La contraseña se actualizó correctamente.')
              } else {
                swal.welcomeMessage()
                localStorage.setItem('cambiarPassword', 0)
              }
            }
            this.password = ''
            this.confirmPassword = ''
            this.guardando = false
            routerCommon.redirectToPrincipal()
          } else {
            this.guardando = false
          }
        } catch(e) {
          const status = e.response.status
          verificarStatusResponse(status)
        }
      }
    },

    logout() {
      this.overlay = !this.overlay
      routerCommon.logout()
    }
  }
}
</script>