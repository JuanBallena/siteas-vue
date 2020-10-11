<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirFormControlPreventivoConsulta()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Control Preventivo por cada consulta"
    />
    <v-data-table
      :items="datos.controlesPreventivoConsulta"
      :headers="headersControlPreventivoConsultas"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.controlesPreventivoConsulta.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormControlPreventivoConsulta" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Control Preventivo por cada consulta"
          />
          <hr>
          <ValidationObserver ref="datosControlPreventivoConsultaRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="controlPreventivoConsulta.tipoControlConsulta"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Tipo de Control"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-dialog
                  ref="modalCalendarioFechaControlPreventivoConsultaRef"
                  v-model="modalCalendarioFechaControlPreventivoConsulta"
                  :return-value.sync="controlPreventivoConsulta.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="controlPreventivoConsulta.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="controlPreventivoConsulta.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaControlPreventivoConsulta = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaControlPreventivoConsultaRef.save(controlPreventivoConsulta.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="controlPreventivoConsulta.detalles"
                    label="Detalles"
                    outlined
                    :error-messages="errors"
                    height="100px"
                    color="secondary"
                    dense
                    placeholder=" ">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormControlPreventivoConsulta = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosControlPreventivoConsulta()"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <br>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirFormControlPeriodico()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Control Preventivo realizado periodicamente"
    />
    <v-data-table
      :items="datos.controlesPeriodico"
      :headers="headersControlPreventivoPeriodos"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.controlesPeriodico.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormControlPeriodico" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Control Preventivo realizado periodicamente"
          />
          <hr>
          <ValidationObserver ref="datosControlPeriodicoRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="controlPeriodico.controlPeriodico"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Control"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    @change="onChangeControlPeriodico()"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="controlPeriodico.tipoControlPeriodico"
                    :items="tipoControlPeriodicoData"
                    item-text="descripcion"
                    return-object
                    label="Tipo de Control"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-dialog
                  ref="modalCalendarioFechaControlPeriodicoRef"
                  v-model="modalCalendarioFechaControlPeriodico"
                  :return-value.sync="controlPeriodico.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="controlPeriodico.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="controlPeriodico.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaControlPeriodico = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaControlPeriodicoRef.save(controlPeriodico.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="controlPeriodico.detalles"
                    label="Detalles"
                    outlined
                    :error-messages="errors"
                    height="100px"
                    color="secondary"
                    dense
                    placeholder=" ">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormControlPeriodico = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosControlPeriodico()"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { getFechaActual } from "@/common/functionsDatetime"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { 
  PARAMETRO_TIPO_TIPO_CONTROL_CADA_CONSULTA,
  PARAMETRO_TIPO_CONTROL_PERIODICO
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormControlPreventivoConsulta: false,
      modalFormControlPeriodico: false,
      modalCalendarioFechaControlPreventivoConsulta: false,
      modalCalendarioFechaControlPeriodico: false,
      controlPreventivoConsulta: {
        tipoControlConsulta: null,
        fecha: getFechaActual(),
        detalles: '',
      },
      controlPeriodico: {
        controlPeriodico: null,
        tipoControlPeriodico: null,
        fecha: getFechaActual(),
        detalles: '',
      },
      headersControlPreventivoConsultas: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de control', value: 'tipoControlConsulta.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
      headersControlPreventivoPeriodos: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Control', value: 'tipoControlPeriodico.controlPeriodico.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de control', value: 'tipoControlPeriodico.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  created() {
    const data = []
    this.setTipoControlPeriodicoData(data)
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('controlPeriodico', ['tipoControlPeriodicoData']),
    ...mapState('rulesValidate', ['required']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('controlPeriodico', ['getTipoControlPeriodicoData','setTipoControlPeriodicoData']),
    ...mapActions('historiaClinica', ['saveControlPreventivoConsulta','saveControlPeriodico']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormControlPreventivoConsulta() {
      this.controlPreventivoConsulta.tipoControlConsulta = null
      this.controlPreventivoConsulta.fecha = getFechaActual()
      this.controlPreventivoConsulta.detalles = ''
    },

    async abrirFormControlPreventivoConsulta() {
      this.resetInputsFormControlPreventivoConsulta()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_CONTROL_CADA_CONSULTA}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormControlPreventivoConsulta = true
    },

    async guardarDatosControlPreventivoConsulta() {
      const esValido = await this.$refs.datosControlPreventivoConsultaRef.validate()
      if (esValido) {
        const params = {
          controlPreventivoConsulta: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoControlConsulta: this.controlPreventivoConsulta.tipoControlConsulta.idParametro,
              fecha: this.controlPreventivoConsulta.fecha,
              detalles: this.controlPreventivoConsulta.detalles
            }
          }
        }
        await this.saveControlPreventivoConsulta(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormControlPreventivoConsulta = false
          this.datos.controlesPreventivoConsulta.push({
            tipoControlConsulta: {
              descripcion: this.controlPreventivoConsulta.tipoControlConsulta.descripcion
            },
            fecha: this.controlPreventivoConsulta.fecha,
            detalles: this.controlPreventivoConsulta.detalles,
          })
        }
      }
    },

    resetInputsFormControlPeriodico() {
      this.controlPeriodico.controlPeriodico = null
      this.controlPeriodico.tipoControlPeriodico = null
      this.controlPeriodico.fecha = getFechaActual()
      this.controlPeriodico.detalles = ''
    },

    async abrirFormControlPeriodico() {
      this.resetInputsFormControlPeriodico()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_CONTROL_PERIODICO}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormControlPeriodico = true
    },

    async onChangeControlPeriodico() {
      this.controlPeriodico.tipoControlPeriodico = null
      await this.getTipoControlPeriodicoData(this.controlPeriodico.controlPeriodico.idParametro)
    },

    async guardarDatosControlPeriodico() {
      const esValido = await this.$refs.datosControlPeriodicoRef.validate()
      if (esValido) {
        const params = {
          controlPeriodico: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoControlPeriodico: this.controlPeriodico.tipoControlPeriodico.idTipoControlPeriodico,
              fecha: this.controlPeriodico.fecha,
              detalles: this.controlPeriodico.detalles
            }
          }
        }
        await this.saveControlPeriodico(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormControlPeriodico = false
          this.datos.controlesPeriodico.push({
            tipoControlPeriodico: {
              controlPeriodico: {
                descripcion: this.controlPeriodico.controlPeriodico.descripcion
              },
              descripcion: this.controlPeriodico.tipoControlPeriodico.descripcion
            },
            fecha: this.controlPeriodico.fecha,
            detalles: this.controlPeriodico.detalles,
          })
        }
      }
    },
  }
}
</script>