<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormTamizaje()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Tamizaje"
    />
    <v-data-table
      :items="datos.tamizajes"
      :headers="headersTamizaje"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.tamizajes.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormTamizaje" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Tamizaje"
          />
          <hr>
          <ValidationObserver ref="datosTamizajeRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="tamizaje.rangoEdadTamizaje"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Rango de edad"
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
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="tamizaje.tipoTamizaje"
                    :items="parametroData2"
                    item-text="descripcion"
                    return-object
                    label="Tipo de tamizaje"
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
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="tamizaje.tipoExamenTamizaje"
                    :items="parametroData3"
                    item-text="descripcion"
                    return-object
                    label="Tipo de examen"
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
                  ref="modalCalendarioFechaTamizajeRef"
                  v-model="modalCalendarioFechaTamizaje"
                  :return-value.sync="tamizaje.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="tamizaje.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="tamizaje.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaTamizaje = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaTamizajeRef.save(tamizaje.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel
                      @click.native="modalFormTamizaje = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosTamizaje()"
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
import { 
  PARAMETRO_TIPO_RANGO_EDAD_TAMIZAJE,
  PARAMETRO_TIPO_TIPO_TAMIZAJE,
  PARAMETRO_TIPO_TIPO_EXAMEN_TAMIZAJE
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormTamizaje: false,
      modalCalendarioFechaTamizaje: false,
      tamizaje: {
        idRangoEdadTamizaje: null,
        idTipoTamizaje: null,
        idTipoExamenTamizaje: null,
        fecha: getFechaActual(),
      },
      headersTamizaje: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Rango de edad', value: 'rangoEdadTamizaje.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de tamizaje', value: 'tipoTamizaje.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de examen', value: 'tipoExamenTamizaje.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
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
    ...mapActions('historiaClinica', ['saveTamizaje']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormTamizaje() {
      this.tamizaje.idRangoEdadTamizaje = null
      this.tamizaje.idTipoTamizaje = null
      this.tamizaje.idTipoExamenTamizaje = null
      this.tamizaje.fecha = getFechaActual()
    },

    async abrirModalFormTamizaje() {
      this.resetInputsFormTamizaje()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_RANGO_EDAD_TAMIZAJE}`
      await this.getParametroData1(paramsUrlParametro1)
      const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_TAMIZAJE}`
      await this.getParametroData2(paramsUrlParametro2)
      const paramsUrlParametro3 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_EXAMEN_TAMIZAJE}`
      await this.getParametroData3(paramsUrlParametro3)
      this.modalFormTamizaje = true
    },

    async guardarDatosTamizaje() {
      const esValido = await this.$refs.datosTamizajeRef.validate()
      if (esValido) {
        const params = {
          tamizaje: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idRangoEdadTamizaje: this.tamizaje.rangoEdadTamizaje.idParametro,
              idTipoTamizaje: this.tamizaje.tipoTamizaje.idParametro,
              idTipoExamenTamizaje: this.tamizaje.tipoExamenTamizaje.idParametro,
              fecha: this.tamizaje.fecha,
            }
          }
        }
        await this.saveTamizaje(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormTamizaje = false
          this.datos.tamizajes.push({
            rangoEdadTamizaje: {
              descripcion: this.tamizaje.rangoEdadTamizaje.descripcion
            },
            tipoTamizaje: {
              descripcion: this.tamizaje.tipoTamizaje.descripcion
            },
            tipoExamenTamizaje: {
              descripcion: this.tamizaje.tipoExamenTamizaje.descripcion
            },
            fecha: this.tamizaje.fecha
          })
        }
      }
    }
  }
}
</script>