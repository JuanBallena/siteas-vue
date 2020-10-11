<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormEvaluacion()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Evaluaciones" 
    />
    <v-data-table
      :items="datos.evaluaciones"
      :headers="headersEvaluaciones"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.evaluaciones.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormEvaluacion" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Evaluación" 
          />
          <hr>
          <ValidationObserver ref="datosEvaluacionRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="evaluacion.evaluacion"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Evaluación"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    @change="onChangeEvaluacion()"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="evaluacion.tipoEvaluacion"
                    :items="tipoEvaluacionData"
                    item-text="descripcion"
                    return-object
                    label="Tipo de evaluación"
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
                  ref="modalCalendarioEvaluaciónRef"
                  v-model="modalCalendarioEvaluacion"
                  :return-value.sync="evaluacion.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="evaluacion.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="evaluacion.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioEvaluacion = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioEvaluaciónRef.save(evaluacion.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="evaluacion.detalles"
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
                      @click.native="modalFormEvaluacion = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosEvaluacion()" 
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
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { getFechaActual } from "@/common/functionsDatetime"
import { PARAMETRO_TIPO_TIPO_EVALUACION } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormEvaluacion: false,
      modalCalendarioEvaluacion: false,
      evaluacion: {
        evaluacion: null,
        tipoEvaluacion: null,
        fecha: getFechaActual(),
        detalles: '',
      },
      headersEvaluaciones: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Evaluación', value: 'tipoEvaluacion.evaluacion.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de evaluación', value: 'tipoEvaluacion.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  created() {
    const data = []
    this.setTipoEvaluacionData(data)
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('evaluacion', ['tipoEvaluacionData']),
    ...mapState('rulesValidate', ['required']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('evaluacion', ['getTipoEvaluacionData','setTipoEvaluacionData']),
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('historiaClinica', ['saveEvaluacion']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormEvaluacion() {
      this.evaluacion.evaluacion = null
      this.evaluacion.tipoEvaluacion = null
      this.evaluacion.fecha = getFechaActual()
      this.evaluacion.detalles = ''
    },

    async abrirModalFormEvaluacion() {
      this.resetInputsFormEvaluacion()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_EVALUACION}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormEvaluacion = true
    },

    async onChangeEvaluacion() {
      this.evaluacion.tipoEvaluacion = null
      await this.getTipoEvaluacionData(this.evaluacion.evaluacion.idParametro)
    },

    async guardarDatosEvaluacion() {
      const esValido = await this.$refs.datosEvaluacionRef.validate()
      if (esValido) {
        const params = {
          evaluacion: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoEvaluacion: this.evaluacion.tipoEvaluacion.idTipoEvaluacion,
              fecha: this.evaluacion.fecha,
              detalles: this.evaluacion.detalles,
            }
          }
        }
        await this.saveEvaluacion(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormEvaluacion = false
          this.datos.evaluaciones.push({
            tipoEvaluacion: {
              evaluacion:{
                descripcion: this.evaluacion.evaluacion.descripcion
              },
              descripcion: this.evaluacion.tipoEvaluacion.descripcion,
            },
            fecha: this.evaluacion.fecha,
            detalles: this.evaluacion.detalles,
          })
        }
      }
    }
  }
}
</script>