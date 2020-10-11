<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormPlanAtencion()"
      />
      <hr>
    </template>
    <Title 
      text="Registro de Plan de Atención Integral"
    />
    <v-data-table
      :items="datos.planesAtencion"
      :headers="headersPlanAtencion"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.planesAtencion.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormularioPlanAtencion" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter text="Agregar datos de Plan de Atención Integral" />
          <hr>
          <ValidationObserver ref="datosPlanAtencionRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="planAtencion.grupoEdadPlanAtencion"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Grupo de edad"
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
                    v-model="planAtencion.tipoPrestacion"
                    :items="parametroData2"
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
                  ref="modalCalendarioFechaPlanAtencionRef"
                  v-model="modalCalendarioFechaPlanAtencion"
                  :return-value.sync="planAtencion.fecha"
                  persistent
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="planAtencion.fecha"
                      label="Fecha"
                      color="secondary"
                      dense
                      outlined
                      placeholder=" "
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="planAtencion.fecha" 
                    scrollable 
                    locale="es"
                    color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="cancel" @click="modalCalendarioFechaPlanAtencion = false">Cerrar</v-btn>
                    <v-btn text color="primary" @click="$refs.modalCalendarioFechaPlanAtencionRef.save(planAtencion.fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="planAtencion.descripcion"
                    label="Descripción"
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
                      @click.native="modalFormularioPlanAtencion = false" 
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosPlanAtencion()" 
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
  PARAMETRO_TIPO_GRUPO_EDAD_PLAN_ATENCION,
  PARAMETRO_TIPO_TIPO_PRESTACION 
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormularioPlanAtencion: false,
      modalCalendarioFechaPlanAtencion: false,
      planAtencion: {
        idGrupoEdadPlanAtencion: null,
        idTipoPrestacion: null,
        descripcion: '',
        fecha: getFechaActual(),
      },
      headersPlanAtencion: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Grupo de edad', value: 'grupoEdadPlanAtencion.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Fecha', value: 'fecha', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de prestación', value: 'tipoPrestacion.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Descripción', value: 'descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1','parametroData2']),
    ...mapState('rulesValidate', ['required']),

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('parametro', ['getParametroData1','getParametroData2']),
    ...mapActions('historiaClinica', ['savePlanAtencion']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    async abrirModalFormPlanAtencion() {
      this.resetInputsFormPlanAtencion()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_GRUPO_EDAD_PLAN_ATENCION}`
      await this.getParametroData1(paramsUrlParametro1)
      const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_PRESTACION}`
      await this.getParametroData2(paramsUrlParametro2)
      this.modalFormularioPlanAtencion = true
    },

    resetInputsFormPlanAtencion() {
      this.planAtencion.idGrupoEdadPlanAtencion = null
      this.planAtencion.idTipoPrestacion = null
      this.planAtencion.descripcion = ''
      this.planAtencion.fecha = getFechaActual()
    },

    async guardarDatosPlanAtencion() {
      const esValido = await this.$refs.datosPlanAtencionRef.validate()
      if (esValido) {
        const params = {
          planAtencion: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idGrupoEdadPlanAtencion: this.planAtencion.grupoEdadPlanAtencion.idParametro,
              idTipoPrestacion: this.planAtencion.tipoPrestacion.idParametro,
              descripcion: this.planAtencion.descripcion,
              fecha: this.planAtencion.fecha,
            }
          }
        }
        await this.savePlanAtencion(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormularioPlanAtencion = false
          this.datos.planesAtencion.push({
            grupoEdadPlanAtencion: {
              descripcion: this.planAtencion.grupoEdadPlanAtencion.descripcion
            },
            tipoPrestacion: {
              descripcion: this.planAtencion.tipoPrestacion.descripcion
            },
            fecha: this.planAtencion.fecha,
            descripcion: this.planAtencion.descripcion,
          })
        }
      }
    }
  }
}
</script>