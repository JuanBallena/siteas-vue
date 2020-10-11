<template>
  <div>
    <Title 
      text="Buscar cita médica por:"
    />
    <ValidationObserver ref="datosBuscarCitaMedicaRef">
      <v-row>
        <v-col cols="12" lg="3" md="4" sm="6">
         <v-dialog
            ref="modalCalendarioFechaLlegadaCitaMedicaRef"
            v-model="modalCalendarioFechaLlegadaCitaMedica"
            :return-value.sync="textFechaCitaToSearch"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                append-icon="fas fa-calendar-alt"
                color="secondary"
                outlined
                dense
                placeholder=" "
                v-model="textFechaCitaToSearch"
                label="Fecha de llegada"
                readonly
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker
              color="primary"
              v-model="textFechaCitaToSearch"
              scrollable
              locale="es">
              <v-spacer></v-spacer>
              <v-btn text color="cancel" @click="modalCalendarioFechaLlegadaCitaMedica = false">Cerrar</v-btn>
              <v-btn text color="primary" @click="$refs.modalCalendarioFechaLlegadaCitaMedicaRef.save(textFechaCitaToSearch)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider rules="" v-slot="{ errors }">
            <v-select
              v-model="textTipoDocumentoToSearch"
              :items="parametroData1"
              item-text="descripcion"
              item-value="idParametro"
              color="secondary"
              outlined
              @change="validarLengthDocumento()"
              dense
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
              placeholder="Escriba..."
              dense
              @keypress="validarDocumento"
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarCitaMedica()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="6">
          <BtnSearch 
            @click.native="buscarCitaMedica()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      v-if="esEnfermero()"
      title="Nueva Cita Médica"
      @click.native="abrirModalFormCitaMedica()"
    />
    <hr>
    <Title 
      text="Lista de Atenciones"
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="agendaAtencionData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (agendaAtencionData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.paciente="{ item }">
          {{ item.ticket.paciente | fullName('apellidos')}}
        </template>
        <template v-slot:item.historiaClinica="{ item }">
          <span
            class="link"
            @click="verHistoriaClinica(item)">
            {{ item.ticket.paciente.historiaClinica[0].historiaClinica }}
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable v-if="puedeEditarCitaMedica(item)"
            icon="fas fa-pen" 
            @click.native="editarCitaMedica(item)" 
          />
          <v-tooltip v-else
            top>
            <template v-slot:activator="{ on }">
              <IconActionTable
                :prendido="on"
                icon="fas fa-eye" 
                @click.native="verDetalleCitaMedica(item)"
              />
            </template>
            <span>Ver detalles</span>
          </v-tooltip>

          <v-tooltip v-if="puedeDiagnosticarCitaMedica(item)"
            top>
            <template v-slot:activator="{ on }">
              <IconActionTable
                :prendido="on"
                icon="fas fa-diagnoses" 
                @click.native="realizarDiagnostico(item)"
              />
            </template>
            <span>Realizar diagnóstico</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <br>
    <v-pagination
      color="secondary"
      class="text-center"
      v-model="page"
      :length="pages"
      :total-visible="6"
      @input="onChangePage">
    </v-pagination>
    <v-dialog
      v-model="modalFormCitaMedica"
      max-width="900px">
      <v-card
        tile>
        <v-card-text>
          <br>
          <TitleCenter v-if="verDetalle" 
            text="Cita Médica"
          />
          <TitleCenter v-else 
            :text="titleForm"
          />
          <hr>
          <ValidationObserver ref="datosCitaMedicaRef">
            <v-row>
              <v-col cols="12" lg="3" md="4" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Código Reg. llegada"
                    color="secondary"
                    dense
                    :append-icon="editando || verDetalle ? '' : 'fas fa-search'"
                    outlined
                    :disabled="editando || verDetalle"
                    v-model="codigoTicket"
                    placeholder=" "
                    @click:append="buscarTicketSegunCodigo"
                    :error-messages="errors"
                    @keyup.enter="buscarTicketSegunCodigo"> 
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="3" md="4" sm="6">
                <v-dialog
                  ref="modalCalendarioFechaCitaMedicaRef"
                  v-model="modalCalendarioFechaCitaMedica"
                  :return-value.sync="fechaCita"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="fechaCita"
                        label="Fecha de cita"
                        color="secondary"
                        dense
                        outlined
                        :disabled="verDetalle"
                        :error-messages="errors"
                        v-on="on">
                      </v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker 
                    v-model="fechaCita" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaCitaMedica = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaCitaMedicaRef.save(fechaCita)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="3" md="4" sm="6">
                <v-dialog
                  ref="modalHoraFechaCitaMedicaRef"
                  v-model="modalHoraFechaCitaMedica"
                  :return-value.sync="horaCita"
                  persistent
                  width="350px">
                  <template v-slot:activator="{ on }">
                    <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="horaCita"
                        label="Hora cita"
                        dense
                        color="secondary"
                        outlined
                        :disabled="verDetalle"
                        :error-messages="errors"
                        v-on="on">
                      </v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-time-picker
                    v-if="modalHoraFechaCitaMedica"
                    v-model="horaCita"
                    color="primary"
                    use-seconds
                    scrollable
                    full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalHoraFechaCitaMedica = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalHoraFechaCitaMedicaRef.save(horaCita)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
               <v-col cols="12" lg="3" md="4" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="N° historia"
                    color="secondary"
                    dense
                    disabled
                    outlined
                    placeholder=" "
                    v-model="nroHistoria"
                    :error-messages="errors"> 
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="3" md="4" sm="6">
                <v-text-field
                  label="Tipo documento"
                  disabled
                  dense
                  outlined
                  v-model="tipoDocumento"
                  placeholder=" "> 
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="3" md="4" sm="6">
                <v-text-field
                  label="N° de documento"
                  color="secondary"
                  dense
                  outlined
                  v-model="documento"
                  placeholder=" "
                  disabled> 
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="12" sm="6">
                <v-text-field
                  label="Paciente"
                  color="secondary"
                  v-model="paciente"
                  placeholder=" "
                  dense
                  outlined
                  disabled> 
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    height="100px"
                    outlined
                    color="secondary"
                    dense
                    :disabled="verDetalle"
                    placeholder=" "
                    v-model="descripcion"
                    :error-messages="errors"
                    label="Descripción">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <template v-if="verDetalle">
                <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                  <BtnClose
                    @click.native="modalFormCitaMedica = false" 
                  />
                </v-col>
              </template>
              <template v-else>
                <v-col cols="12" lg="6" offset-lg="6" md="6" offset-md="6" offset-sm="0">
                  <v-row>
                    <v-col cols="6">
                      <BtnCancel 
                        @click.native="modalFormCitaMedica = false" 
                      />
                    </v-col>
                    <v-col cols="6">
                      <BtnSubmit 
                        v-if="editando"
                        :title="buttonActualizarTitle"
                        :disabled="deshabilitado"
                        @click.native="updateCitaMedica()" 
                      />
                      <BtnSubmit 
                        v-else
                        :title="buttonGuardarTitle"
                        :disabled="deshabilitado"
                        @click.native="guardarDatosCitaMedica()" 
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </template>
            </v-row>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { validarNumeroEntero } from "@/common/rulesValidate"
