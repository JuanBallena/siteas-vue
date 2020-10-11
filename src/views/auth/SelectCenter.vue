<template>
  <div>
    <div class="py-5 no-visible-xs"></div>
    <v-row class="m-0">
      <v-col cols="12" lg="5" md="6" sm="9" class="mx-auto p-0">
        <v-card
          tile
          class="px-3"
          width="100%">
          <v-card-text>
            <Logo />
            <hr>
            <div class="black--text title-login text-center">Seleccione un Centro de Salud</div>
            <hr>
            <v-list
              one-line
              subheader>
              <v-list-item
                v-for="(item, index) in usuarioxCentro"
                :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      class="pr-2 pb-2"
                      color="">
                      fas fa-clinic-medical
                    </v-icon>
                    <span class="no-visible-xs">
                      CENTRO ASISTENCIAL
                    </span> 
                    {{ item.centroAsistencial.nombre }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    color="primary"
                    @click="selectCentroAistencial(index, item)">
                    <v-icon>
                      {{ item.active ? 'fas fa-check-square' : 'far fa-square' }}
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <hr>
            <v-row>
              <v-col cols="6">
                <BtnLogout 
                  @click.native="logout()"
                />
              </v-col>
              <v-col cols="6">
                <BtnAccess 
                  title="Ingresar" 
                  @click.native="login()"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay" class="text-center">
      <h6>Cerrando sesión</h6>
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import * as ls from '@/localStorage/index'
import * as routerCommon from "@/router/routerCommon"
import * as swal from "@/plugins/sweetAlertMessages"
export default {
  data: () => {
    return {
      overlay: false,
      centroAsistencialSelected: -1,
      usuarioxCentro: [],
      flagCambiarPassword: parseInt(ls.getCambiarPassword())
    }
  },

  created() {
    this.usuarioxCentro = JSON.parse(ls.getUsuarioxCentro())
    this.usuarioxCentro.map(function(obj) {
      Vue.set(obj, 'active', false)
    })
  },

  methods: {
    selectCentroAistencial(index, item) {
      this.usuarioxCentro.map(function(obj) {
        obj.active = false
      })
      this.centroAsistencialSelected = index
      item.active = !item.active
    },

    login() {
      const usuarioCentro = this.usuarioxCentro[this.centroAsistencialSelected]
      ls.saveUsuarioCentroLocalStorage(usuarioCentro)
      const flag = parseInt(ls.getCambiarPassword('cambiarPassword'))
      routerCommon.verifiedCambiarPassword(flag)
      if (this.flagCambiarPassword == 0) {
        swal.welcomeMessage()
      }
    },

    logout() {
      this.overlay = !this.overlay
      routerCommon.logout()
    }
  }
}
</script>