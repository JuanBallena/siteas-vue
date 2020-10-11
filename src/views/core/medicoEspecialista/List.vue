<template>
  <div>
    <Title 
      text="Consultas Médicas" 
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :items="agendaAtencionData"
        :headers="headers"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (agendaAtencionData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.medicoTratante="{ item }">
          {{ item.medicoTratante | fullName }}
        </template>
        <template v-slot:item.estado="{ item }">
          <v-chip
            small
            :color="getColorChip(item)"
            text-color="white">
            {{ getDescripcionEstadoAtencion(item) }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <IconActionTable v-if="puedeAtenderConsultaMedica(item)"
                :prendido="on"
                icon="fas fa-diagnoses" 
                @click.native="atenderConsultaMedica(item)"
              />
              <IconActionTable v-else
                :prendido="on"
                icon="fas fa-eye" 
                @click.native="verDetalleConsultaMedica(item)" 
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
import { mapState, mapActions } from "vuex"
import * as ls from "@/localStorage/index"
import { 
  PARAMETRO_ATENDIDO,
  PARAMETRO_ATENDIDO_S 
} from '@/common/parametroDefinition'
import { getColorSegunEstadoAtencion} from '@/common/functionsConsultaMedica'
export default {
  data: () => {
    return {
      page: 1,
      itemsPerPage: 20,
      idCentroAsistencial: -1,
      idEspecialidad: -1,
      headers: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Codigo Atención', value: 'ticket.codigo', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Médico Tratante', value: 'medicoTratante', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Estado', value: 'estado', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
    }
  },

  async created() {
    this.idCentroAsistencial = parseInt(ls.getIdCentroAsistencial())
    this.idEspecialidad = parseInt(ls.getIdEspecialidad())
    await this.onChangePage()
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData','pages']),

    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('agendaAtencion', ['getCitaData']),

    textTooltip(item) {
      return this.puedeAtenderConsultaMedica(item) ? 'Realizar diagnóstico' : 'Ver detalles'
    },

    ultimaConsultaPerteneceAlCentroAsistencial(item) {
      const lastCentroAsistencial = item.consultas[item.consultas.length - 1].centroAsistencial.idCentroAsistencial
      const lastEspecialidad = item.consultas[item.consultas.length - 1].especialidad.idEspecialidad
      return lastCentroAsistencial == this.idCentroAsistencial && lastEspecialidad == this.idEspecialidad
    },

    puedeAtenderConsultaMedica(item) {
      if (this.ultimaConsultaPerteneceAlCentroAsistencial(item)) {
        return item.consultas[item.consultas.length - 1].estadoAtencion.idParametro != PARAMETRO_ATENDIDO
      } else {
        return false
      }
    },

    getDescripcionEstadoAtencion(item) {
      if (this.ultimaConsultaPerteneceAlCentroAsistencial(item)) {
        return item.consultas[item.consultas.length - 1].estadoAtencion.descripcion
      } else {
        return PARAMETRO_ATENDIDO_S
      }
    },

    getColorChip(item) {
      if (this.ultimaConsultaPerteneceAlCentroAsistencial(item)) {
        const idParametro = item.consultas[item.consultas.length - 1].estadoAtencion.idParametro
        return getColorSegunEstadoAtencion(idParametro)
      } else {
        return 'green'
      }
    },

    atenderConsultaMedica(item) {
      this.$router.push({ 
        name: 'AtenderConsultaMedica', 
        params: { idCitaMedica: item.idCitaMedica } 
      })
    },

    verDetalleConsultaMedica(item) {
      this.$router.push({ 
        name: 'DetailConsulta', 
        params: { idCitaMedica: item.idCitaMedica } 
      })
    },

    async onChangePage() {
      const paramsUrlConsultaMedica = `?page=${this.pageApi}&size=${this.itemsPerPage}&idCentroAsistencial=${this.idCentroAsistencial}&idEspecialidad=${this.idEspecialidad}`
      await this.getCitaData(paramsUrlConsultaMedica)
    }
  }
}
</script>