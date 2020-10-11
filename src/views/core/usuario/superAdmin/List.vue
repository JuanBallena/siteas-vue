<template>
  <div>
    <ValidationObserver ref="datosBuscarUsuarioRef">
      <v-row>
        <v-col cols="12" md="5">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textToSearch"
              label="Buscar Usuario"
              outlined
              placeholder="Escriba..."
              dense
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarUsuario()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="5">
          <BtnSearch @click.native="buscarUsuario()" />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      title="Registrar Usuario" 
      @click.native="registrarUsuario()" 
    />
    <hr>
    <Title 
      text="Lista de Usuarios"
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="usuarioxCentroData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (usuarioxCentroData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.personal="{ item }">
          {{ item.usuario | fullName }}
        </template>
        <template v-slot:item.estado="{ item }">
          <v-chip
            small
            :color="getColorChipSegunEstadoUsuario(item)"
            text-color="white">
            {{ item.estado.descripcion }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable
            icon="fas fa-pen" 
            @click.native="editarUsuario(item)"
          />
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <IconActionTable v-if="item.estado.idParametro == estadoActivo"
                :prendido="on"
                icon="fas fa-user-alt-slash" 
                color="cancel" 
                @click.native="cambiarEstadoUsuario(item, estadoInactivo, descripcionEstadoInactivo)"
              />
              <IconActionTable v-else
                :prendido="on"
                icon="fas fa-user-check" 
                color="secondary" 
                @click.native="cambiarEstadoUsuario(item, estadoActivo, descripcionEstadoActivo)"
              />
            </template>
            <span>{{ textTooltip(item) }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <br>
    <v-pagination
      class="text-center"
      color="secondary"
      v-model="page"
      :length="pages"
      :total-visible="6"
      @input="onChangePage">
    </v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ROL_ADMINISTRADOR } from "@/common/rolDefinition"
import { 
  PARAMETRO_ACTIVO, 
  PARAMETRO_INACTIVO, 
  PARAMETRO_ACTIVO_S,
  PARAMETRO_INACTIVO_S 
} from "@/common/parametroDefinition"
import * as swal from "@/plugins/sweetAlertMessages"
export default {
  data: () => {
    return {
      page: 1,
      itemsPerPage: 20,
      textToSearch: '',
      textToSearchAux: '',
      headers: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Personal', value: 'personal', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Nombre de usuario', value: 'usuario.usuario', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Correo electrónico', value: 'usuario.email', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Estado', value: 'estado', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
    }
  },

  async created() {
    await this.onChangePage()
  },

  computed: {
    ...mapState('usuario', ['isSuccess']),
    ...mapState('usuarioxCentro', ['usuarioxCentroData','pages']),
    ...mapState('rulesValidation', ['min']),

    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    },

    estadoActivo() {
      return PARAMETRO_ACTIVO
    },

    estadoInactivo() {
      return PARAMETRO_INACTIVO
    },

    descripcionEstadoActivo() {
      return PARAMETRO_ACTIVO_S
    },

    descripcionEstadoInactivo() {
      return PARAMETRO_INACTIVO_S
    },
  },

  methods: {
    ...mapActions('usuario', ['update']),
    ...mapActions('usuarioxCentro', ['getUsuarioxCentroData','changeStateUsuarioCentro']),

    getColorChipSegunEstadoUsuario(usuario) {
      return usuario.estado.idParametro == PARAMETRO_ACTIVO ? 'green' : 'red'
    },

    textTooltip(usuario) {
      return usuario.estado.idParametro == PARAMETRO_ACTIVO ? 'Dehabilitar Usuario' : 'Habilitar Usuario'
    },

    registrarUsuario() {
      this.$router.push({ 
        name: 'CreateUsuarioPrincipal'
      })
    },

    editarUsuario(usuario) {
      this.$router.push({ 
        name: 'EditUsuarioPrincipal', 
        params: { id: usuario.idUsuarioCentro }
      })
    },

    async cambiarEstadoUsuario(item, idEstadoUsuarioCentro, descripcionEstadoUsuarioCentro) {
      const isAccept = await swal.confirm('¿Está seguro de cambiar el estado de este usuario?')
      if (isAccept) {
        const params = {
          usuario: {
            data: {
              idCentroAsistencialOld: item.centroAsistencial.idCentroAsistencial,
              estadoCentro: idEstadoUsuarioCentro,
            }
          }
        }
        await this.update({ 
          idUsuario: item.usuario.idUsuario, 
          params: params 
        })
        if (this.isSuccess) {
          const usuarioxCentro = {
            pos: this.usuarioxCentroData.indexOf(item),
            estado: idEstadoUsuarioCentro,
            descripcion: descripcionEstadoUsuarioCentro,
          }
          this.changeStateUsuarioCentro(usuarioxCentro)
          swal.successMessage('Se cambió el estado correctamente.')
        }
      }
    },

    async buscarUsuario() {
      const isValid = await this.$refs.datosBuscarUsuarioRef.validate()
      if (isValid) {
        this.textToSearchAux = this.textToSearch || ''
        const paramsUrlUsuario = `?page=${0}&size=${this.itemsPerPage}&usuario=${this.textToSearchAux}&idRol=${ROL_ADMINISTRADOR}`
        await this.getUsuarioxCentroData(paramsUrlUsuario)
        if (this.usuarioxCentroData.length == 0) {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async onChangePage() {
      const paramsUrlUsuario = `?page=${this.pageApi}&size=${this.itemsPerPage}&usuario=${this.textToSearchAux}&idRol=${ROL_ADMINISTRADOR}`
      await this.getUsuarioxCentroData(paramsUrlUsuario)
    }
  }
}
</script>