<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormPrestacionSalud()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Prestaciones de Salud"
    />
    <v-data-table
      :items="datos.prestacionesSalud"
      :headers="headersPrestacionDeSalud"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.prestacionesSalud.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormPrestacionSalud" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Prestación de Salud" 
          />
          <hr>
          <ValidationObserver ref="datosPrestacionSaludRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="prestacionSalud.tipoPrestacion"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Tipo de prestación"
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
                  ref="modalCalendarioFechaPrestacionDeSaludRef"
                  v-model="modalCalendarioFechaPrestacionDeSalud"
                  :return-value.sync="prestacionSalud.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="prestacionSalud.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="prestacionSalud.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaPrestacionDeSalud = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaPrestacionDeSaludRef.save(prestacionSalud.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="prestacionSalud.detalles"
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
                      @click.native="modalFormPrestacionSalud = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosPrestacionSalud()"
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
import { PARAMETRO_TIPO_TIPO_PRESTACION_SALUD } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormPrestacionSalud: false,
      modalCalendarioFechaPrestacionDeSalud: false,
      prestacionSalud: {
        tipoPrestacion: null,
        fecha: getFechaActual(),
        detalles: '',
      },
      headersPrestacionDeSalud: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de prestación', value: 'tipoPrestacion.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1']),
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
    ...mapActions('historiaClinica', ['savePrestacionSalud']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormPrestacionSalud() {
      this.prestacionSalud.idTipoPrestacion = null
      this.prestacionSalud.fecha = getFechaActual()
      this.prestacionSalud.detalles = ''
    },

    async abrirModalFormPrestacionSalud() {
      this.resetInputsFormPrestacionSalud()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_PRESTACION_SALUD}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormPrestacionSalud = true
    },

    async guardarDatosPrestacionSalud() {
      const esValido = await this.$refs.datosPrestacionSaludRef.validate()
      if (esValido) {
        const params = {
          prestacionSalud: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoPrestacion: this.prestacionSalud.tipoPrestacion.idParametro,
              fecha: this.prestacionSalud.fecha,
              detalles: this.prestacionSalud.detalles,
              criterio: this.datos.criterio,
            }
          }
        }
        await this.savePrestacionSalud(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormPrestacionSalud = false
          this.datos.prestacionesSalud.push({
            tipoPrestacion: {
              descripcion: this.prestacionSalud.tipoPrestacion.descripcion
            },
            fecha: this.prestacionSalud.fecha,
            detalles: this.prestacionSalud.detalles,
          })
        }
      }
    }
  }
}
</script>