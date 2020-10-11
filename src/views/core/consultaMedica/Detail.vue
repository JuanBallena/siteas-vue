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
                  label="Código atención">
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
          <div class="accent p-3">
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
                  <v-list dense>
                    <template v-if="item.archivo1Ubicacion">
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
                    <template v-if="item.archivo2Ubicacion">
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
                    <template v-if="item.archivo3Ubicacion">
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
                      :text="item.medicoEspecialista | fullName"
                    />
                  </v-col>
                  <v-col cols="12" lg="12" class="pb-0">
                    <v-textarea
                      background-color="info"
                      filled
                      readonly
                      v-model="item.respuesta"
                      min-height="200px"
                      placeholder=" "
                      label="Respuesta emitida"> 
                    </v-textarea>
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import * as swal from '@/plugins/sweetAlertMessages'
import { PARAMETRO_ATENDIDO } from "@/common/parametroDefinition"
import { getColorSegunEstadoAtencion} from '@/common/functionsConsultaMedica'
export default {
  data: () => {
    return {
      codigo: '',
      paciente: '',
      sexo: '',
      tipoDocumento: '',
      documento: '',
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
    this.codigo = this.agendaAtencionData[0].ticket.codigo
    this.paciente = this.agendaAtencionData[0].ticket.paciente.paterno+' '+this.agendaAtencionData[0].ticket.paciente.materno+' '+this.agendaAtencionData[0].ticket.paciente.nombres
    this.sexo = this.agendaAtencionData[0].ticket.paciente.sexo.descripcion
    this.tipoDocumento = this.agendaAtencionData[0].ticket.paciente.tipoDocumento.descripcion
    this.documento = this.agendaAtencionData[0].ticket.paciente.documento
    this.consultas = this.agendaAtencionData[0].consultas
  },

  computed: {
    ...mapState('agendaAtencion', ['agendaAtencionData','pages']),

    loading() {
      return this.pages == -1
    },
  },

  methods: {
    ...mapActions('agendaAtencion', ['getAgendaAtencionData']),

    getColorChip(idParametro) {
      return getColorSegunEstadoAtencion(idParametro)
    },

    consultaMedicaAtendida(idParametro) {
      return idParametro == PARAMETRO_ATENDIDO
    },

    verArchivo(url) {
      window.open(url, '_blank');
    },
  }
}
</script>
