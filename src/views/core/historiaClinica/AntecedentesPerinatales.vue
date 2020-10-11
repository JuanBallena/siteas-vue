<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" @click.native="abrirModalFormEmbarazo()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Embarazo"
    />
    <v-data-table
      :items="datos.embarazos"
      :headers="headersEmbarazo"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.embarazos.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormEmbarazo"
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Embarazo"
          />
          <hr>
          <ValidationObserver ref="datosEmbarazoRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="embarazo.tipoEmbarazo"
                    label="Tipo de embarazo"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    dense
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    no-data-text="Sin opciones"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="embarazo.patologia"
                    label="Patología"
                    :items="parametroData2"
                    item-text="descripcion"
                    return-object
                    dense
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    no-data-text="Sin opciones"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="embarazo.controlPrenatal"
                    label="Control prenatal"
                    :items="parametroData3"
                    item-text="descripcion"
                    return-object
                    dense
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    no-data-text="Sin opciones"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="embarazo.numeroEmbarazo"
                    label="N° de embarazos"
                    dense
                    @keypress="validarNumeroEmbarazo"
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    placeholder=" ">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="embarazo.detalle"
                    label="Detalles de embarazo"
                    outlined
                    height="100px"
                    color="secondary"
                    dense
                    :error-messages="errors"
                    placeholder=" ">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormEmbarazo = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosEmbarazo()"
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
        @click.native="abrirModalFormParto()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Partos"
    />
    <v-data-table
      :items="datos.partos"
      :headers="headersPartos"
      class="elevation-1 mt-3"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.partos.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormParto" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Parto"
          />
          <hr>
          <ValidationObserver ref="datosPartoRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="parto.tipoParto"
                    label="Tipo de parto"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="parto.detalleParto"
                    label="Detalles del parto"
                    outlined
                    height="100px"
                    color="secondary"
                    dense
                    :error-messages="errors"
                    placeholder=" ">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                  v-model="parto.detalleNacimiento"
                    label="Detalles del nacimiento"
                    outlined
                    height="100px"
                    color="secondary"
                    dense
                    :error-messages="errors"
                    placeholder=" ">
                  </v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormParto = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosDeParto()"
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
import { validarNumeroEntero } from "@/common/rulesValidate"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { 
  PARAMETRO_TIPO_TIPO_EMBARAZO,
  PARAMETRO_TIPO_PATOLOGIA,
  PARAMETRO_TIPO_CONTROL_PRENATAL,
  PARAMETRO_TIPO_TIPO_PARTO
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },
  
  data: () => {
    return {
      modalFormEmbarazo: false,
      modalFormParto: false,
      embarazo: {
        tipoEmbarazo: null,
        patologia: null,
        controlPrenatal: null,
        numeroEmbarazo: '',
        detalle: '',
      },
      parto: {
        tipoParto: null,
        detalleParto: '',
        detalleNacimiento: '',
      },
      headersEmbarazo: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de embarazo', value: 'tipoEmbarazo.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Patología', value: 'patologia.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Control prenatal', value: 'controlPrenatal.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'N° de embarazos', value: 'numeroEmbarazo', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles del emabarazo', value: 'detalle', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],

      headersPartos: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de parto', value: 'tipoParto.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles del parto', value: 'detalleParto', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles del nacimiento', value: 'detalleNacimiento', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1','parametroData2','parametroData3']),
    ...mapState('rulesValidate', ['required']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('parametro', ['getParametroData1','getParametroData2','getParametroData3']),
    ...mapActions('historiaClinica', ['saveEmbarazo','saveParto']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    validarNumeroEmbarazo(event) {
      validarNumeroEntero(event, String(this.embarazo.numeroEmbarazo), 2)
    },

    resetInputsFormEmbarazo() {
      this.embarazo.tipoEmbarazo = null
      this.embarazo.patologia = null
      this.embarazo.controlPrenatal = null
      this.embarazo.numeroEmbarazo = ''
      this.embarazo.detalle = ''
    },

    async abrirModalFormEmbarazo() {
      this.resetInputsFormEmbarazo()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_EMBARAZO}`
      await this.getParametroData1(paramsUrlParametro1)
      const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_PATOLOGIA}`
      await this.getParametroData2(paramsUrlParametro2)
      const paramsUrlParametro3 = `?idParametroTipo=${PARAMETRO_TIPO_CONTROL_PRENATAL}`
      await this.getParametroData3(paramsUrlParametro3)
      this.modalFormEmbarazo =  true
    },

    async guardarDatosEmbarazo() {
      const esValido = await this.$refs.datosEmbarazoRef.validate()
      if (esValido) {
        const params = {
          embarazo: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoEmbarazo: this.embarazo.tipoEmbarazo.idParametro,
              idPatologia: this.embarazo.patologia.idParametro,
              idControlPrenatal: this.embarazo.controlPrenatal.idParametro,
              numeroEmbarazo: parseInt(this.embarazo.numeroEmbarazo),
              detalle: this.embarazo.detalle,
            }
          }
        }
        await this.saveEmbarazo(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormEmbarazo =  false
          this.datos.embarazos.push({
            tipoEmbarazo: {
              descripcion: this.embarazo.tipoEmbarazo.descripcion
            },
            patologia: {
              descripcion: this.embarazo.patologia.descripcion,
            },
            controlPrenatal: {
              descripcion: this.embarazo.controlPrenatal.descripcion,
            },
            numeroEmbarazo: this.embarazo.numeroEmbarazo,
            detalle: this.embarazo.detalle,
          })
        }
      }
    },

    resetInputsFormParto() {
      this.parto.tipoParto = null
      this.parto.detalleParto = ''
      this.parto.detalleNacimiento = ''
    },

    async abrirModalFormParto() {
      await this.resetInputsFormParto()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_PARTO}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormParto =  true
    },

    async guardarDatosDeParto() {
      const esValido = await this.$refs.datosPartoRef.validate()
      if (esValido) {
        const params = {
          parto: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoParto: this.parto.tipoParto.idParametro,
              detalleNacimiento: this.parto.detalleParto,
              detalleParto: this.parto.detalleNacimiento,
            }
          }
        }
        await this.saveParto(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormParto =  false
          this.datos.partos.push({
            tipoParto: {
              descripcion: this.parto.tipoParto.descripcion
            },
            detalleNacimiento: this.parto.detalleNacimiento,
            detalleParto: this.parto.detalleParto,
          })
        }
      }
    }
  }
}
</script>