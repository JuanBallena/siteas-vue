<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormVacuna()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Vacunas"
    />
    <v-data-table
      :items="datos.vacunas"
      :headers="headersVacunas"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.vacunas.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormularioVacuna" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter text="Agregar datos de Vacuna" />
          <hr>
          <ValidationObserver ref="datosVacunaRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="vacuna.rangoVacuna"
                    label="Rango de edad"
                    :items="rangoVacunaData"
                    item-text="descripcion"
                    return-object
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    @change="onChangeRangoVacuna()"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="vacuna.tipoVacuna"
                    :items="tipoVacunaData"
                    item-text="descripcion"
                    return-object
                    label="Tipo de vacuna"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    @change="onChangeTipoVacuna()"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="vacuna.dosis"
                    label="Dosis"
                    dense
                    :error-messages="errors"
                    readonly
                    color="secondary"
                    outlined
                    placeholder=" ">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-dialog
                  ref="modalCalendarioFechaVacunaRef"
                  v-model="modalCalendarioFechaVacuna"
                  :return-value.sync="vacuna.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="vacuna.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="vacuna.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaVacuna = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaVacunaRef.save(vacuna.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <BtnCancel 
                      @click.native="modalFormularioVacuna = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosVacuna()"
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
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  created() {
    const data = []
    this.setTipoVacunaData(data)
  },

  data: () => {
    return {
      modalFormularioVacuna: false,
      modalCalendarioFechaVacuna: false,
      vacuna: {
        rangoVacuna: null,
        tipoVacuna: null,
        dosis: '',
        fecha: getFechaActual(),
      },
      headersVacunas: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Rango de edad', value: 'tipoVacuna.rangoVacuna.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de vacuna', value: 'tipoVacuna.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Dosis', value: 'tipoVacuna.dosis', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('vacuna', ['rangoVacunaData','tipoVacunaData']),
    ...mapState('rulesValidate', ['required','requiredId']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('vacuna', ['getRangoVacunaData','getTipoVacunaData','setTipoVacunaData']),
    ...mapActions('historiaClinica', ['saveVacuna']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormVacuna() {
      this.vacuna.rangoVacuna = null
      this.vacuna.tipoVacuna = null
      this.vacuna.dosis = ''
      this.vacuna.fecha = getFechaActual()
    },

    async abrirModalFormVacuna() {
      this.resetInputsFormVacuna()
      await this.getRangoVacunaData(this.datos.criterio)
      this.modalFormularioVacuna = true
    },

    async onChangeRangoVacuna() {
      this.vacuna.dosis = ''
      this.vacuna.tipoVacuna = null
      await this.getTipoVacunaData(this.vacuna.rangoVacuna.idRangoVacuna)
    },

    onChangeTipoVacuna() {
      this.vacuna.dosis = this.vacuna.tipoVacuna.dosis
    },

    async guardarDatosVacuna() {
      const esValido = await this.$refs.datosVacunaRef.validate()
      if (esValido) {
        const params = {
          vacuna: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoVacuna: this.vacuna.tipoVacuna.idTipoVacuna,
              fecha: this.vacuna.fecha,
              criterio: this.datos.criterio,
            }
          }
        }
        await this.saveVacuna(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormularioVacuna = false
          this.datos.vacunas.push({
            tipoVacuna: {
              rangoVacuna: {
                descripcion: this.vacuna.rangoVacuna.descripcion
              },
              descripcion: this.vacuna.tipoVacuna.descripcion,
              dosis: this.vacuna.dosis,
            },
            fecha: this.vacuna.fecha,
          })
        }
      }      
    }
  }
}
</script>