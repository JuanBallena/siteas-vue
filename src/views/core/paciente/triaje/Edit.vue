<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="8" sm="9" class="mx-auto">
        <v-card 
          width="100%"
          :loading="loading">
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
              text="Datos personales del Paciente" 
            />
            <br>
            <ValidationObserver ref="datosTriajeRef">
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <v-text-field
                    outlined
                    dense
                    placeholder=" "
                    disabled
                    v-model="tipoDocumento"
                    label="Tipo de documento"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-text-field 
                    outlined 
                    dense 
                    placeholder=" "
                    disabled 
                    v-model="documento" 
                    label="N° de documento">
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-text-field 
                    outlined 
                    dense 
                    disabled
                    placeholder=" "
                    v-model="paciente" 
                    label="Paciente">                     
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      v-model="peso"
                      :error-messages="errors"
                      dense
                      @keypress="validarPeso"
                      placeholder=" "
                      label="Peso (en Kg.)">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      v-model="estatura"
                      outlined
                      :error-messages="errors"
                      dense
                      @keypress="validarEstatura"
                      placeholder=" "
                      label="Estatura (en cm.)">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      v-model="sintomas"
                      :error-messages="errors"
                      dense
                      placeholder=" "
                      label="Síntomas">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <SubTitle 
                text="Signos vitales"
              />
              <br>
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      v-model="presionArterial"
                      :error-messages="errors"
                      dense
                      placeholder=" "
                      label="Presión arterial (en mmHg.)"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      :items="parametroData1"
                      v-model="idGrupoSanguineo"
                      item-value="idParametro"
                      item-text="descripcion"
                      color="secondary"
                      outlined
                      :error-messages="errors"
                      dense
                      label="Grupo sanguíneo"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      v-model="ritmoCardiaco"
                      :error-messages="errors"
                      dense
                      placeholder=" "
                      label="Ritmo cardiaco (latidos por minuto)"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      :error-messages="errors"
                      dense
                      v-model="frecuenciaRespiratoria"
                      placeholder=" "
                      label="Frecuencia respiratoria (respiraciones por minuto)">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      color="secondary"
                      outlined
                      :error-messages="errors"
                      dense
                      v-model="temperaturaCorporal"
                      placeholder=" "
                      @keypress="validarTemperaturaCorporal"
                      label="Temperatura corporal (en °C)">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      :items="parametroData2"
                      v-model="idTipoDiagnostico"
                      item-value="idParametro"
                      item-text="descripcion"
                      color="secondary"
                      outlined
                      :error-messages="errors"
                      dense
                      label="Tipo diagnóstico"
                      placeholder="Seleccione">
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="12" md="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-textarea
                      height="100px"
                      outlined
                      :error-messages="errors"
                      color="secondary"
                      placeholder=" "
                      label="Diagnóstico"
                      v-model="diagnostico"> 
                    </v-textarea>
                  </ValidationProvider>
                </v-col>
                <template v-if="puedeEditarTriaje()">
                  <v-col cols="12" lg="4" offset-lg="4" md="4" offset-md="4" offset-sm="0">
                    <BtnSubmit
                      :title="buttonTitle"
                      :disabled="deshabilitado"
                      @click.native="updateTriaje()"
                    />
                  </v-col> 
                </template>
              </v-row>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validarNumeroEntero, validarNumeroDecimal } from "@/common/rulesValidate"
