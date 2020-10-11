<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormProblema()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Problemas" 
    />
    <v-data-table
      :items="datos.problemas"
      :headers="headersProblemas"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.problemas.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormProblema" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Problema"
          />
          <hr>
          <ValidationObserver ref="datosProblemaRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="problema.tipoProblema"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Tipo de problema"
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
                  ref="modalCalendarioFechaProblemaRef"
                  v-model="modalCalendarioFechaProblema"
                  :return-value.sync="problema.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="problema.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="problema.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaProblema = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaProblemaRef.save(problema.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="problema.detalles"
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
                      @click.native="modalFormProblema = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosProblema()"
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
import { PARAMETRO_TIPO_TIPO_PROBLEMA } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormProblema: false,
      modalCalendarioFechaProblema: false,
      problema: {
        tipoProblema: '',
        fecha: getFechaActual(),
        detalles: '',
      },
      headersProblemas: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de problema', value: 'tipoProblema.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
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
    ...mapActions('historiaClinica', ['saveProblema']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormProblema() {
      this.problema.tipoProblema = ''
      this.problema.fecha = getFechaActual()
      this.problema.detalles = ''
    },

    async abrirModalFormProblema() {
      this.resetInputsFormProblema()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_PROBLEMA}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormProblema = true
    },

    async guardarDatosProblema() {
      const esValido = await this.$refs.datosProblemaRef.validate()
      if (esValido) {
        const params = {
          problema: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoProblema: this.problema.tipoProblema.idParametro,
              fecha: this.problema.fecha,
              detalles: this.problema.detalles,
            }
          }
        }
        await this.saveProblema(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormProblema = false
          this.datos.problemas.push({
            tipoProblema: {
              descripcion: this.problema.tipoProblema.descripcion
            },
            fecha: this.problema.fecha,
            detalles: this.problema.detalles,
          })
        }
      }
    }
  }
}
</script>