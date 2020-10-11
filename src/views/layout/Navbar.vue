<template>
  <div>
    <v-app-bar
      app
      dark
      fixed
      color="primary">
      <v-app-bar-nav-icon
        color="white"
        @click.stop="drawer = !drawer">    
      </v-app-bar-nav-icon>
      <v-toolbar-title
        class="white--text">
        <v-icon
          small
          class="pb-1 pr-1">
          fas fa-clinic-medical
        </v-icon>
        <span class="h6">
          <span v-if="esSupervisor">
            SEDE CENTRAL
          </span>
          <template v-else>
            <span class="no-visible-xs"> CENTRO ASISTENCIAL</span> 
            {{ centroAsistencial }}
          </template>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <template>
          <v-menu 
            bottom 
            right
            transition="slide-x-transition">
            <template v-slot:activator="{ on }">
              <div v-on="on"
                style="cursor: pointer;">
                <span class="no-visible-xs h6">
                  {{ nombreUsuario }}
                </span>
                <v-list-item-avatar>
                  <v-icon
                    dark>
                    fas fa-user
                  </v-icon>
                </v-list-item-avatar>
              </div>
            </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon
                      color="primary">
                      fas fa-user
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ usuario }}</v-list-item-title>
                    <v-list-item-subtitle>{{ rol }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list 
                flat 
                dense>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary" small>fas fa-sign-out-alt</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="logout()">
                      <v-list-item-title>Cerrar sesión</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-menu>
        </template>
      </v-toolbar-title>  
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      temporary>
      <v-list 
        nav 
        dense>
        <v-list-item>
          <v-list-item-title class="secondary--text">            
            MENÚ SITEA
          </v-list-item-title>
        </v-list-item>
        <v-list-item-group
          active-class="primary white--text">
            <template v-if="esSupervisor">
              <ItemMenu routeName="ListDiresa" title="DIRESA" />
              <ItemMenu routeName="ListRedAsistencial" title="RED ASISTENCIAL" />
              <ItemMenu routeName="ListMicroredAsistencial" title="MICRORED ASISTENCIAL" />
              <ItemMenu routeName="ListCentroAsistencial" title="CENTRO ASISTENCIAL" />
              <ItemMenu routeName="ListUsuarioPrincipal" title="USUARIO" />
            </template>

            <template v-if="esAdmin">
              <ItemMenu routeName="ListUsuarioSecundario" title="USUARIO" />
            </template>

            <template v-if="esEnfermero">
              <ItemMenu routeName="ListPaciente" title="PACIENTE" />
              <ItemMenu routeName="ListAgendaAtencion" title="AGENDA ATENCIÓN" />
            </template>

            <template v-if="esEnfermeroEspecialista">
              <ItemMenu routeName="ListPaciente" title="PACIENTE" />
              <ItemMenu routeName="ListAgendaAtencion" title="AGENDA ATENCIÓN" />
            </template>

            <template v-if="esMedicoTratante">
              <ItemMenu routeName="ListPaciente" title="PACIENTE" />
              <ItemMenu routeName="ListAgendaAtencion" title="AGENDA ATENCIÓN" />
            </template>

            <template v-if="esMedicoEspecialista">
              <ItemMenu routeName="ListPaciente" title="PACIENTE" />
              <ItemMenu routeName="ListConsultaMedica" title="CONSULTAS MÉDICAS" />
            </template>
            
            <ItemMenu routeName="EditPassword" title="SEGURIDAD" />
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-overlay :value="overlay" class="text-center">
      <h6>Cerrando sesión</h6>
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>

import { LOGGED_IN } from '@/common/sammcDefinition'
import { 
  ROL_SUPERVISOR, 
  ROL_ADMINISTRADOR, 
  ROL_ENFERMERO, 
  ROL_ENFERMERO_ESPECIALISTA, 
  ROL_MEDICO_TRATANTE, 
  ROL_MEDICO_ESPECIALISTA
} from '@/common/rolDefinition'
import * as ls from '@/localStorage/index'
import * as routerCommon from "@/router/routerCommon"
export default {
  name: 'Navbar',

  data: () => ({
    drawer: false,
    overlay: false,
    usuario: '',
    centroAsistencial: '',
    rol: '',
    nombreUsuario: '',
    idRol: -1,
  }),

  created() {
    this.usuario = ls.getUsuario()
    this.centroAsistencial = ls.getCentroAsistencial()
    this.nombreUsuario = ls.getNombreUsuario()
    this.rol = ls.getRol()
    this.idRol = ls.getIdRol()
    localStorage.setItem('isLogged', LOGGED_IN)
  },

  computed: {
    esSupervisor() {
      return this.idRol == ROL_SUPERVISOR 
    },

    esAdmin() {
      return this.idRol == ROL_ADMINISTRADOR 
    },

    esEnfermero() {
      return this.idRol == ROL_ENFERMERO 
    },

    esEnfermeroEspecialista() {
      return this.idRol == ROL_ENFERMERO_ESPECIALISTA 
    },

    esMedicoTratante() {
      return this.idRol == ROL_MEDICO_TRATANTE 
    },

    esMedicoEspecialista() {
      return this.idRol == ROL_MEDICO_ESPECIALISTA 
    },
  },

  methods: {
    logout() {
      this.overlay = !this.overlay
      routerCommon.logout()
    }
  }
}
</script>

<style scoped>
  a, a:hover {
    text-decoration: none;
  }
</style>