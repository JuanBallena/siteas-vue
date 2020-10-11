<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="9" sm="10" class="mx-auto">
        <v-card width="100%" :loading="loading">
          <v-card-text
            class="px-5">
            <TitleCenter 
              text="Consulta Médica"
            />
            <hr>
            <SubTitle 
              text="Datos generales"
            />
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="codigo"
                  dense
                  readonly
                  placeholder=" "
                  label="Código Atención">
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <v-text-field
                  v-model="paciente"
                  dense
                  readonly
                  placeholder=" "
                  label="Paciente">
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
            </v-row>
          </v-card-text>
          <div class="accent px-4 py-4">
            <v-card-text
              v-for="(item, index) in consultas"
              :key="index"
              class="white rounded px-6 mb-4">
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-calendar-alt" 
                    :text="item.fechaConsulta" 
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-clock" 
                    :text="item.horaConsulta"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <v-chip
                    class="mt-1"
                    small
                    :color="getColorChip(item.estadoAtencion.idParametro)"
                    text-color="white">
                    {{ item.estadoAtencion.descripcion }}
                  </v-chip>
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-clinic-medical" 
                    :text="item.centroAsistencial.nombre"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="4">
                  <ItemIconText 
                    color="primary" 
                    icon="fas fa-user-md" 
                    :text="item.especialidad.nombre"
                  />
                </v-col>
                <v-col cols="12" lg="12" class="pb-0">
                  <v-textarea
                    readonly
                    filled
                    background-color="accent"
                    v-model="item.consulta"
                    min-height="150px"
                    placeholder=" "
                    :label="`Consulta ${index + 1}`">
                  </v-textarea>
                </v-col>
                <v-col cols="12" lg="12" class="py-0">
                  <SubTitle v-if="item.archivo1Ubicacion || item.archivo2Ubicacion || item.archivo3Ubicacion"
                    text="Archivos Adjuntados"
                  />
                  <SubTitle v-else
                    text="*Sin archivos adjuntos" 
                  />
                  <v-list 
                    dense>
                    <template v-if="existeArchivo(item.archivo1Ubicacion)">
                      <v-list-item class="border-bottom">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.descripcion1Archivo }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <BtnViewFile 
                            @click.native="verArchivo(item.archivo1Ubicacion)"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                    </template>
                    <template v-if="existeArchivo(item.archivo2Ubicacion)">
                      <v-list-item class="border-bottom">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.descripcion2Archivo }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <BtnViewFile 
                            @click.native="verArchivo(item.archivo2Ubicacion)"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                    </template>
                    <template v-if="existeArchivo(item.archivo3Ubicacion)">
                      <v-list-item class="border-bottom">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.descripcion3Archivo }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <BtnViewFile 
                            @click.native="verArchivo(item.archivo3Ubicacion)"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                    </template> 
                  </v-list>
                </v-col>
                <template v-if="consultaMedicaAtendida(item.estadoAtencion.idParametro)">
                  <v-col cols="12" lg="4" md="4">
                    <ItemIconText 
                      color="primary" 
                      icon="fas fa-calendar-alt" 
                      :text="item.fechaRespuesta"
                    />
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <ItemIconText 
                      color="primary" 
                      icon="fas fa-clock" 
                      :text="item.horaRespuesta"
                    />
                  </v-col>
                  <v-col cols="12">
                    <ItemIconText 
                      color="primary" 
                      icon="fas fa-user-md" 
                      :text="getNombreMedicoEspecialista(item.medicoEspecialista)"
                    />
                  </v-col>
                  <v-col cols="12" lg="12" class="pb-0">
                    <v-textarea
                      background-color="info"
                      filled
                      v-model="item.respuesta"
                      min-height="200px"
                      placeholder=" "
                      label="Respuesta emitida"> 
                    </v-textarea>
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
            <br>
            <template v-if="!ultimaConsultaMedicaAtendida">
              <v-card-text
                class="white rounded px-6 mb-4">
                <ValidationObserver ref="datosRespuestaRef">
                  <v-row>
                    <v-col cols="12" lg="4" md="4">
                      <ItemIconText 
                        color="primary" 
                        icon="fas fa-calendar-alt" 
                        :text="fechaRespuesta"
                      />
                    </v-col>
                    <v-col cols="12" lg="4" md="4">
                      <ItemIconText 
                        color="primary" 
                        icon="fas fa-clock" 
                        :text="horaRespuesta"
                      />
                    </v-col>
                    <v-col cols="12" lg="12" class="pb-0">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-textarea
                          outlined
                          color="secondary"
                          :error-messages="errors"
                          v-model="respuesta"
                          min-height="200px"
                          placeholder=" "
                          label="Respuesta"> 
                        </v-textarea>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                      <BtnSubmit 
                        :title="buttonEnviarTitle"
                        :disabled="deshabilitadoButtonEnviar" 
                        @click.native="guardarRespuestaConsultaMedica()"
                      />
                    </v-col>
                  </v-row>
                </ValidationObserver>
              </v-card-text>
            </template>
            <v-row>
              <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                <BtnCancel 
                  @click.native="cancelar()"
                />
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
import { 
  PARAMETRO_ATENDIDO, 
  PARAMETRO_EN_REVISION, 
  PARAMETRO_PENDIENTE 
} from "@/common/parametroDefinition"
import { getFechaActual, getHoraActual } from "@/common/functionsDatetime"
import { getColorSegunEstadoAtencion} from '@/common/functionsConsultaMedica'
import * as swal from "@/plugins/sweetAlertMessages"
import * as ls from '@/localStorage/index'
export default {
  data: () => {
    return {
      codigo: '',
      centroAsistencial: '',
      paciente: '',
      sexo: '',
      tipoDocumento: '',
      documento: '',
      especialidad: '',
      consultas: [],
      fechaRespuesta: getFechaActual(),
      horaRespuesta: getHoraActual(),
      idEstadoAtencion: PARAMETRO_ATENDIDO,
      respuesta: '',
      idMedicoEspecialista: parseInt(ls.getIdUsuario()),
      idConsultaMedica: -1,
    }
  },

  async created() {
    const paramsUrlAgendaAtencion = `?id=${this.$route.params.idCitaMedica}`
    await this.getAgendaAtencionData(paramsUrlAgendaAtencion)
    if (this.agendaAtencionData.length == 0) {
      swal.errorMessage('Cita Médica no existe.')
      return
    }
    this.codigo = this.agendaAtencionData[0].ticket.codigo
    this.centroAsistencial = this.agendaAtencionData[0].consultas[0].centroAsistencial.nombre
    this.paciente = this.agendaAtencionData[0].ticket.paciente.paterno+' '+this.agendaAtencionData[0].ticket.paciente.materno+' '+this.agendaAtencionData[0].ticket.paciente.nombres
    this.sexo = this.agendaAtencionData[0].ticket.paciente.sexo.descripcion
    this.tipoDocumento = this.agendaAtencionData[0].ticket.paciente.tipoDocumento.descripcion
    this.documento = this.agendaAtencionData[0].ticket.paciente.documento
    this.especialidad = this.agendaAtencionData[0].consultas[0].especialidad.nombre
    this.consultas = this.agendaAtencionData[0].consultas
    this.idConsultaMedica = this.consultas[this.consultas.length - 1].idConsultaMedica
    if (this.agendaAtencionData[0].consultas[this.agendaAtencionData[0].consultas.length - 1].estadoAtencion.idParametro == PARAMETRO_PENDIENTE) {
      await this.cambiarEstadoAtencionCitaMedica()
    }
  },

  mounted() {
    setInterval(this.calcularFechaHoraRespuesta, 1000);
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData','pages']),
    ...mapState('consultaMedica', ['successUpdateConsulta','guardandoConsultaMedica']),
    ...mapState('rulesValidate', ['required']),

    loading() {
      return this.pages == -1
    },

    ultimaConsultaMedicaAtendida() {
      return this.consultas.length == 0 || this.consultas[this.consultas.length - 1].estadoAtencion.idParametro == PARAMETRO_ATENDIDO
    },

    deshabilitadoButtonEnviar() {
      return this.guardandoConsultaMedica
    },

    buttonEnviarTitle() {
      return this.guardandoConsultaMedica ? 'Enviando...' : 'Enviar'
    },
  },

  methods: {
    ...mapActions('agendaAtencion', ['getAgendaAtencionData']),
    ...mapActions('consultaMedica', ['update']),

    getNombreMedicoEspecialista(item) {
      return item.nombres +' '+item.paterno +' '+item.materno
    },

    calcularFechaHoraRespuesta() {
      this.fechaRespuesta = getFechaActual()
      this.horaRespuesta = getHoraActual()
    },

    getColorChip(idParametro) {
      return getColorSegunEstadoAtencion(idParametro)
    },

    existeArchivo(archivoUbicacion) {
      return archivoUbicacion != null
    },

    consultaMedicaAtendida(idParametro) {
      return idParametro == PARAMETRO_ATENDIDO
    },

    async cambiarEstadoAtencionCitaMedica() {
      const params = {
        consultaMedica: {
          data: {
            idEstadoAtencion: PARAMETRO_EN_REVISION,
            idMedicoEspecialista: this.idMedicoEspecialista
          }
        }
      }
      await this.update({ 
        idConsultaMedica: this.idConsultaMedica, 
        params: params
      })
    },

    async guardarRespuestaConsultaMedica() {
      const isValid = await this.$refs.datosRespuestaRef.validate()
      if (isValid) {
        const params = {
          consultaMedica: {
            data: {
              fechaRespuesta: this.fechaRespuesta,
              horaRespuesta: this.horaRespuesta,
              idEstadoAtencion: this.idEstadoAtencion,
              respuesta: this.respuesta,
              idMedicoEspecialista: this.idMedicoEspecialista
            }
          }
        }
        await this.update({ 
          idConsultaMedica: this.idConsultaMedica, 
          params: params
        })
        if (this.successUpdateConsulta) {
          swal.successMessage('La respuesta se envió correctamente.')
          this.$router.push({ 
            name: 'DetailConsulta', 
            params: { idCitaMedica: this.$route.params.idCitaMedica } 
          })
        }
      }
    },

    verArchivo(url) {
      window.open(url, '_blank');
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListConsultaMedica' 
      })
    }
  }
}
</script>
