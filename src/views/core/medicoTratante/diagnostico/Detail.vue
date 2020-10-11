<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" md="9" sm="10" class="mx-auto">
        <v-card width="100%">
          <v-card-text
            class="px-5">
            <TitleCenter 
              text="Diagnóstico"
            />
            <hr>
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="tipoDocumento"
                  dense
                  readonly
                  placeholder=" "
                  label="Tipo de documento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="documento"
                  dense
                  readonly
                  placeholder=" "
                  label="Documento">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="nroHistoria"
                  dense
                  readonly
                  placeholder=" "
                  label="N° Historia">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="paterno"
                  dense
                  readonly
                  placeholder=" "
                  label="Ap. paterno">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="materno"
                  dense
                  readonly
                  placeholder=" "
                  label="Ap. materno">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="nombres"
                  dense
                  readonly
                  placeholder=" "
                  label="Nombres">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="sexo"
                  dense
                  readonly
                  placeholder=" "
                  label="Género">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <div class="accent px-4 py-4">
            <v-card-text
              class="white rounded px-6">
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-calendar-alt" 
                    :text="fechaAtencion"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-clock" 
                    :text="horaAtencion"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <v-text-field
                    v-model="tipoDiagnostico"
                    dense
                    readonly
                    placeholder=" "
                    label="Tipo diagnóstico">
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="12" class="py-0">
                  <v-textarea
                    v-model="diagnostico"
                    min-height="200px"
                    background-color="info"
                    readonly
                    filled
                    placeholder=" "
                    label="Diagnóstico"> 
                  </v-textarea>
                </v-col>
              </v-row>
              <template v-if="existeArchivo1 || existeArchivo2 || existeArchivo3">
                <SubTitle text="Archivos Adjuntados" />
                <v-list 
                  dense>
                  <template v-if="existeArchivo1">
                    <v-list-item class="border-bottom">
                      <v-list-item-content>
                        <v-list-item-title>{{ descripcion1Archivo }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <BtnViewFile 
                          @click.native="verArchivo(archivo1Ubicacion)"
                        />
                      </v-list-item-icon>
                    </v-list-item>
                  </template>
                  <template v-if="existeArchivo2">
                    <v-list-item class="border-bottom">
                      <v-list-item-content>
                        <v-list-item-title>{{ descripcion2Archivo }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <BtnViewFile 
                          @click.native="verArchivo(archivo2Ubicacion)"
                        />
                      </v-list-item-icon>
                    </v-list-item>
                  </template>
                  <template v-if="existeArchivo3">
                    <v-list-item class="border-bottom">
                      <v-list-item-content>
                        <v-list-item-title>{{ descripcion3Archivo }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <BtnViewFile 
                          @click.native="verArchivo(archivo3Ubicacion)"
                        />
                      </v-list-item-icon>
                    </v-list-item>
                  </template>
                </v-list>
                <br>
              </template>
              <template v-else>
                <SubTitle 
                  text="*Sin archivos adjuntos" 
                />
              </template>
            </v-card-text>
            <br>
            <v-row>
              <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                <v-btn
                  block
                  small
                  color="primary"
                  @click="verRespuesta()">
                  Ver respuesta
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      tipoDocumento: '',
      documento: '',
      nroHistoria: '',
      paterno: '',
      materno: '',
      nombres: '',
      sexo: '',
      fechaAtencion: '',
      horaAtencion: '',
      tipoDiagnostico: '',
      diagnostico: '',
      archivo1Ubicacion: '',
      archivo2Ubicacion: '',
      archivo3Ubicacion: '',
      descripcion1Archivo: '',
      descripcion2Archivo: '',
      descripcion3Archivo: '',
      hasConsultas: false,
    }
  },

  async created() {
    const paramsUrlAgendaAtencion = `?id=${this.$route.params.idCitaMedica}`
    await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
    if (this.agendaAtencionData.length == 0) {
      swal.errorMessage('Cita Médica no existe.')
      return
    }
    this.tipoDocumento = this.agendaAtencionData[0].ticket.paciente.tipoDocumento.descripcion
    this.documento = this.agendaAtencionData[0].ticket.paciente.documento
    this.nroHistoria = this.agendaAtencionData[0].ticket.paciente.historiaClinica[0].historiaClinica
    this.paterno = this.agendaAtencionData[0].ticket.paciente.paterno
    this.materno = this.agendaAtencionData[0].ticket.paciente.materno
    this.nombres = this.agendaAtencionData[0].ticket.paciente.nombres
    this.sexo = this.agendaAtencionData[0].ticket.paciente.sexo.descripcion
    this.fechaAtencion = this.agendaAtencionData[0].fechaAtencion != null ? this.agendaAtencionData[0].fechaAtencion : 'SIN FECHA'
    this.horaAtencion = this.agendaAtencionData[0].horaAtencion != null ? this.agendaAtencionData[0].horaAtencion : 'SIN HORA'
    this.tipoDiagnostico = this.agendaAtencionData[0].tipoDiagnostico != null ? this.agendaAtencionData[0].tipoDiagnostico.descripcion : ''
    this.diagnostico = this.agendaAtencionData[0].diagnosticoMedico != null ? this.agendaAtencionData[0].diagnosticoMedico : ''
    this.archivo1Ubicacion = this.agendaAtencionData[0].archivo1Ubicacion
    this.archivo2Ubicacion = this.agendaAtencionData[0].archivo2Ubicacion
    this.archivo3Ubicacion = this.agendaAtencionData[0].archivo3Ubicacion
    this.descripcion1Archivo = this.agendaAtencionData[0].descripcion1Archivo
    this.descripcion2Archivo = this.agendaAtencionData[0].descripcion2Archivo
    this.descripcion3Archivo = this.agendaAtencionData[0].descripcion3Archivo
    this.hasConsultas = this.agendaAtencionData[0].consultas.length > 0 ? true : false
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData']),

    existeArchivo1() {
      return this.archivo1Ubicacion != '' && this.archivo1Ubicacion != null
    },

    existeArchivo2() {
      return this.archivo2Ubicacion != '' && this.archivo2Ubicacion != null
    },

    existeArchivo3() {
      return this.archivo3Ubicacion != '' && this.archivo3Ubicacion != null
    },
  },

  methods: {
    ...mapActions('agendaAtencion', ['getAgendaAtencionData']),

    verArchivo(url) {
      window.open(url, '_blank');
    },

    verRespuesta() {
      this.$router.push({ 
        name: 'DetailConsulta', 
        params: { idCitaMedica: this.$route.params.idCitaMedica }
      })
    },
  }
}
</script>