import { 
  PARAMETRO_TIPO_GRUPO_SANGUINEO, 
  PARAMETRO_TIPO_TIPO_DIAGNOSTICO 
} from '@/common/parametroTipoDefinition'
import { 
  PARAMETRO_SIN_DIAGNOSTICO, 
  PARAMETRO_CERRADO 
} from '@/common/parametroDefinition'
import * as swal from '@/plugins/sweetAlertMessages'
import * as ls from "@/localStorage/index"
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
      idGrupoSanguineo: -1,
      ritmoCardiaco: '',
      frecuenciaRespiratoria: '',
      temperaturaCorporal: '',
      idTipoDiagnostico: -1,
      diagnostico: '',
      idTicket: -1,
      idUsuarioLogged: -1,
      idEstadoTicket: -1,
      idEnfermeroResponsable: -1,
      title: '',
      esEditable: '',
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
    this.setPeso()
    this.setEstaura()
    this.setTemperaturaCorporal()
    this.sintomas = this.ticketToEdit.sintomas
    this.presionArterial = this.ticketToEdit.presionArterial
    this.ritmoCardiaco = this.ticketToEdit.ritmoCardiaco
    this.frecuenciaRespiratoria = this.ticketToEdit.frecuenciaRespiratoria
    this.idTipoDiagnostico = this.ticketToEdit.tipoDiagnostico.idParametro
    this.diagnostico = this.ticketToEdit.diagnosticoEnfermero
    this.idEnfermeroResponsable = this.ticketToEdit.enfermeroResponsable.idUsuario
    this.idUsuarioLogged = ls.getIdUsuario()
    this.idEstadoTicket = this.ticketToEdit.estadoTicket.idParametro
    this.title = 'Diagnóstico de Enfermería N° ' + this.ticketToEdit.codigo
    this.esEditable = this.ticketToEdit.esEditable
    this.setIdGrupoSanguineo()
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_GRUPO_SANGUINEO}`
    this.getParametroData1(paramsUrlParametro1)
    const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DIAGNOSTICO}`
    await this.getParametroData2(paramsUrlParametro2)
    this.filterTipoDiagnostico()
  },

  computed: {
    ...mapState('ticket', ['ticketToEdit','isSuccess','guardando']),
    ...mapState('parametro', ['parametroData1', 'parametroData2']),
    ...mapState('rulesValidate', ['required', 'requiredId','onlyNumbers']),

    loading() {
      return this.ticketToEdit == ''
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('ticket', ['edit','update']),
    ...mapActions('parametro', ['getParametroData1', 'getParametroData2','setParametroData2']),

    validarEstatura(event) {
      return validarNumeroEntero(event, this.estatura, 3)
    },

    validarPeso(event) {
      return validarNumeroDecimal(event, this.peso)
    },

    validarTemperaturaCorporal(event) {
      return validarNumeroDecimal(event, this.temperaturaCorporal, 2)
    },

    setPeso() {
      if (this.ticketToEdit.peso != null) {
        this.peso = String(this.ticketToEdit.peso) 
      }
    },

    setEstaura() {
      if (this.ticketToEdit.estatura != null) {
        this.estatura = String(this.ticketToEdit.estatura) 
      }
    },

    setTemperaturaCorporal() {
      if (this.ticketToEdit.temperaturaCorporal != null) {
        this.temperaturaCorporal = String(this.ticketToEdit.temperaturaCorporal) 
      }
    },

    setIdGrupoSanguineo() {
      if(this.ticketToEdit.grupoSanguineo != null) {
        this.idGrupoSanguineo = this.ticketToEdit.grupoSanguineo.idParametro
      }
    },

    filterTipoDiagnostico() {
      const items = this.parametroData2.filter(parametroTipoDiagnostico => parametroTipoDiagnostico.idParametro != PARAMETRO_CERRADO)
      this.setParametroData2(items)
    },

    puedeEditarTriaje() {
      return this.esEditable == 1 && this.idEnfermeroResponsable == this.idUsuarioLogged
    },

    async updateTriaje() {
      const isValid = await this.$refs.datosTriajeRef.validate()
      if (isValid) {
        if(this.idTipoDiagnostico == PARAMETRO_SIN_DIAGNOSTICO) {
          swal.infoMessage('Cambie el tipo de diagnóstico.')
        } else {
          const params = {
            "diagnostico-enfermero": {
              data: {
                peso: parseFloat(this.peso),
                estatura: parseInt(this.estatura),
                sintomas: this.sintomas,
                presionArterial: this.presionArterial,
                ritmoCardiaco: this.ritmoCardiaco,
                frecuenciaRespiratoria: this.frecuenciaRespiratoria,
                temperaturaCorporal: this.temperaturaCorporal,
                diagnostico: this.diagnostico,
                grupoSanguineo: this.idGrupoSanguineo,
                tipoDiagnostico: this.idTipoDiagnostico,
              }
            }
          }
          await this.update({ idTicket: this.ticketToEdit.idTicket, params: params })
          if(this.isSuccess) {
            this.$router.push({ name: 'ListPaciente' })
            swal.successMessage('Se registró correctamente.')
          }
        }
      }
    }
  }
}
</script>