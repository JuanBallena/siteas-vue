<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" md="9" sm="10" class="mx-auto">
        <v-card width="100%" :loading="loading">
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
              class="white rounded px-5">
              <ValidationObserver ref="diagnosticoForm">
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
                    <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                      <v-select
                        v-model="idTipoDiagnostico"
                        :items="parametroData1"
                        item-text="descripcion"
                        item-value="idParametro"
                        color="secondary"
                        outlined
                        dense
                        :error-messages="errors"
                        label="Tipo diagnóstico"
                        placeholder="Seleccione">
                      </v-select>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" lg="12" class="py-0">
                    <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                      <v-textarea
                        v-model="diagnostico"
                        min-height="200px"
                        outlined
                        :error-messages="errors"
                        color="secondary"
                        placeholder=" "
                        label="Diagnóstico"> 
                      </v-textarea>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <template v-if="existeArchivo1 || existeArchivo2 || existeArchivo3">
                  <SubTitle 
                    text="Archivos Adjuntados" 
                  />
                  <v-list dense>
                    <template v-if="existeArchivo1">
                      <v-list-item class="border-bottom">
                        <v-list-item-content>
                          <v-list-item-title>{{ descripcion1Archivo }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <BtnViewFile 
                            @click.native="verArchivo(archivo1Ubicacion)"
                          />
                          <BtnDeleteFile 
                            @click.native="eliminarArchivo(1)"
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
                          <BtnDeleteFile 
                            @click.native="eliminarArchivo(2)"
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
                          <BtnDeleteFile 
                            @click.native="eliminarArchivo(3)"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                    </template>
                  </v-list>
                  <br>
                </template>
                <template v-if="!existeArchivo1 || !existeArchivo2 || !existeArchivo3">
                  <SubTitle text="Adjuntar archivos" />
                  <br>
                </template>
                <v-row>
                  <template v-if="!existeArchivo1">
                    <v-col cols="12" lg="6" class="py-1">
                      <v-file-input
                        prepend-icon="fas fa-folder-open"
                        outlined
                        dense
                        clear-icon
                        v-model="file1"
                        color="secondary"
                        placeholder="Seleccione archivo"
                        label="Archivo">
                      </v-file-input>
                    </v-col>
                    <v-col cols="12" lg="6" class="py-1">
                      <v-text-field
                        v-model="descripcion1"
                        outlined
                        dense
                        color="secondary"
                        placeholder=" "
                        label="Descripción">
                      </v-text-field>
                    </v-col>
                  </template>                
                  <template v-if="!existeArchivo2">
                    <v-col cols="12" lg="6" class="py-1">
                      <v-file-input
                        prepend-icon="fas fa-folder-open"
                        outlined
                        dense
                        clear-icon
                        v-model="file2"
                        color="secondary"
                        placeholder="Seleccione archivo"
                        label="Archivo">
                      </v-file-input>
                    </v-col>
                    <v-col cols="12" lg="6" class="py-1">
                      <v-text-field
                        v-model="descripcion2"
                        outlined
                        dense
                        color="secondary"
                        placeholder=" "
                        label="Descripción">
                      </v-text-field>
                    </v-col>
                  </template>
                  <template v-if="!existeArchivo3">
                    <v-col cols="12" lg="6" class="py-1">
                      <v-file-input
                        prepend-icon="fas fa-folder-open"
                        outlined
                        dense
                        clear-icon
                        v-model="file3"
                        color="secondary"
                        placeholder="Seleccione archivo"
                        label="Archivo">
                      </v-file-input>
                    </v-col>
                    <v-col cols="12" lg="6" class="py-1">
                      <v-text-field
                        v-model="descripcion3"
                        outlined
                        dense
                        color="secondary"
                        placeholder=" "
                        label="Descripción">
                      </v-text-field>
                    </v-col>
                  </template>
                  <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                    <BtnSubmit
                      :title="buttonTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDiagnosticoMedicoTratante()"
                    />
                  </v-col>
                </v-row>
              </ValidationObserver>
            </v-card-text>
            <br>
            <!-- Realizar derivación Especializada -->
            <template v-if="!limiteConsultas && consultaAtendida">
              <v-card-text class="white rounded">
                <v-row>
                  <v-col cols="12" lg="12" class="d-flex py-0">
                    <v-btn
                      icon
                      color="primary"
                      @click.prevent="expandedCard()">
                      <v-icon>
                        {{ expand ? 'fas fa-check-square' : 'far fa-square' }}
                      </v-icon>
                    </v-btn>
                    <h6 class="pt-2">Realizar derivación especializada</h6>
                  </v-col>
                  <v-col cols="12" lg="12" class="py-0">
                    <v-expand-transition>
                      <v-card
                        elevation="0"
                        v-show="expand"
                        height="100%"
                        width="100%">
                        <v-card-text class="p-1">
                          <hr>
                          <ValidationObserver ref="datosConsultaMedica">
                            <v-row>
                              <v-col cols="12" lg="4" md="4">
                                <ItemIconText color="primary" icon="fas fa-calendar-alt" :text="fechaConsulta" />
                              </v-col>
                              <v-col cols="12" lg="4" md="4">
                                <ItemIconText color="primary" icon="fas fa-clock" :text="horaConsulta" />
                              </v-col>
                              <v-col cols="12" lg="12">
                                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                                  <v-textarea
                                    min-height="200px"
                                    outlined
                                    v-model="consulta"
                                    :error-messages="errors"
                                    color="secondary"
                                    placeholder=" "
                                    label="Consulta"> 
                                  </v-textarea>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" lg="6" md="6">
                                <v-select
                                  v-model="idDiresa"
                                  :items="diresaData"
                                  dense
                                  outlined
                                  item-text="nombre"
                                  color="secondary"
                                  item-value="idDiresa"
                                  label="Diresa"
                                  placeholder="Seleccione"
                                  @change="onChangeDiresa">
                                </v-select>
                              </v-col>
                              <v-col cols="12" lg="6" md="6">
                                <v-select
                                  no-data-text="Sin opciones"
                                  v-model="idRedAsistencial"
                                  :items="redAsistencialData"
                                  item-text="nombre"
                                  color="secondary"
                                  dense
                                  outlined
                                  item-value="idRedAsistencial"
                                  label="Red Asistencial"
                                  placeholder="Seleccione"
                                  @change="onChangeRedAsistencial"> 
                                </v-select>
                              </v-col>
                              <v-col cols="12" lg="6" md="6">
                              <v-select
                                  v-model="idMicroredAsistencial"
                                  :items="microredAsistencialData"
                                  no-data-text="Sin opciones"
                                  item-text="nombre"
                                  dense
                                  outlined
                                  color="secondary"
                                  item-value="idMicroredAsistencial"
                                  label="Microred Asistencial"
                                  @change="onChangeMicroredAsistencial"
                                  placeholder="Seleccione"> 
                                </v-select>
                              </v-col>
                              <v-col cols="12" lg="6" md="6">
                                <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                                  <v-select
                                    v-model="idCentroAsistencial"
                                    no-data-text="Sin opciones"
                                    :items="centroAsistencialData"
                                    item-text="nombre"
                                    color="secondary"
                                    dense
                                    outlined
                                    item-value="idCentroAsistencial"
                                    label="Centro Asistencial"
                                    :error-messages="errors"
                                    placeholder="Seleccione"> 
                                  </v-select>
                                </ValidationProvider>
                              </v-col>
                              <v-col cols="12" lg="6" md="6">
                                <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                                  <v-select
                                    :items="especialidadData"
                                    item-text="nombre"
                                    item-value="idEspecialidad"
                                    v-model="idEspecialidad"
                                    color="secondary"
                                    dense
                                    :error-messages="errors"
                                    outlined
                                    label="Especialidad"
                                    placeholder="Seleccione"> 
                                  </v-select>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                            <SubTitle 
                              text="Adjuntar archivos" 
                            />
                            <br>
                            <v-row>                
                              <v-col cols="12" lg="6" class="py-1">
                                <v-file-input
                                  prepend-icon="fas fa-folder-open"
                                  outlined
                                  dense
                                  clear-icon
                                  v-model="file1Consulta"
                                  color="secondary"
                                  placeholder=" "
                                  label="Archivo">
                                </v-file-input>
                              </v-col>
                              <v-col cols="12" lg="6" class="py-1">
                                <v-text-field
                                  v-model="descripcion1Consulta"
                                  outlined
                                  dense
                                  color="secondary"
                                  placeholder=" "
                                  label="Descripción">
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6" class="py-1">
                                <v-file-input
                                  prepend-icon="fas fa-folder-open"
                                  outlined
                                  dense
                                  clear-icon
                                  v-model="file2Consulta"
                                  color="secondary"
                                  placeholder=" "
                                  label="Archivo">
                                </v-file-input>
                              </v-col>
                              <v-col cols="12" lg="6" class="py-1">
                                <v-text-field
                                  v-model="descripcion2Consulta"
                                  outlined
                                  dense
                                  color="secondary"
                                  placeholder=" "
                                  label="Descripción">
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6" class="py-1">
                                <v-file-input
                                  prepend-icon="fas fa-folder-open"
                                  outlined
                                  dense
                                  clear-icon
                                  v-model="file3Consulta"
                                  color="secondary"
                                  placeholder=" "
                                  label="Archivo">
                                </v-file-input>
                              </v-col>
                              <v-col cols="12" lg="6" class="py-1">
                                <v-text-field
                                  v-model="descripcion3Consulta"
                                  outlined
                                  dense
                                  color="secondary"
                                  placeholder=" "
                                  label="Descripción">
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                                <BtnSubmit 
                                  :title="buttonEnviarTitle"
                                  :disabled="deshabilitadoButtonEnviar"
                                  @click.native="enviarConsultaMedica()"
                                />
                              </v-col>
                            </v-row>
                          </ValidationObserver>
                        </v-card-text>
                      </v-card>
                    </v-expand-transition>
                  </v-col>
                </v-row>
              </v-card-text>
              <br>
            </template>
            <v-row>
              <v-col cols="12" lg="6" offset-lg="3" md="6" offset-md="3" offset-sm="0" 
                v-if="hasConsultas">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="cancelar()"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      block
                      small
                      color="primary"
                      @click="verRespuesta()">
                      Ver respuesta
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0" 
                v-else>
                <BtnCancel 
                  @click.native="cancelar()" 
                />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay" class="text-center" color="secondary">
      <h6>{{ textOverlay }}</h6>
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { PARAMETRO_TIPO_TIPO_DIAGNOSTICO } from "@/common/parametroTipoDefinition"
import { 
  PARAMETRO_CERRADO, 
  PARAMETRO_SIN_DIAGNOSTICO, 
  PARAMETRO_ATENDIDO 
} from "@/common/parametroDefinition"
import { getFechaActual, getHoraActual } from "@/common/functionsDatetime"
import * as ls from'@/localStorage/index'
import * as swal from "@/plugins/sweetAlertMessages"
export default {
  data: () => {
    return {
      overlay: false,
      textOverlay: '',
      tipoDocumento: '',
      documento: '',
      nroHistoria: '',
      paterno: '',
      materno: '',
      nombres: '',
      sexo: '',
      idCitaMedica: -1,
      idMedicoTratante: -1,
      loadedFile: false,
      fechaAtencion: '',
      horaAtencion: '',
      idTipoDiagnostico: -1,
      diagnostico: '',
      file1: null,
      file2: null,
      file3: null,
      descripcion1: '',
      descripcion2: '',
      descripcion3: '',
      archivo1Ubicacion: '',
      archivo2Ubicacion: '',
      archivo3Ubicacion: '',
      descripcion1Archivo: '',
      descripcion2Archivo: '',
      descripcion3Archivo: '',
      expand: false,
      hasConsultas: false,
      fechaConsulta: getFechaActual(),
      horaConsulta: getHoraActual(),
      consulta: '',
      idDiresa: -1,
      idRedAsistencial: -1,
      idMicroredAsistencial: -1,
      idCentroAsistencial: -1,
      idEspecialidad: -1,
      file1Consulta: null,
      file2Consulta: null,
      file3Consulta: null,
      descripcion1Consulta: '',
      descripcion2Consulta: '',
      descripcion3Consulta: '',
      loop: true,
      consultas: [],
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
    this.idCitaMedica = this.agendaAtencionData[0].idCitaMedica
    this.idMedicoTratante = parseInt(ls.getIdUsuario())
    await this.cargarDetallesCitaMedica()
    this.consultas = this.agendaAtencionData[0].consultas
    this.hasConsultas = this.agendaAtencionData[0].consultas.length > 0 ? true : false
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DIAGNOSTICO}`
    await this.getParametroData1(paramsUrlParametro1)
    this.filterTipoDiagnostico()
    if (!this.horaAtencion) {
      this.horaAutomatica()
    }
  },

  mounted() {
    if (this.fechaConsulta) {
      setInterval(this.calcularFechaHoraConsulta, 1000);
    }
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData','isSuccess','pages','guardando']),
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('microredAsistencial', ['microredAsistencialData']),
    ...mapState('centroAsistencial', ['centroAsistencialData']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('especialidad', ['especialidadData']),
    ...mapState('rulesValidate', ['required','requiredId']),
    ...mapState('consultaMedica', ['successCreateConsulta','guardandoConsultaMedica']),

    loading() {
      return this.pages == -1
    },

    inputFile1Loaded() {
      return this.file1 != undefined && this.file1 != null
    },

    inputFile2Loaded() {
      return this.file2 != undefined && this.file2 != null
    },

    inputFile3Loaded() {
      return this.file3 != undefined && this.file3 != null
    },

    inputFile1ConsultaLoaded() {
      return this.file1Consulta != undefined && this.file1Consulta != null
    },

    inputFile2ConsultaLoaded() {
      return this.file2Consulta != undefined && this.file2Consulta != null
    },

    inputFile3ConsultaLoaded() {
      return this.file3Consulta != undefined && this.file3Consulta != null
    },

    existeArchivo1() {
      return this.archivo1Ubicacion != '' && this.archivo1Ubicacion != null
    },

    existeArchivo2() {
      return this.archivo2Ubicacion != '' && this.archivo2Ubicacion != null
    },

    existeArchivo3() {
      return this.archivo3Ubicacion != '' && this.archivo3Ubicacion != null
    },

    limiteConsultas() {
      return this.consultas.length == 3
    },

    consultaAtendida() {
      return this.consultas.length == 0 || this.consultas[this.consultas.length - 1].estadoAtencion.idParametro == PARAMETRO_ATENDIDO
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },

    deshabilitadoButtonEnviar() {
      return this.guardandoConsultaMedica
    },

    buttonEnviarTitle() {
      return this.guardandoConsultaMedica ? 'Enviando...' : 'Enviar'
    },
  },

  methods: {
    ...mapActions('agendaAtencion', [
      'getAgendaAtencionData',
      'updateAgendaAtencionAndFiles',
      'deleteFileAgendaAtencion',
    ]),
    ...mapActions('diresa', ['getDiresaData']),
    ...mapActions('redAsistencial', ['getRedAsistencialData','setRedAsistencialData']),
    ...mapActions('microredAsistencial', ['getMicroredAsistencialData','setMicroredAsistencialData']),
    ...mapActions('centroAsistencial', ['getCentroAsistencialData','setCentroAsistencialData']),
    ...mapActions('parametro', ['getParametroData1','setParametroData1']),
    ...mapActions('especialidad', ['getEspecialidadData']),
    ...mapActions('consultaMedica', ['save']),

    horaAutomatica(){
      setInterval(this.calcularFechaHoraAtencion, 1000);
    },

    calcularFechaHoraAtencion() {
      if (this.loop) {
        this.fechaAtencion = getFechaActual()
        this.horaAtencion = getHoraActual()
      } else {
        clearInterval(this.horaAutomatica)
      }
    },

    calcularFechaHoraConsulta() {
      this.fechaConsulta = getFechaActual()
      this.horaConsulta = getHoraActual()
    },

    filterTipoDiagnostico() {
      const items = this.parametroData1.filter(parametroTipoDiagnostico => parametroTipoDiagnostico.idParametro != PARAMETRO_CERRADO)
      this.setParametroData1(items)
    },

    async cargarDetallesCitaMedica() {
      this.fechaAtencion = this.agendaAtencionData[0].fechaAtencion != null ? this.agendaAtencionData[0].fechaAtencion : ''
      this.horaAtencion = this.agendaAtencionData[0].horaAtencion != null ? this.agendaAtencionData[0].horaAtencion : ''
      this.idTipoDiagnostico = this.agendaAtencionData[0].tipoDiagnostico != null ? this.agendaAtencionData[0].tipoDiagnostico.idParametro : -1
      this.diagnostico = this.agendaAtencionData[0].diagnosticoMedico != null ? this.agendaAtencionData[0].diagnosticoMedico : ''
      this.archivo1Ubicacion = this.agendaAtencionData[0].archivo1Ubicacion
      this.archivo2Ubicacion = this.agendaAtencionData[0].archivo2Ubicacion
      this.archivo3Ubicacion = this.agendaAtencionData[0].archivo3Ubicacion
      this.descripcion1Archivo = this.agendaAtencionData[0].descripcion1Archivo
      this.descripcion2Archivo = this.agendaAtencionData[0].descripcion2Archivo
      this.descripcion3Archivo = this.agendaAtencionData[0].descripcion3Archivo
    },

    resetInputsFiles() {
      this.file1 = null
      this.file2 = null
      this.file3 = null
      this.descripcion1 = ''
      this.descripcion2 = ''
      this.descripcion3 = ''
    },

    async guardarDiagnosticoMedicoTratante() {
      const isValid = await this.$refs.diagnosticoForm.validate()
      if (isValid) {
        if (this.idTipoDiagnostico == PARAMETRO_SIN_DIAGNOSTICO) {
          swal.infoMessage('Cambie el tipo de diagnóstico.')
        } else {
          this.textOverlay = 'Guardando diagnóstico...'
          const params = {
            atencionMedica: {
              data: {
                fechaAtencion: this.fechaAtencion,
                horaAtencion: this.horaAtencion,
                diagnostico: this.diagnostico,
                idTipoDiagnostico: this.idTipoDiagnostico,
                idMedicoTratante: this.idMedicoTratante,
              }
            }
          }
          const dataPost = new FormData();
          dataPost.append('data',JSON.stringify(params))
          
          if (this.inputFile1Loaded) {
            dataPost.append('file1', this.file1)
            dataPost.append('descripcion1', this.descripcion1)
          }
          if (this.inputFile2Loaded) {
            dataPost.append('file2', this.file2)
            dataPost.append('descripcion2', this.descripcion2)
          }
          if (this.inputFile3Loaded) {
            dataPost.append('file3', this.file3)
            dataPost.append('descripcion3', this.descripcion3)
          }
          if (this.inputFile1Loaded || this.inputFile2Loaded || this.inputFile3Loaded) {
            this.overlay = true
          }
          await this.updateAgendaAtencionAndFiles({ 
            idCitaMedica: this.idCitaMedica, 
            params: dataPost,
          })
          this.overlay = false
          if (this.isSuccess) {
            this.loop = false
            swal.successMessage('Los datos se guardaron correctamente.')
            const paramsUrlAgendaAtencion = `?id=${this.$route.params.idCitaMedica}`
            await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
            await this.cargarDetallesCitaMedica()
            this.resetInputsFiles()
          }
        }
      }
    },

    verArchivo(url) {
      window.open(url, '_blank');
    },

    async eliminarArchivo(indice) {
      const res = await swal.confirm('¿Está seguro de eliminar este archivo?')
      if (res) {
        await this.deleteFileAgendaAtencion({ 
          idCitaMedica: this.idCitaMedica, 
          indiceFile: indice
        })
        if (this.isSuccess) {
          swal.successMessage('El archivo ha sido eliminado.')
          const paramsUrlAgendaAtencion = `?id=${this.$route.params.idCitaMedica}`
          await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
          await this.cargarDetallesCitaMedica()
          this.resetInputsFiles()
        }
      }
    },

    async expandedCard() {
      this.expand = !this.expand
      if (this.expand) {
        this.setRedAsistencialData([])
        this.setMicroredAsistencialData([])
        this.setCentroAsistencialData([])
        const paramsUrlDiresa = ``
        await this.getDiresaData(paramsUrlDiresa)
        const paramsUrlEspecialidad = ``
        await this.getEspecialidadData(paramsUrlEspecialidad)
      }
    },

    async enviarConsultaMedica() {
      const isValid = await this.$refs.datosConsultaMedica.validate()
      if (isValid) {
        this.textOverlay = 'Enviando consulta...'
        const params = {
          consultaMedica: {
            data: {
              fechaConsulta: this.fechaConsulta,
              horaConsulta: this.horaConsulta,
              idEspecialidad: this.idEspecialidad,
              idCentroAsistencial: this.idCentroAsistencial,
              idCitaMedica: this.idCitaMedica,
              consulta: this.consulta,
              idMedicoTratante: this.idMedicoTratante
            }
          }
        }
        const dataPost = new FormData();
        dataPost.append('data',JSON.stringify(params))
        
        if (this.inputFile1ConsultaLoaded) {
          dataPost.append('file1', this.file1Consulta)
          dataPost.append('descripcion1', this.descripcion1Consulta)
        }
        if (this.inputFile2ConsultaLoaded) {
          dataPost.append('file2', this.file2Consulta)
          dataPost.append('descripcion2', this.descripcion2Consulta)
        }
        if (this.inputFile3ConsultaLoaded) {
          dataPost.append('file3', this.file3Consulta)
          dataPost.append('descripcion3', this.descripcion3Consulta)
        }
        if (this.inputFile1ConsultaLoaded || this.inputFile2ConsultaLoaded || this.inputFile3ConsultaLoaded) {
          this.overlay = true
        }
        await this.save(dataPost)
        this.overlay = false
        if (this.successCreateConsulta) {
          swal.successMessage('La consulta se envió correctamente.')
          const paramsUrlAgendaAtencion = `?id=${this.$route.params.idCitaMedica}`
          await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
          this.hasConsultas = this.agendaAtencionData[0].consultas.length > 0 ? true : false
          this.consultas = this.agendaAtencionData[0].consultas
        }
      }
    },

    async onChangeDiresa() {
      this.setMicroredAsistencialData([])
      this.setCentroAsistencialData([])
      this.idRedAsistencial = -1
      this.idMicroredAsistencial = -1
      this.idCentroAsistencial = -1
      const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
      await this.getRedAsistencialData(paramsUrlRedAsistencial)
    },

    async onChangeRedAsistencial() {
      this.setCentroAsistencialData([])
      this.idMicroredAsistencial = -1
      this.idCentroAsistencial = -1
      const paramsUrlMicroredAsistencial = `?idRedAsistencial=${this.idRedAsistencial}`
      await this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    },

    async onChangeMicroredAsistencial() {
      this.idCentroAsistencial = -1
      const paramsUrlCentroAsistencial = `?idMicroredAsistencial=${this.idMicroredAsistencial}`
      await this.getCentroAsistencialData(paramsUrlCentroAsistencial)
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListAgendaAtencion' 
      })
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