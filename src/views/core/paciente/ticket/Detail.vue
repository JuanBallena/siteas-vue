<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="8" sm="9" class="mx-auto">
        <v-card
          :loading="loading"
          width="100%">
          <v-card-text>
            <TitleCenter 
              :text="title" 
            />
            <hr>
            <v-row>
              <v-col cols="12" class="py-2">
                <ItemIconText color="primary" icon="fas fa-clinic-medical">
                  <span v-for="item in itemsSecuencia" :key="item.text">
                    {{ item.text }}
                    <template v-if="itemsSecuencia.indexOf(item) != 3">
                      <v-icon                        
                        style="width: 20px;"
                        color="primary" 
                        x-small>
                        fas fa-arrow-right
                      </v-icon>
                    </template>
                  </span>
                </ItemIconText>
              </v-col>
              <v-col cols="12" lg="4" class="py-2">
                <ItemIconText 
                  color="primary" 
                  icon="fas fa-calendar-alt" 
                  :text="fechaIngreso" 
                />
              </v-col>
              <v-col cols="12" lg="4" class="py-2">
                <ItemIconText 
                  color="primary" 
                  icon="fas fa-clock" 
                  :text="horaIngreso" 
                />
              </v-col>
            </v-row>
            <hr>
            <SubTitle 
              text="Datos personales del paciente"
            />
            <br>
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Tipo de documento"
                  v-model="tipoDocumento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="N° de documento"
                  v-model="documento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Ap. paterno"
                  v-model="paterno">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Ap. materno"
                  v-model="materno">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Nombres"
                  v-model="nombres">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Género"
                  v-model="sexo">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Fecha de nacimiento"
                  v-model="fechaNacimiento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  color="primary"
                  readonly=""
                  dense
                  placeholder=" "
                  label="Domicilio"
                  v-model="direccion">
                </v-text-field>
              </v-col>
            </v-row>
            <br>
            <Title 
              text="Detalles de Atención de Enfermeria"
            />
            <v-data-table
              :headers="headersEnfermeria"
              :items="diagnosticoEnfermero"
              class="elevation-1 mt-2"
              no-data-text="Sin registros"
              no-results-text="Sin coincidencias"
              hide-default-footer>
              <template v-slot:item.actions="{ item }">
                <IconActionTable v-if="puedeEditarTriaje(item)"
                  icon="fas fa-pen" 
                  @click.native="editarTriaje()" 
                />
                <IconActionTable 
                  icon="fas fa-external-link-alt"  
                  @click.native="verDetalleTriaje()"
                />
              </template>
            </v-data-table>
            <br>
            <Title 
              text="Detalles de Atenciones Médicas"
            />
            <v-data-table
              :items="diagnosticos"
              :headers="headersAtencionMedico"
              class="elevation-1 mt-2"
              no-data-text="Sin registros"
              no-results-text="Sin coincidencias"
              hide-default-footer>
              <template v-slot:item.number="{ item }">
                {{ diagnosticos.indexOf(item) + 1 }}
              </template>
              <template v-slot:item.personal="{ item }">
                {{ getMedicoTratante(item) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <IconActionTable 
                  icon="fas fa-external-link-alt"  
                  @click.native="verDetalleDiagnosticoMedicoTratante(item)"
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import * as swal from '@/plugins/sweetAlertMessages'
import * as ls from "@/localStorage/index"
export default {
  data: () => {
    return {
      headersEnfermeria: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Personal médico', value: 'personal', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Tipo diagnóstico', value: 'tipoDiagnostico', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
      headersAtencionMedico: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Personal médico', value: 'personal', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Tipo diagnóstico', value: 'tipoDiagnostico.descripcion', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text'},
      ],
      codigo : '',
      tipoDocumento: '',
      documento: '',
      paterno: '',
      materno: '',
      nombres: '',
      sexo: '',
      fechaNacimiento: '',
      direccion: '',
      fechaIngreso: '',
      horaIngreso: '',
      title:'',
      diagnosticos: [],
      diagnosticoEnfermero: [],
      itemsSecuencia: [],
      idUsuarioLogged: -1,
    }
  },

  async created() {
    await this.edit(this.$route.params.idTicket)
    if (this.ticketToEdit == null) {
      swal.errorMessage('Ticket no existe.')
      return
    }
    this.codigo = this.ticketToEdit.codigo
    this.tipoDocumento = this.ticketToEdit.paciente.tipoDocumento.descripcion
    this.documento = this.ticketToEdit.paciente.documento
    this.paterno = this.ticketToEdit.paciente.paterno
    this.materno = this.ticketToEdit.paciente.materno
    this.nombres = this.ticketToEdit.paciente.nombres
    this.sexo = this.ticketToEdit.paciente.sexo.descripcion
    this.fechaNacimiento = this.ticketToEdit.paciente.fechaNacimiento
    this.direccion = this.ticketToEdit.paciente.direccion
    this.fechaIngreso = this.ticketToEdit.fechaIngreso
    this.horaIngreso = this.ticketToEdit.horaIngreso
    this.title = "Detalle de Ticket N° " + this.codigo
    this.diagnosticos = this.ticketToEdit.citas || []
    this.idUsuarioLogged = ls.getIdUsuario()
    this.esEditable = this.ticketToEdit.esEditable

    this.diagnosticoEnfermero = [
      {
        number : 1,
        personal: this.ticketToEdit.enfermeroResponsable.nombres + ' ' + this.ticketToEdit.enfermeroResponsable.paterno + ' ' + this.ticketToEdit.enfermeroResponsable.materno,
        tipoDiagnostico: this.ticketToEdit.tipoDiagnostico.descripcion,
        idTicket: this.ticketToEdit.idTicket,
        estadoTicket: this.ticketToEdit.estadoTicket.idParametro,
        idEnfermero: this.ticketToEdit.enfermeroResponsable.idUsuario
      }
    ]
    const diresa = this.ticketToEdit.centroAsistencial.microredAsistencial.redAsistencial.diresa.nombre
    const redAsistencial = this.ticketToEdit.centroAsistencial.microredAsistencial.redAsistencial.nombre
    const microredAsistencial = this.ticketToEdit.centroAsistencial.microredAsistencial.nombre
    const centroAsistencial = this.ticketToEdit.centroAsistencial.nombre

    this.itemsSecuencia = [
      { text: diresa },
      { text: redAsistencial },
      { text: microredAsistencial },
      { text: centroAsistencial },
    ]
  },

  computed: {
    ...mapState('ticket', ['ticketToEdit']),

    loading() {
      return this.ticketToEdit == ''
    },
  },

  methods: {
    ...mapActions('ticket', ['edit']),

    puedeEditarTriaje(item) {
      return this.esEditable == 1  && item.idEnfermero == this.idUsuarioLogged
    },

    getMedicoTratante(item) {
      return item.medicoTratante == null ? 'SIN MEDICO TRATANTE' : item.medicoTratante.nombres+' '+item.medicoTratante.paterno+' '+item.medicoTratante.materno
    },

    editarTriaje() {
      const routeData = this.$router.resolve({name: 'EditTriaje', params: { idTicket: this.ticketToEdit.idTicket } });
      window.open(routeData.href, '_blank');
    },

    verDetalleTriaje() {
      const routeData = this.$router.resolve({name: 'DetailTriaje', params: { idTicket: this.ticketToEdit.idTicket } });
      window.open(routeData.href, '_blank');
    },

    verDetalleDiagnosticoMedicoTratante(item) {
      const routeData = this.$router.resolve({name: 'DetailDiagnostico', params: { idCitaMedica: item.idCitaMedica } });
      window.open(routeData.href, '_blank');
    }
  }
}
</script>