<template>
  <div>
    <Title 
      text="Registro de Evaluación de Alimentación"
    />
    <br>
    <ValidationObserver ref="datosEvaluacionAlimentacionRef">
      <v-row>
        <v-col cols="12" lg="3" md="4" sm="5">
          <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
            <v-select
              v-model="evaluacionAlimentacion.idRangoEdadAlimentacion"
              :items="parametroData1"
              item-text="descripcion"
              item-value="idParametro"
              label="Rango de edad"
              dense
              :error-messages="errors"
              no-data-text="Sin opciones"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              @change="onChangeRangoEdadAlimentacion()"
              placeholder=" ">
            </v-select>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="5">
          <v-dialog v-if="puedeEditarHistoria()"
            ref="modalCalendarioFechaEvaluacionAlimentacionRef"
            v-model="modalCalendarioFechaEvaluacionAlimentacion"
            :return-value.sync="evaluacionAlimentacion.fecha"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="evaluacionAlimentacion.fecha"
                label="Fecha"
                color="secondary"
                dense
                outlined
                placeholder=" "
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker 
              v-model="evaluacionAlimentacion.fecha" 
              scrollable 
              locale="es"
              color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="cancel" @click="modalCalendarioFechaEvaluacionAlimentacion = false">Cerrar</v-btn>
              <v-btn text color="primary" @click="$refs.modalCalendarioFechaEvaluacionAlimentacionRef.save(evaluacionAlimentacion.fecha)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field v-else
            v-model="evaluacionAlimentacion.fecha"
            label="Fecha"
            color="secondary"
            dense
            :outlined="aplicarSiPuedeEditar"
            readonly
            placeholder=" ">
          </v-text-field>
        </v-col>
      </v-row>
      <SubTitle 
        text="Preguntas"
      />
      <v-row>
        <v-col cols="12" lg="10">  
          <v-list
            dense>
            <v-list-item
              class="border-bottom"
              v-for="(pregunta, index) in preguntas" :key="index">
              <v-list-item-content>
                {{ pregunta.text }}
              </v-list-item-content>
              <v-list-item-action>
                <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                  <v-radio-group
                    dense
                    :disabled="!aplicarSiPuedeEditar"
                    :error-messages="errors"
                    v-model="pregunta.value"
                    :mandatory="false"
                    row>
                    <v-radio label="Si" :value="1" class="radio"></v-radio>
                    <v-radio label="No" :value="0" class="radio"></v-radio>
                  </v-radio-group>
                </ValidationProvider>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" offset-lg="5" offset-md="4" offset-sm="3" lg="2" md="4" sm="6">
          <BtnSubmit v-if="puedeEditarHistoria()"
            :title="buttonTitle"
            :disabled="deshabilitado"
            @click.native="guardarDatosEvaluacionAlimentacion()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { getFechaActual } from "@/common/functionsDatetime"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { PARAMETRO_TIPO_RANGO_EDAD_ALIMENTACION } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalCalendarioFechaEvaluacionAlimentacion: false,
      evaluacionAlimentacion: {
        idEvaluacionAlimentacion: 0,
        idRangoEdadAlimentacion: -1,
        fecha: getFechaActual(),
        firstIdParametroRangoEdad: -1,
      },
      preguntas: [
        { text: '¿El niño está recibiendo lactancia materna?', value: -1 },
        { text: '¿La técnica de lactancia materna es adecuada?', value: -1 },
        { text: '¿La frecuencia de lactancia materna es adecuada?', value: -1 },
        { text: '¿La niña o niño recibe leche no materna?', value: -1 },
        { text: '¿La niña o niño recibe aguitas?', value: -1 },
        { text: '¿La niña o niño recibe algún otro alimento?', value: -1 },
        { text: '¿La consistencia de la preparación es adecuada según la edad?', value: -1 },
        { text: '¿La cantidad de alimento es adecuada según la edad?', value: -1 },
        { text: '¿La frecuencia de la alimentación es adecuada según la edad?', value: -1 },
        { text: '¿Consume alimentos de origen animal?', value: -1 },
        { text: '¿Consume frutas y verduras?', value: -1 },
        { text: '¿Añade aceite, mantequilla o margarina en la comida del niño?', value: -1 },
        { text: '¿El niño recibe los alimentos en su propio plato?', value: -1 },
        { text: '¿Añade sal de yodada a la comida familiar?', value: -1 },
        { text: '¿Su niña o niño esta tomando suplemento de hierro?', value: -1 },
        { text: '¿Su niña o niño ha recibido suplemento de vitamina "A"?', value: -1 },
        { text: '¿Su niña o niño está recibiendo multimicronutrientes?', value: -1 },
        { text: '¿Es la niña o niño beneficiario de algún programa de Apoyo Social?', value: -1 },
      ],
    }
  },

  async created() {
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_RANGO_EDAD_ALIMENTACION}`
    await this.getParametroData1(paramsUrlParametro1)
    this.firstIdParametroRangoEdad = this.parametroData1[0].idParametro
    this.evaluacionAlimentacion.idRangoEdadAlimentacion = this.firstIdParametroRangoEdad
    setTimeout(() => {
      this.onChangeRangoEdadAlimentacion()
    }, 500);
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','responseData','guardando']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('evaluacionAlimentacion', ['evaluacionAlimentacionData']),
    ...mapState('rulesValidate', ['requiredId']),

    aplicarSiPuedeEditar() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('evaluacionAlimentacion', ['getEvaluacionAlimentacionData']),
    ...mapActions('historiaClinica', ['saveEvaluacionAlimentacion']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    async onChangeRangoEdadAlimentacion() {
      this.evaluacionAlimentacion.idEvaluacionAlimentacion = 0
      this.evaluacionAlimentacion.fecha = getFechaActual()
      this.preguntas.forEach(pregunta => {
        pregunta.value = -1
      })
      const paramsUrlEvaluacionAlimentacion = `?idHistoriaClinica=${this.datos.idHistoriaClinica}&idRangoEdadAlimentacion=${this.evaluacionAlimentacion.idRangoEdadAlimentacion}`
      await this.getEvaluacionAlimentacionData(paramsUrlEvaluacionAlimentacion)

      if(this.evaluacionAlimentacionData) {
        this.evaluacionAlimentacion.idEvaluacionAlimentacion = this.evaluacionAlimentacionData.idEvaluacionAlimentacion
        this.evaluacionAlimentacion.fecha = this.evaluacionAlimentacionData.fecha
        this.preguntas[0].value = this.evaluacionAlimentacionData.pregunta1
        this.preguntas[1].value = this.evaluacionAlimentacionData.pregunta2
        this.preguntas[2].value = this.evaluacionAlimentacionData.pregunta3
        this.preguntas[3].value = this.evaluacionAlimentacionData.pregunta4
        this.preguntas[4].value = this.evaluacionAlimentacionData.pregunta5
        this.preguntas[5].value = this.evaluacionAlimentacionData.pregunta6
        this.preguntas[6].value = this.evaluacionAlimentacionData.pregunta7
        this.preguntas[7].value = this.evaluacionAlimentacionData.pregunta8
        this.preguntas[8].value = this.evaluacionAlimentacionData.pregunta9
        this.preguntas[9].value = this.evaluacionAlimentacionData.pregunta10
        this.preguntas[10].value = this.evaluacionAlimentacionData.pregunta11
        this.preguntas[11].value = this.evaluacionAlimentacionData.pregunta12
        this.preguntas[12].value = this.evaluacionAlimentacionData.pregunta13
        this.preguntas[13].value = this.evaluacionAlimentacionData.pregunta14
        this.preguntas[14].value = this.evaluacionAlimentacionData.pregunta15
        this.preguntas[15].value = this.evaluacionAlimentacionData.pregunta16
        this.preguntas[16].value = this.evaluacionAlimentacionData.pregunta17
        this.preguntas[17].value = this.evaluacionAlimentacionData.pregunta18
      }
    },

    async guardarDatosEvaluacionAlimentacion() {
      const esValido = await this.$refs.datosEvaluacionAlimentacionRef.validate()
      if (esValido) {
        const params = {
          evaluacionAlimentacion: {
            data: {
              idHistoriaClinica : this.datos.idHistoriaClinica,
              idEvaluacionAlimentacion: this.evaluacionAlimentacion.idEvaluacionAlimentacion,
              idRangoEdadAlimentacion: this.evaluacionAlimentacion.idRangoEdadAlimentacion,
              fecha: this.evaluacionAlimentacion.fecha,
              pregunta1 : this.preguntas[0].value,
              pregunta2 : this.preguntas[1].value,
              pregunta3 : this.preguntas[2].value,
              pregunta4 : this.preguntas[3].value,
              pregunta5 : this.preguntas[4].value,
              pregunta6 : this.preguntas[5].value,
              pregunta7 : this.preguntas[6].value,
              pregunta8 : this.preguntas[7].value,
              pregunta9 : this.preguntas[8].value,
              pregunta10 : this.preguntas[9].value,
              pregunta11 : this.preguntas[10].value,
              pregunta12 : this.preguntas[11].value,
              pregunta13 : this.preguntas[12].value,
              pregunta14 : this.preguntas[13].value,
              pregunta15 : this.preguntas[14].value,
              pregunta16 : this.preguntas[15].value,
              pregunta17 : this.preguntas[16].value,
              pregunta18 : this.preguntas[17].value,
            }
          }
        }
        await this.saveEvaluacionAlimentacion(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          const idEvaluacionAlimentacionResponse = this.responseData.idEvaluacionAlimentacion
          if (this.evaluacionAlimentacion.idEvaluacionAlimentacion == 0) {
            this.evaluacionAlimentacion.idEvaluacionAlimentacion = idEvaluacionAlimentacionResponse
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.radio {
  display: table-cell;
  vertical-align: middle;
  margin: 0 10px;
}
</style>