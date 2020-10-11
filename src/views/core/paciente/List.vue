<template>
  <div>
    <Title 
      text="Buscar paciente por:" 
    />
    <ValidationObserver ref="datosBuscarPaciente">
      <v-row>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textPaternoToSearch"
              label="Ap. paterno"
              outlined
              dense
              placeholder="Escriba..."
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarPaciente()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textMaternoToSearch"
              label="Ap. materno"
              outlined
              placeholder="Escriba..."
              dense
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarPaciente()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textNombresToSearch"
              label="Nombres"
              outlined
              dense
              placeholder="Escriba..."
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarPaciente()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6" class="no-visible-md no-visible-sm no-visible-xs ">
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider rules="" v-slot="{ errors }">
            <v-select
              v-model="textTipoDocumentoToSearch"
              item-text="descripcion"
              item-value="idParametro"
              :items="parametroData1"
              color="secondary"
              outlined
              no-data-text="Sin opciones"
              dense
              @change="validarLengthDocumento()"
              :error-messages="errors"
              label="Tipo de documento"
              placeholder="Seleccione">
            </v-select>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider :rules="`length:${this.lengthDocumento}|onlyNumbers`" v-slot="{ errors }">
            <v-text-field
              v-model="textDocumentoToSearch"
              label="N° de documento"
              outlined
              dense
              @keypress="validarDocumento"
              placeholder="Escriba..."
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarPaciente()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <BtnSearch 
            @click.native="buscarPaciente()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <template v-if="esEnfermero()">
      <BtnCreate 
        title="Registrar llegada" 
        @click.native="registrarPaciente()" 
      />
    </template>
    <hr>
    <Title 
      text="Lista de Pacientes"
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="pacienteData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (pacienteData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.nombreCompleto="{ item }">
          {{ item | fullName }}
        </template>
        <template v-slot:item.historiaClinica="{ item }">
          <span
            class="link"
            @click="verHistoriaClinica(item)">
            {{ item.historiaClinica[0].historiaClinica }}
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable 
            icon="fas fa-pen" 
            @click.native="editarPaciente(item)" 
          />
        </template>
        <template v-slot:item.regLlegada="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <IconActionTable
                :prendido="on"
                icon="fa fa-eye" 
                @click.native="abrirModalLlegadasPaciente(item)" 
              />
            </template>
            <span>Ver llegadas de Paciente</span>
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
    <!-- Dialog Llegadas de Paciente -->
    <v-dialog
      v-model="modalLlegadasPaciente" 
      max-width="800px">
      <v-card
        tile>
        <v-card-text
          class="px-4">
          <br>
          <ItemIconText 
            color="primary" 
            icon="fas fa-user" 
            :text="llegadasPaciente.paciente"
          />
          <ItemIconText 
            color="primary" 
            icon="far fa-address-card" 
            :text="llegadasPaciente.documento"
          />
          <hr>
          <Title text="Lista de llegadas de paciente" />
          <v-data-table
            :loading="loadingTicketData"
            :headers="headersTickets"
            :items="ticketData"
            class="elevation-1"
            loading-text="Cargando tickets..."
            :items-per-page="itemsPerPage"
            no-data-text="Sin registros"
            no-results-text="Sin coincidencias"
            hide-default-footer>
            <template v-slot:item.number="{ item }">
              {{ ticketsPerPage * pageTicketApi + (ticketData.indexOf(item) + 1) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <IconActionTable 
                icon="fas fa-external-link-alt"  
                @click.native="verDetalleTicket(item)"
              />
            </template>
          </v-data-table>
          <br>
          <v-pagination
            class="text-center mt-2"
            color="secondary"
            v-model="pageTicket"
            :length="pagesTicket"
            :total-visible="6"
            @input="onChangePageTicket">
          </v-pagination>
          <br>
          <v-row>
            <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
              <BtnClose 
                @click.native="modalLlegadasPaciente = false"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { validarNumeroEntero } from "@/common/rulesValidate"
import { PARAMETRO_DNI } from "@/common/parametroDefinition"
import { DNI_LENGTH, CODIGO_EMPADRONAMIENTO_LENGTH } from "@/common/sammcDefinition"
import { 
  ROL_ENFERMERO, 
  ROL_ENFERMERO_ESPECIALISTA 
} from '@/common/rolDefinition'
import { PARAMETRO_TIPO_TIPO_DOCUMENTO } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
import * as ls from '@/localStorage/index'
export default {
  data: () => {
    return {
      page: 1,
      pageTicket: 1,
      itemsPerPage: 20,
      ticketsPerPage: 10,
      modalLlegadasPaciente: false,
      textPaternoToSearch: '',
      textMaternoToSearch: '',
      textNombresToSearch: '',
      textDocumentoToSearch: '',
      textTipoDocumentoToSearch: -1,
      textPaternoToSearchAux: '',
      textMaternoToSearchAux: '',
      textNombresToSearchAux: '',
      textDocumentoToSearchAux: '',
      textTipoDocumentoToSearchAux: -1,
      llegadasPaciente:{
        paciente: '',
        document: '',
        idPaciente: -1,
      },
      idRolLogged: parseInt(ls.getIdRol()),

      headers: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Tipo de documento', value: 'tipoDocumento.descripcion', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'N° de documento', value: 'documento', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Paciente', value: 'nombreCompleto', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'N° Historial', value: 'historiaClinica', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'center', sortable: false, class: 'primary--text' },
        { text: 'Reg. de llegada', value: 'regLlegada', align: 'center', sortable: false, class: 'primary--text' },
      ],
      headersTickets: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Ticket', value: 'codigo', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Centro Asistencial', value: 'centroAsistencial.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Fecha', value: 'fechaIngreso', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Hora', value: 'horaIngreso', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
    }
  },

  async created() {
    await this.setPacienteData([])
    await this.setPages(0)
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DOCUMENTO}`
    await this.getParametroData1(paramsUrlParametro)
  },

  computed: {
    ...mapState('paciente', ['pacienteData','pages']),
    ...mapState('ticket', ['ticketData','pagesTicket']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('rulesValidate', ['min','onlyNumbers','length']),

    pageApi() {
      return this.page - 1
    },

    pageTicketApi() {
      return this.pageTicket - 1
    },

    loading() {
      return this.pages == -1
    },

    loadingTicketData() {
      return this.pagesTicket == -1
    },

    lengthDocumento() {
      return this.textTipoDocumentoToSearch == PARAMETRO_DNI ? DNI_LENGTH : CODIGO_EMPADRONAMIENTO_LENGTH
    }
  },

  methods: {
    ...mapActions('paciente', ['getPacienteData','setPacienteData','setPages']),
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('ticket', ['getTicketData']),

    esEnfermero() {
      return this.idRolLogged == ROL_ENFERMERO || this.idRolLogged == ROL_ENFERMERO_ESPECIALISTA
    },

    validarDocumento(event) {
      validarNumeroEntero(event, this.textDocumentoToSearch || '', this.lengthDocumento)
    },

    validarLengthDocumento() {
      if (this.textTipoDocumentoToSearch == PARAMETRO_DNI && this.textDocumentoToSearch.length > DNI_LENGTH ) {
        this.textDocumentoToSearch = ''
      }
    },

    registrarPaciente() {
      this.$router.push({ 
        name: 'CreateTicket'
      })
    },

    editarPaciente(item) {
      this.$router.push({ 
        name: 'EditPaciente', 
        params: { id: item.idPaciente }
      })
    },

    async abrirModalLlegadasPaciente(paciente) {
      this.llegadasPaciente.paciente = paciente.nombres +' '+ paciente.paterno +' '+ paciente.materno
      this.llegadasPaciente.documento = paciente.tipoDocumento.descripcion +': '+ paciente.documento
      const paramsUrlTicket = `?idPaciente=${paciente.idPaciente}&page=${0}&size=${this.ticketsPerPage}`
      await this.getTicketData(paramsUrlTicket)
      this.modalLlegadasPaciente = true
      this.llegadasPaciente.idPaciente = paciente.idPaciente
    },

    verDetalleTicket(item) {
      const routeData = this.$router.resolve({name: 'DetailTicket', params: { idTicket: item.idTicket } });
      window.open(routeData.href, '_blank');
    },

    async buscarPaciente() {
      const isValid = await this.$refs.datosBuscarPaciente.validate()
      if (isValid) {
        this.textPaternoToSearchAux = this.textPaternoToSearch || ''
        this.textMaternoToSearchAux = this.textMaternoToSearch || ''
        this.textNombresToSearchAux = this.textNombresToSearch || ''
        this.textDocumentoToSearchAux = this.textDocumentoToSearch || ''
        this.textTipoDocumentoToSearchAux = this.textTipoDocumentoToSearch || -1
        if(this.textPaternoToSearchAux != '' ||
          this.textMaternoToSearchAux != '' ||
          this.textNombresToSearchAux != '' ||
        (this.textDocumentoToSearchAux != '' && this.textTipoDocumentoToSearchAux != -1)) {
          this.buscar()
        } else if (this.textDocumentoToSearchAux != '') {
          swal.infoMessage("Debe seleccionar el tipo de documento.")
        } else if (this.textTipoDocumentoToSearchAux != -1) {
          swal.infoMessage("Debe ingresar el número de documento.")
        } else {
          swal.infoMessage("Debe completar algún criterio de búsqueda.")
        }
      }
    },

    async buscar() {
      const paramsUrlPaciente = `?page=${0}&size=${this.itemsPerPage}&idTipoDocumento=${this.textTipoDocumentoToSearchAux}&documento=${this.textDocumentoToSearchAux}&paterno=${this.textPaternoToSearchAux}&materno=${this.textMaternoToSearchAux}&nombres=${this.textNombresToSearchAux}`
      await this.getPacienteData(paramsUrlPaciente)
      if (this.pacienteData.length == 0) {
        swal.infoMessage("No se encontraron resultados.")
      }
    },

    async onChangePage() {
      const paramsUrlPaciente = `?page=${0}&size=${this.itemsPerPage}&idTipoDocumento=${this.textTipoDocumentoToSearchAux}&documento=${this.textDocumentoToSearchAux}&paterno=${this.textPaternoToSearchAux}&materno=${this.textMaternoToSearchAux}&nombres=${this.textNombresToSearchAux}`
      await this.getPacienteData(paramsUrlPaciente)
    },

    async onChangePageTicket() {
      const paramsUrlTicket = `?idPaciente=${this.llegadasPaciente.idPaciente}&page=${this.pageTicketApi}&size=${this.ticketsPerPage}`
      await this.getTicketData(paramsUrlTicket)
    },

    verHistoriaClinica(paciente) {
      const routeData = this.$router.resolve({name: 'historiaClinica', params: { idPaciente: paciente.idPaciente } });
      window.open(routeData.href, '_blank');
    }
  }
}
</script>