<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="8" sm="9" class="mx-auto">
        <v-card
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para registrar llegada de Paciente"
            />
            <hr>
            <ValidationObserver ref="datosTicketRef">
              <SubTitle 
                text="Datos personales del Paciente"
              />
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      :items="parametroData1"
                      v-model="idTipoDocumento"
                      color="secondary"
                      item-text="descripcion"
                      item-value="idParametro"
                      label="Tipo de documento"
                      :error-messages="errors"
                      placeholder="Seleccione"
                      @change="validarLengthDocumento()"
                      outlined
                      dense> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" :rules="`required|length:${this.lengthDocumento}|onlyNumbers`" v-slot="{ errors }">
                    <v-text-field
                      label="N° de documento"
                      append-icon="fas fa-search"
                      color="secondary"
                      outlined
                      dense
                      v-model="documento"
                      placeholder=" "
                      @keypress="validarDocumento"
                      :error-messages="errors"
                      @keyup.enter="buscarPacienteSegunDocumento()"
                      @click:append="buscarPacienteSegunDocumento()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Ap. paterno"
                      color="secondary"
                      v-model="paterno"
                      :disabled="existePacienteData"
                      outlined
                      dense
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="guardarDatosTicket()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Ap. materno"
                      color="secondary"
                      v-model="materno"
                      outlined
                      :disabled="existePacienteData"
                      dense
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="guardarDatosTicket()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombres"
                      color="secondary"
                      outlined
                      dense
                      :disabled="existePacienteData"
                      v-model="nombres"
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="guardarDatosTicket()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      :items="parametroData2"
                      v-model="sexo"
                      item-value="idParametro"
                      item-text="descripcion"
                      color="secondary"
                      outlined
                      dense
                      :disabled="existePacienteData"
                      label="Género"
                      :error-messages="errors"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Domicilio"
                      color="secondary"
                      outlined
                      dense
                      :disabled="existePacienteData"
                      v-model="direccion"
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="guardarDatosTicket()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-dialog
                    ref="dialogCalendar1"
                    v-model="modalCalendar1"
                    :return-value.sync="fechaNacimiento"
                    persistent
                    width="290px">
                    <template v-slot:activator="{ on }">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="fechaNacimiento"
                          label="Fecha de Nacimiento"
                          outlined
                          color="secondary"
                          dense
                          :disabled="existePacienteData"
                          :error-messages="errors"
                          readonly
                          v-on="on"
                          @keyup.enter="guardarDatosTicket()">
                        </v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker 
                      v-model="fechaNacimiento" 
                      scrollable 
                      locale="es" 
                      color="primary">
                      <v-spacer></v-spacer>
                      <v-btn text color="cancel" @click="modalCalendar1 = false">Cerrar</v-btn>
                      <v-btn text color="primary" @click="$refs.dialogCalendar1.save(fechaNacimiento)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
              <SubTitle 
                text="Datos de registro"
              />
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <v-dialog
                    ref="dialogCalendar2"
                    v-model="modalCalendar2"
                    :return-value.sync="fechaLlegada"
                    persistent
                    width="290px">
                    <template v-slot:activator="{ on }">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="fechaLlegada"
                          label="Fecha de llegada"
                          outlined
                          color="secondary"
                          dense
                          :error-messages="errors"
                          @keyup.enter="guardarDatosTicket()"
                          readonly
                          v-on="on">
                        </v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker 
                      v-model="fechaLlegada" 
                      scrollable 
                      locale="es" 
                      color="primary">
                      <v-spacer></v-spacer>
                      <v-btn text color="cancel" @click="modalCalendar2 = false">Cerrar</v-btn>
                      <v-btn text color="primary" @click="$refs.dialogCalendar2.save(fechaLlegada)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-dialog
                    ref="dialogTime"
                    v-model="modalTime"
                    :return-value.sync="horaLlegada"
                    persistent
                    width="350px">
                    <template v-slot:activator="{ on }">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          v-model="horaLlegada"
                          label="Hora de llegada"
                          outlined
                          dense
                          color="secondary"
                          @keyup.enter="guardarDatosTicket()"
                          :error-messages="errors"
                          readonly
                          v-on="on">
                        </v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-time-picker
                      color="primary"
                      use-seconds
                      scrollable
                      v-if="modalTime"
                      v-model="horaLlegada"
                      full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="cancel" @click="modalTime = false">Cerrar</v-btn>
                      <v-btn text color="primary" @click="$refs.dialogTime.save(horaLlegada)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-text-field
                    label="Responsable"
                    color="secondary"
                    outlined
                    dense
                    disabled
                    v-model="enfermero"> 
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    label="Centro de salud"
                    color="secondary"
                    v-model="centroAistencial"> 
                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3" md="10" offset-md="1" offset-sm="0">
                  <v-row>
                    <v-col cols="6">
                      <BtnCancel 
                        @click.native="cancelar()" 
                      />
                    </v-col>
                    <v-col cols="6">
                      <BtnSubmit
                        :title="buttonTitle"
                        :disabled="deshabilitado"
                        @click.native="guardarDatosTicket()"
                      />
                    </v-col>
                  </v-row>
                </v-col>
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
import { validarNumeroEntero } from "@/common/rulesValidate"
import { PARAMETRO_DNI } from "@/common/parametroDefinition"
import { 
  DNI_LENGTH, 
  CODIGO_EMPADRONAMIENTO_LENGTH 
} from "@/common/sammcDefinition"
import { 
  PARAMETRO_TIPO_TIPO_DOCUMENTO, 
  PARAMETRO_TIPO_SEXO 
} from "@/common/parametroTipoDefinition"
import { getFechaActual, getHoraActual } from "@/common/functionsDatetime"
import * as swal from "@/plugins/sweetAlertMessages"
import * as ls from "@/localStorage/index"
export default {
  data: () => {
    return {
      fechaLlegada: '',
      horaLlegada: getHoraActual(),
      idEnfermero: -1,
      idCentroAsistencial: -1,
      idTipoDocumento: -1,
      documento: '',
      paterno: '',
      materno: '',
      nombres: '',
      sexo: -1,
      fechaNacimiento: '',
      direccion: '',
      idPaciente: -1,
      enfermero: '',
      centroAistencial: '',
      modalCalendar1: false,
      modalCalendar2: false,
      modalTime: false,
    }
  },

  async created() {
    this.setPacienteData([])
    this.enfermero = ls.getNombreUsuario()
    this.centroAistencial = ls.getCentroAsistencial()
    this.idEnfermero = parseInt(ls.getIdUsuario())
    this.idCentroAsistencial = parseInt(ls.getIdCentroAsistencial())
    this.fechaLlegada = getFechaActual()
    this.fechaNacimiento = getFechaActual()
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DOCUMENTO}`
    await this.getParametroData1(paramsUrlParametro1)
    const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    await this.getParametroData2(paramsUrlParametro2)
  },

  computed: {
    ...mapState('ticket', ['isSuccess','ticketCreated','guardando']),
    ...mapState('parametro', ['parametroData1','parametroData2']),
    ...mapState('paciente', ['pacienteData']),
    ...mapState('rulesValidate', ['required','requiredId','length','onlyNumbers']),

    existePacienteData() {
      return this.pacienteData.length != 0
    },

    lengthDocumento() {
      return this.idTipoDocumento == PARAMETRO_DNI ? DNI_LENGTH : CODIGO_EMPADRONAMIENTO_LENGTH
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('ticket', ['save']),
    ...mapActions('paciente', ['getPacienteData','setPacienteData']),
    ...mapActions('parametro', ['getParametroData1','getParametroData2']),

    validarDocumento(event) {
      validarNumeroEntero(event, this.documento, this.lengthDocumento)
    },

    validarLengthDocumento() {
      if (this.idTipoDocumento == PARAMETRO_DNI && this.documento.length > DNI_LENGTH ) {
        this.documento = ''
      }
    },

    cancelar() {
      this.$router.push({ name: 'ListPaciente' })
    },

    cargarInputsFormTicket() {
      this.idTipoDocumento = this.pacienteData[0].tipoDocumento.idParametro
      this.paterno = this.pacienteData[0].paterno
      this.materno = this.pacienteData[0].materno
      this.nombres = this.pacienteData[0].nombres
      this.sexo = this.pacienteData[0].sexo.idParametro
      this.direccion = this.pacienteData[0].direccion
      this.idPaciente = this.pacienteData[0].idPaciente
    },

    async buscarPacienteSegunDocumento() {
      if (this.idTipoDocumento == -1 || this.documento == '') {
        swal.infoMessage('Es necesario seleccionar tipo de documento e ingresar el número de documento.')
      } else {
        const paramsUrlPaciente = `?idTipoDocumento=${this.idTipoDocumento}&documento=${this.documento}`
        await this.getPacienteData(paramsUrlPaciente)
        if (this.pacienteData.length > 0) {
          await this.cargarInputsFormTicket()
        } else {
          this.paterno = ''
          this.materno = ''
          this.nombres = ''
          this.sexo = -1
          this.direccion = ''
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async guardarDatosTicket() {
      const isValid = await this.$refs.datosTicketRef.validate()
      if (isValid) {
        if(this.idPaciente > 0) {
          const params = {
            ticket: {
              data: {
                fechaLlegada: this.fechaLlegada,
                horaLlegada: this.horaLlegada,
                idEnfermero: this.idEnfermero,
                idCentroAsistencial: this.idCentroAsistencial,
                idPaciente: this.idPaciente,
              }
            }
          }
          await this.save(params)
          if (this.isSuccess) {
            this.$router.push({ 
              name: 'EditTriaje', 
              params: { idTicket: this.ticketCreated.idTicket} 
            })
            swal.successMessage('Se registró correctamente.')
          }
        } else {
          const params = {
            ticket: {
              data: {
                fechaLlegada: this.fechaLlegada,
                horaLlegada: this.horaLlegada,
                idEnfermero: this.idEnfermero,
                idCentroAsistencial: this.idCentroAsistencial,
                idTipoDocumento: this.idTipoDocumento,
                documento: this.documento,
                paterno: this.paterno,
                materno: this.materno,
                nombres: this.nombres,
                sexo: this.sexo,
                fechaNacimiento: this.fechaNacimiento,
                direccion: this.direccion,
              }
            }
          }
          await this.save(params)
          if (this.isSuccess) {
            this.$router.push({ 
              name: 'EditTriaje', 
              params: { idTicket: this.ticketCreated.idTicket} 
            })
            swal.successMessage('Se registró correctamente.')
          }
        }
      }
    },
  }
}
</script>