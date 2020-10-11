<template>
  <div>
    <div class="py-5 no-visible-xs"></div>
    <v-row class="m-0">
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto p-0">
        <v-card
          tile
          class="px-3"
          width="100%">
          <v-card-text>
            <Logo />
            <hr>
            <div class="black--text title-login text-center">Iniciar sesión</div>
            <v-col cols="12">
              <v-text-field
                label="Usuario"
                v-model="usuario"
                placeholder=" "
                @keyup.enter="login()"> 
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Contraseña"
                v-model="password"
                placeholder=" "
                :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="login()"> 
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <BtnAccess 
                @click.native.prevent="login()"
              />
            </v-col>
            <v-col cols="12">
              <div class="text-center">
                <router-link class="recover-password-link" :to="{ name: 'RecoverPassword' }">
                  ¿Olvidó su contraseña?
                </router-link>
              </div>
            </v-col>
          </v-card-text>
        </v-card>
        <v-overlay :value="overlay" class="text-center">
          <h6>Accediendo</h6>
          <v-progress-circular indeterminate size="32"></v-progress-circular>
        </v-overlay>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"
import { responseCodeIsCero } from "@/api/secutity"
import * as routerCommon from "@/router/routerCommon"
import * as ls from '@/localStorage/index'
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      usuario: '',
      password: '',
      showPassword: false,
      overlay: false,
    }
  },

  created() {
    this.usuario = ''
    this.password = ''
  },

  methods: {
    async login() {
      if (this.usuario == '' || this.password == '') {
        swal.infoMessage('Ingrese las credenciales.')
        return
      }
      const params = {
        login : {
          data : {
            usuario : this.usuario,
            password : this.password,
          }
        }
      }
      try {
        const response = await axios.post(getBaseUrlApi()+'/login', params)
        const r = response.data.login
        if (responseCodeIsCero(r.responseCode)) {
          ls.saveTokenLocalStorage(r.token)
          ls.saveUsuarioLocalStorage(r.data)
          ls.saveCambiarPassword(r.data.cambiarPassword)
          const flagSupervisor = r.data.esSuperAdmin
          if (flagSupervisor == 1) {
            this.overlay = true
            setTimeout(() => {
              ls.saveUsuarioCentroLocalStorage(r.data.usuarioxCentro[0])
              routerCommon.redirectToPrincipal()
              swal.welcomeMessage()
            }, 1000);
          } else {
            const usuarioxCentroLength = r.data.usuarioxCentro.length
            if (usuarioxCentroLength == 1) {
              this.overlay = true
              setTimeout(() => {
                ls.saveUsuarioCentroLocalStorage(r.data.usuarioxCentro[0])
                routerCommon.verifiedCambiarPassword(r.data.cambiarPassword)
                swal.welcomeMessage()
              }, 1000);
            } else {
              this.overlay = true
              setTimeout(() => {
                ls.saveUsuarioxCentroLocalStorage(r.data.usuarioxCentro)
                this.$router.push({ name: 'SelectCenter' })
              }, 1000);
            }
          }
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  }
};
</script>

<style scoped>
  .recover-password-link {
    font-size: 13px;
  }
  .recover-password-link {
    color: #0D47A1;
  }
  .recover-password-link:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #0D47A1;
  }
</style>