import { PARAMETRO_DNI } from "@/common/parametroDefinition"
import { 
  DNI_LENGTH, 
  CODIGO_EMPADRONAMIENTO_LENGTH 
} from "@/common/sammcDefinition"
import { PARAMETRO_TIPO_TIPO_DOCUMENTO } from "@/common/parametroTipoDefinition"
import { 
  ROL_ENFERMERO, 
  ROL_ENFERMERO_ESPECIALISTA, 
  ROL_MEDICO_TRATANTE 
} from "@/common/rolDefinition"
import { 
  PARAMETRO_SIN_DIAGNOSTICO, 
  PARAMETRO_FINALIZADO_POR_MEDICO 
} from "@/common/parametroDefinition"
import { getFechaActual, getHoraActual } from "@/common/functionsDatetime"
import * as ls from "@/localStorage/index"
import * as swal from "@/plugins/sweetAlertMessages"
export default {
  data: () => {
    return {
      page: 1,
      itemsPerPage: 20,
      textTipoDocumentoToSearch: -1,
      textDocumentoToSearch: '',
      textFechaCitaToSearch: '',
      textTipoDocumentoToSearchAux: -1,
      textDocumentoToSearchAux: '',
      textFechaCitaToSearchAux: '',
      modalCalendarioFechaLlegadaCitaMedica: false,
      modalFormCitaMedica: false,
      modalCalendarioFechaCitaMedica: false,
      modalHoraFechaCitaMedica: false,
      codigoTicket: '',
      fechaCita: '',
      horaCita: '',
      nroHistoria: '',
      tipoDocumento: '',
      documento: '',
      paciente: '',
      descripcion: '',
      idTicket: -1,
      idEnfermero: -1,
      idCentroAsistencial: -1,
      idCitaMedicaEditar: -1,
      idRol: -1,
      editando: false,
      verDetalle: false,
      headers: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Ticket', value: 'ticket.codigo', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Tipo de documento', value: 'ticket.paciente.tipoDocumento.descripcion', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'N° de documento', value: 'ticket.paciente.documento', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Paciente', value: 'paciente', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Fecha cita', value: 'fechaCita', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Hora cita', value: 'horaCita', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'N° Historia', value: 'historiaClinica', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
    }
  },

  async created() {
    this.textFechaCitaToSearch = getFechaActual()
    this.textFechaCitaToSearchAux = getFechaActual()
    this.idEnfermero = parseInt(ls.getIdUsuario())
    this.idMedicoTratante = parseInt(ls.getIdUsuario())
    this.idCentroAsistencial = parseInt(ls.getIdCentroAsistencial())
    this.idRol = parseInt(ls.getIdRol())
    await this.onChangePage()
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DOCUMENTO}`
    await this.getParametroData1(paramsUrlParametro1)
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData','pages','isSuccess','agendaAtencionToEdit','guardando']),
    ...mapState('rulesValidation', ['required','requiredId','min','onlyNumbers','length']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('ticket', ['ticketData']),

    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    },

    titleForm() {
      return this.editando ? 'Formulario para actualizar Cita Médica' : 'Formulario para registrar Cita Médica'
    },

    lengthDocumento() {
      return this.textTipoDocumentoToSearch == PARAMETRO_DNI ? DNI_LENGTH : CODIGO_EMPADRONAMIENTO_LENGTH
    },

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },

    buttonActualizarTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },
  },

  methods: {
    ...mapActions('agendaAtencion', ['getAgendaAtencionData','save','edit','update']),
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('ticket', ['getTicketData']),

    esEnfermero() {
      return this.idRol == ROL_ENFERMERO || this.idRol == ROL_ENFERMERO_ESPECIALISTA
    },

    validarDocumento(event) {
      validarNumeroEntero(event, this.textDocumentoToSearch || '', this.lengthDocumento)
    },

    validarLengthDocumento() {
      if (this.textTipoDocumentoToSearch == PARAMETRO_DNI && 
        this.textDocumentoToSearch.length > DNI_LENGTH ) {
        this.textDocumentoToSearch = ''
      }
    },

    puedeEditarCitaMedica(item) {
      return ( this.idRol == ROL_ENFERMERO || this.idRol == ROL_ENFERMERO_ESPECIALISTA ) && 
        item.tipoDiagnostico.idParametro == PARAMETRO_SIN_DIAGNOSTICO &&
        item.ticket.estadoTicket.idParametro != PARAMETRO_FINALIZADO_POR_MEDICO
    },

    puedeDiagnosticarCitaMedica(item) {
      return this.idRol == ROL_MEDICO_TRATANTE && 
        item.esEditable == 1 &&
        (item.tipoDiagnostico.idParametro == PARAMETRO_SIN_DIAGNOSTICO || 
        item.medicoTratante.idUsuario == this.idMedicoTratante)
    },

    resetInputsFormCitaMedica() {
      this.codigoTicket = ''
      this.fechaCita = getFechaActual()
      this.horaCita = getHoraActual()
      this.nroHistoria = ''
      this.tipoDocumento = ''
      this.documento = ''
      this.paciente = ''
      this.descripcion = ''      
    },

    abrirModalFormCitaMedica() {
      this.editando = false
      this.verDetalle = false
      this.resetInputsFormCitaMedica()
      this.modalFormCitaMedica = true
    },

    cargarInputsFormCitaMedica() {
      this.codigoTicket = this.agendaAtencionToEdit.ticket.codigo
      this.fechaCita = this.agendaAtencionToEdit.fechaCita
      this.horaCita = this.agendaAtencionToEdit.horaCita
      this.nroHistoria = this.agendaAtencionToEdit.ticket.paciente.historiaClinica[0].historiaClinica
      this.tipoDocumento = this.agendaAtencionToEdit.ticket.paciente.tipoDocumento.descripcion
      this.documento = this.agendaAtencionToEdit.ticket.paciente.documento
      this.paciente = this.agendaAtencionToEdit.ticket.paciente.paterno +' '+ this.agendaAtencionToEdit.ticket.paciente.materno +' '+ this.agendaAtencionToEdit.ticket.paciente.nombres
      this.descripcion = this.agendaAtencionToEdit.descripcion
    },

    async editarCitaMedica(item) {
      this.verDetalle = false
      this.editando = true
      this.idCitaMedicaEditar = item.idCitaMedica
      await this.edit(item.idCitaMedica)
      this.cargarInputsFormCitaMedica()
      this.modalFormCitaMedica = true
    },

    async verDetalleCitaMedica(item) {
      this.editando = false
      this.verDetalle = true
      await this.edit(item.idCitaMedica)
      this.cargarInputsFormCitaMedica()
      this.modalFormCitaMedica = true
    },

    realizarDiagnostico(item) {
      this.$router.push({ 
        name: 'EditDiagnostico', 
        params: { idCitaMedica: item.idCitaMedica } 
      })
    },

    async buscarCitaMedica() {
      const isValid = await this.$refs.datosBuscarCitaMedicaRef.validate()
      if (isValid) {
        this.textTipoDocumentoToSearchAux = this.textTipoDocumentoToSearch || -1
        this.textDocumentoToSearchAux = this.textDocumentoToSearch || ''
        this.textFechaCitaToSearchAux = this.textFechaCitaToSearch || ''
        if (this.textDocumentoToSearchAux != '' && this.textTipoDocumentoToSearchAux == -1) {
          swal.infoMessage("Debe seleccionar el tipo de documento.")
        } else {
          const paramsUrlAgendaAtencion = `?page=${this.pageApi}&size=${this.itemsPerPage}&idTipoDocumento=${this.textTipoDocumentoToSearchAux}&documento=${this.textDocumentoToSearchAux}&idCentroAsistencial=${this.idCentroAsistencial}&fechaCita=${this.textFechaCitaToSearchAux}`
          await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
          if (this.agendaAtencionData == null ||
            this.agendaAtencionData == [] ||
            this.agendaAtencionData.length == 0) {
            swal.infoMessage("No se encontraron resultados")
          }
        }
      }
    },

    async onChangePage() {
      if (this.textTipoDocumentoToSearchAux == -1) {
        this.textTipoDocumentoToSearchAux = ''
      }
      const paramsUrlAgendaAtencion = `?page=${this.pageApi}&size=${this.itemsPerPage}&idTipoDocumento=${this.textTipoDocumentoToSearchAux}&documento=${this.textDocumentoToSearchAux}&idCentroAsistencial=${this.idCentroAsistencial}&fechaCita=${this.textFechaCitaToSearchAux}`
      await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
    },

    async buscarTicketSegunCodigo() {
      if (this.codigoTicket == '') {
        swal.infoMessage('Debe ingresar un número de Ticket.')
      } else {
        this.idTicket = -1
        this.nroHistoria = ''
        this.tipoDocumento = ''
        this.documento = ''
        this.paciente = ''
        const paramsUrlTicket = `?codigo=${this.codigoTicket}`
        await this.getTicketData(paramsUrlTicket)
        if (this.ticketData != null && this.ticketData.length > 0) {
          this.idTicket = this.ticketData[0].idTicket
          this.nroHistoria = this.ticketData[0].paciente.historiaClinica[0].historiaClinica
          this.tipoDocumento = this.ticketData[0].paciente.tipoDocumento.descripcion
          this.documento = this.ticketData[0].paciente.documento
          this.paciente = this.ticketData[0].paciente.paterno +' '+this.ticketData[0].paciente.materno+' '+this.ticketData[0].paciente.nombres
        } else {
          swal.infoMessage('No se encontraron resultados.')
        }
      }
    },

    async actualizarListaCitasMedicas() {
      this.textFechaCitaToSearch = getFechaActual()
      this.textFechaCitaToSearchAux = getFechaActual()
      await this.onChangePage()
    },

    async guardarDatosCitaMedica() {
      const isValid = await this.$refs.datosCitaMedicaRef.validate()
      if (isValid) {
        const params = {
          citaMedica: {
            data: {
              idTicket: this.idTicket,
              idEnfermero: this.idEnfermero,
              idCentroAsistencial: this.idCentroAsistencial,
              fechaCita: this.fechaCita,
              horaCita: this.horaCita,
              descripcion: this.descripcion,
            }
          }
        }
        await this.save(params)
        if(this.isSuccess) {
          this.modalFormCitaMedica = false
          swal.successMessage('Se registró correctamente.')
          this.actualizarListaCitasMedicas()
        }
      }
    },

    async updateCitaMedica() {
      const isValid = await this.$refs.datosCitaMedicaRef.validate()
      if (isValid) {
        const params = {
          citaMedica: {
            data: {
              fechaCita: this.fechaCita,
              horaCita: this.horaCita,
              descripcion: this.descripcion,
            }
          }
        }
        await this.update({ idCitaMedica: this.idCitaMedicaEditar, params: params})
        if(this.isSuccess) {
          this.modalFormCitaMedica = false
          swal.successMessage('Se actualizó correctamente.')
          await this.actualizarListaCitasMedicas()
        }
      }
    },

    verHistoriaClinica(citaMedica) {
      const routeData = this.$router.resolve({
        name: 'historiaClinica', 
        params: { idPaciente: citaMedica.ticket.paciente.idPaciente } 
      });
      window.open(routeData.href, '_blank');
    }
  }
}
</script>