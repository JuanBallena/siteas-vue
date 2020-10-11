<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="8" sm="9" class="mx-auto">
        <v-card width="100%" :loading="loading">
          <v-card-text>
            <TitleCenter 
              :text="title"
            />
            <hr>
            <v-row>
              <v-col cols="12" lg="4" md="4" class="py-2">
                <ItemIconText 
                  color="primary" 
                  icon="fas fa-calendar-alt" 
                  :text="fechaIngreso" 
                />
              </v-col>
              <v-col cols="12" lg="4" md="4" class="py-2">
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
                  dense
                  readonly
                  placeholder=" "
                  v-model="tipoDocumento"
                  label="Tipo de documento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field 
                  dense
                  readonly 
                  placeholder=" "
                  v-model="documento" 
                  label="N° de documento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field 
                  dense
                  readonly 
                  placeholder=" "
                  v-model="paciente" 
                  label="Paciente">                     
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model.number="peso"
                  dense
                  readonly
                  placeholder=" "
                  label="Peso (en Kg.)">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model.number="estatura"
                  dense
                  readonly
                  placeholder=" "
                  label="Estatura (en cm.)">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="sintomas"
                  dense
                  readonly
                  placeholder=" "
                  label="Síntomas">
                </v-text-field>
              </v-col>
            </v-row>
            <SubTitle 
              text="Signos vitales"
            />
            <br>
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="presionArterial"
                  dense
                  readonly
                  placeholder=" "
                  label="Presión arterial (en mmHg.)">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="grupoSanguineo"
                  dense
                  readonly
                  placeholder=" "
                  label="Grupo sanguíneo">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="ritmoCardiaco"
                  dense
                  readonly
                  placeholder=" "
                  label="Ritmo cardiaco (latidos por minuto)"> 
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  dense
                  readonly
                  v-model="frecuenciaRespiratoria"
                  placeholder=" "
                  label="Frecuencia respiratoria (respiraciones por minuto)">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  dense
                  readonly
                  v-model="temperaturaCorporal"
                  placeholder=" "
                  label="Temperatura corporal (en °C)">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  dense
                  readonly
                  v-model="tipoDiagnostico"
                  placeholder=" "
                  label="Tipo diagnóstico">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <v-textarea
                  filled
                  min-height="150px"
                  placeholder=" "
                  readonly
                  label="Diagnóstico"
                  v-model="diagnostico"> 
                </v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      codigo: '',
      fechaIngreso: '',
      horaIngreso: '',
      tipoDocumento: '',
      documento: '',
      paciente: '',
      peso: '',
      estatura: '',
      sintomas: '',
      presionArterial: '',
      grupoSanguineo: '',
      ritmoCardiaco: '',
      frecuenciaRespiratoria: '',
      temperaturaCorporal: '',
      tipoDiagnostico: '',
      diagnostico: '',
      title: '',
    };
  },

  async created() {
    await this.edit(this.$route.params.idTicket)
    if (this.ticketToEdit == null) {
      swal.errorMessage('Ticket no existe.')
      return
    }
    this.codigo = this.ticketToEdit.codigo
    this.fechaIngreso = this.ticketToEdit.fechaIngreso
    this.horaIngreso = this.ticketToEdit.horaIngreso
    this.tipoDocumento = this.ticketToEdit.paciente.tipoDocumento.descripcion
    this.documento = this.ticketToEdit.paciente.documento
    this.paciente =this.ticketToEdit.paciente.paterno +" "+this.ticketToEdit.paciente.materno +" "+this.ticketToEdit.paciente.nombres
    this.peso = this.ticketToEdit.peso
    this.estatura = this.ticketToEdit.estatura
    this.sintomas = this.ticketToEdit.sintomas
    this.presionArterial = this.ticketToEdit.presionArterial
    this.grupoSanguineo = this.ticketToEdit.grupoSanguineo != null ? this.ticketToEdit.grupoSanguineo.descripcion : ''
    this.ritmoCardiaco = this.ticketToEdit.ritmoCardiaco
    this.frecuenciaRespiratoria = this.ticketToEdit.frecuenciaRespiratoria
    this.temperaturaCorporal = this.ticketToEdit.temperaturaCorporal
    this.tipoDiagnostico = this.ticketToEdit.tipoDiagnostico != null ? this.ticketToEdit.tipoDiagnostico.descripcion : ''
    this.diagnostico = this.ticketToEdit.diagnosticoEnfermero
    this.title = 'Diagnóstico de Enfermería N° ' + this.ticketToEdit.codigo
  },

  computed: {
    ...mapState('ticket', ['ticketToEdit']),

    loading() {
      return this.ticketToEdit == ''
    },
  },

  methods: {
    ...mapActions('ticket', ['edit']),
  }
}
</script>