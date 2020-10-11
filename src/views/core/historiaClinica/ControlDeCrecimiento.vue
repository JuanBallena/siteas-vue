<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirFormControlCrecimiento()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Control de Crecimiento"
    />
    <v-data-table
      :items="datos.controlesCrecimiento"
      :headers="headersControlCrecimiento"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.controlesCrecimiento.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormularioControlCrecimiento" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Control de Crecimiento"
          />
          <hr>
          <ValidationObserver ref="datosControlCrecimientoRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="controlCrecimiento.rangoControlCrecimiento"
                    :items="rangoControlCrecimientoData"
                    item-text="descripcion"
                    return-object
                    label="Rango de edad"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    @change="onChangeRangoControlCrecimiento()"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="controlCrecimiento.tipoControlCrecimiento"
                    :items="tipoControlCrecimientoData"
                    item-text="descripcion"
                    return-object
                    label="Tipo de control"
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
                <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
                  <v-text-field
                    v-model="controlCrecimiento.peso"
                    label="Peso (en Kg.)"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    @keypress="validarPeso"
                    outlined
                    placeholder=" ">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
                  <v-text-field
                    v-model="controlCrecimiento.estatura"
                    label="Estatura (en cm.)"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    @keypress="validarEstatura"
                    placeholder=" ">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-dialog
                  ref="modalCalendarioFechaControlRef"
                  v-model="modalCalendarioFechaControl"
                  :return-value.sync="controlCrecimiento.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="controlCrecimiento.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="controlCrecimiento.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaControl = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaControlRef.save(controlCrecimiento.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormularioControlCrecimiento = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosControlCrecimiento()"
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
import { validarNumeroEntero, validarNumeroDecimal } from "@/common/rulesValidate"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormularioControlCrecimiento: false,
      modalCalendarioFechaControl: false,
      controlCrecimiento: {
        rangoControlCrecimiento: null,
        tipoControlCrecimiento: null,
        peso: '',
        estatura: '',
        fecha: getFechaActual()
      },
      headersControlCrecimiento: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Rango de edad', value: 'tipoControlCrecimiento.rangoControlCrecimiento.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de control', value: 'tipoControlCrecimiento.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Peso', value: 'peso', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Estatura', value: 'estatura', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  created() {
    const data = []
    this.setTipoControlCrecimientoData(data)
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('controlCrecimiento', ['rangoControlCrecimientoData','tipoControlCrecimientoData']),
    ...mapState('rulesValidate', ['required','onlyNumbers']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('controlCrecimiento', ['getRangoControlCrecimientoData','getTipoControlCrecimientoData','setTipoControlCrecimientoData']),
    ...mapActions('historiaClinica', ['saveControlCrecimiento']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    validarPeso(event) {
      return validarNumeroDecimal(event, this.controlCrecimiento.peso)
    },

    validarEstatura(event) {
      return validarNumeroEntero(event, this.controlCrecimiento.estatura, 3)
    },

    async abrirFormControlCrecimiento() {
      this.resetInputsFormControlCrecimiento()
      await this.getRangoControlCrecimientoData(``)
      this.modalFormularioControlCrecimiento = true
    },

    async onChangeRangoControlCrecimiento() {
      this.controlCrecimiento.idTipoControlCrecimiento = -1
      await this.getTipoControlCrecimientoData(this.controlCrecimiento.rangoControlCrecimiento.idRangoControlCrecimiento)
    },

    resetInputsFormControlCrecimiento() {
      this.controlCrecimiento.rangoControlCrecimiento = null
      this.controlCrecimiento.tipoControlCrecimiento = null
      this.controlCrecimiento.peso = ''
      this.controlCrecimiento.estatura = ''
    },

    async guardarDatosControlCrecimiento() {
      const esValido = await this.$refs.datosControlCrecimientoRef.validate()
      if (esValido) {
        const params = {
          controlCrecimiento: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoControlCrecimiento: this.controlCrecimiento.tipoControlCrecimiento.idTipoControlCrecimiento,
              peso: parseFloat(this.controlCrecimiento.peso),
              estatura: parseInt(this.controlCrecimiento.estatura),
              fecha: this.controlCrecimiento.fecha,
            }
          }
        }
        await this.saveControlCrecimiento(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormularioControlCrecimiento = false
          this.datos.controlesCrecimiento.push({
            tipoControlCrecimiento: {
              rangoControlCrecimiento: {
                descripcion: this.controlCrecimiento.rangoControlCrecimiento.descripcion
              }, 
              descripcion: this.controlCrecimiento.tipoControlCrecimiento.descripcion
            },
            peso: this.controlCrecimiento.peso,
            estatura: this.controlCrecimiento.estatura,
            fecha: this.controlCrecimiento.fecha,
          })
        }
      }
      
    }
  }
}
</script>