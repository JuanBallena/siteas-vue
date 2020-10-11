<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate
        title="Nuevo Registro" 
        @click.native="abrirModalFormAntecedenteEducativo()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Antecedentes Educativos"
    />
    <v-data-table
      :items="antecedentesEducativos"
      :headers="filterHeadersAntecedenteEducativo"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ antecedentesEducativos.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormAntecedenteEducativo" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Antecedente Educativo" 
          />
          <hr>
          <ValidationObserver ref="datosAntecedenteEducativo">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    :items="parametroData1"
                    item-text="descripcion"
                    item-value="idParametro"
                    return-object
                    label="Nivel educativo"
                    v-model="antecedenteEducativo.nivelEducativo"
                    dense
                    no-data-text="Sin opciones"
                    color="secondary"
                    :error-messages="errors"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <template v-if="tieneCriterioAdolescente">
                <v-col cols="12" lg="6" md="6" sm="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-select
                      label="Rendimiento"
                      :items="parametroData2"
                      item-text="descripcion"
                      item-value="idParametro"
                      return-object
                      v-model="antecedenteEducativo.rendimientoEducativo"
                      dense
                      :error-messages="errors"
                      no-data-text="Sin opciones"
                      color="secondary"
                      outlined
                      placeholder="Seleccione">
                    </v-select>
                  </ValidationProvider>
                </v-col>
              </template>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    label="Detalles de antecedente"
                    v-model="antecedenteEducativo.detalles"
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
                      @click.native="modalFormAntecedenteEducativo = false" 
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosAntecedenteEducativo()" 
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
        @click.native="abrirModalFormAntecedenteLaboral()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Antecedentes Laborales" 
    />
    <v-data-table
      :items="datos.antecedentesLaborales"
      :headers="headersAntecedenteLaboral"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.antecedentesLaborales.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormAntecedenteLaboral" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Antecedente Laboral" 
          />
          <hr>
          <ValidationObserver ref="datosAntecedenteLaboralRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Edad inicio de trabajo"
                    v-model="antecedenteLaboral.edadInicioContrato"
                    dense
                    @keypress="validarEdadInicioTrabajo"
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    placeholder=" ">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    :items="parametroData1"
                    item-text="descripcion"
                    item-value="idParametro"
                    return-object
                    label="Tipo de trabajo"
                    v-model="antecedenteLaboral.tipoTrabajo"
                    dense
                    :error-messages="errors"
                    no-data-text="Sin opciones"
                    color="secondary"
                    outlined
                    placeholder="Selecione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    label="Detalles de antecedente"
                    v-model="antecedenteLaboral.detalles"
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
                      @click.native="modalFormAntecedenteLaboral = false" 
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosAntecedenteLaboral()" 
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
        @click.native="abrirModalFormAntecedenteHabito()" 
      />
      <hr>
    </template>
    <Title
      text="Registro de Antecedentes sobre los Hábitos" 
    />
    <v-data-table
      :items="datos.antecedentesHabito"
      :headers="headersAntecedenteHabito"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.antecedentesHabito.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormAntecedenteHabito" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter text="Agregar datos de Antecedente sobre Hábito" />
          <hr>
          <ValidationObserver ref="datosAntecedenteHabito">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    label="Tipo de hábito"
                    :items="parametroData1"
                    item-text="descripcion"
                    item-value="idParametro"
                    return-object
                    v-model="antecedenteHabito.tipoHabito"
                    dense
                    no-data-text="Sin opciones"
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Frecuencia"
                    v-model="antecedenteHabito.frecuencia"
                    dense
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
                    label="Detalles de antecedente"
                    outlined
                    v-model="antecedenteHabito.detalles"
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
                      @click.native="modalFormAntecedenteHabito = false" 
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosAntecedenteHabito()" 
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
import { validarNumeroEntero } from "@/common/rulesValidate"
import { 
  PARAMETRO_TIPO_NIVEL_EDUCATIVO,
  PARAMETRO_TIPO_RENDIMIENTO_EDUCATIVO,
  PARAMETRO_TIPO_TIPO_TRABAJO,
  PARAMETRO_TIPO_TIPO_HABITO
} from "@/common/parametroTipoDefinition"
import { 
  CRITERIO_JOVEN, 
  CRITERIO_ADOLESCENTE 
} from "@/common/historiaClinicaDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormAntecedenteEducativo: false,
      modalFormAntecedenteLaboral: false,
      modalFormAntecedenteHabito: false,
      antecedenteEducativo: {
        nivelEducativo: null,
        rendimientoEducativo: null,
        detalles: '',
      },
      antecedenteLaboral: {
        edadInicioContrato: '',
        tipoTrabajo: null,
        detalles: '',
      },
      antecedenteHabito: {
        tipoHabito: null,
        frecuencia: '',
        detalles: '',
      },
      headersAntecedentelEducativo: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', visible: true },
        { text: 'Nivel educativo', value: 'nivelEducativo.descripcion', align: 'left', sortable: false, class: 'primary--text', visible: true },
        { text: 'Rendimiento', value: 'rendimientoEducativo.descripcion', align: 'left', sortable: false, class: 'primary--text', visible: false },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', visible: true },
      ],
      headersAntecedenteLaboral: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Edad inicio de trabajo', value: 'edadInicioContrato', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de trabajo', value: 'tipoTrabajo.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
      headersAntecedenteHabito: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', visible: true },
        { text: 'Tipo de hábito', value: 'tipoHabito.descripcion', align: 'left', sortable: false, class: 'primary--text', visible: true },
        { text: 'Frecuencia', value: 'frecuencia', align: 'left', sortable: false, class: 'primary--text', visible: true },
        { text: 'Detalles', value: 'detalles', align: 'left', sortable: false, class: 'primary--text', visible: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','responseData','guardando']),
    ...mapState('parametro', ['parametroData1','parametroData2']),
    ...mapState('rulesValidate', ['required','requiredId']),

    filterHeadersAntecedenteEducativo() {
      return this.tieneCriterioAdolescente ? this.headersAntecedentelEducativo : this.headersAntecedentelEducativo.filter(h => h.visible)
    },

    antecedentesEducativos() {
      return this.tieneCriterioAdolescente ? this.datos.antecedentesEducativoAdolescente : this.datos.antecedentesEducativoJoven
    },

    tieneCriterioAdolescente() {
      return this.datos.criterio == CRITERIO_ADOLESCENTE
    },

    tieneCriterioJoven() {
      return this.datos.criterio == CRITERIO_JOVEN
    },

    deshabilitado() {
      return this.guardando
    },

    buttonGuardarTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('parametro', ['getParametroData1','getParametroData2']),
    ...mapActions('historiaClinica', [
      'saveAntecedenteEducativoAdolescente',
      'saveAntecedenteEducativoJoven',
      'saveAntecedenteLaboral',
      'saveAntecedenteHabito'
    ]),

    validarEdadInicioTrabajo(event) {
      validarNumeroEntero(event, event.target.value, 2)
    },

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    //Antecedente Educativo Adolescente
    resetInputsFormAntecedenteEducativo() {
      this.antecedenteEducativo.idNivelEducativo = null
      this.antecedenteEducativo.idRendimientoEducativo = null
      this.antecedenteEducativo.detalles = ''
    },

    async abrirModalFormAntecedenteEducativo() {
      this.resetInputsFormAntecedenteEducativo()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_NIVEL_EDUCATIVO}`
      await this.getParametroData1(paramsUrlParametro1)
      if (this.tieneCriterioAdolescente) {
        const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_RENDIMIENTO_EDUCATIVO}`
        await this.getParametroData2(paramsUrlParametro2)
      }
      this.modalFormAntecedenteEducativo = true
    },

    async guardarDatosAntecedenteEducativo() {
      const esValido = await this.$refs.datosAntecedenteEducativo.validate()
      if (esValido) {
        if (this.tieneCriterioAdolescente) {
          const params = {
            antecedenteEducativoAdolescente: {
              data: {
                idHistoriaClinica: this.datos.idHistoriaClinica,
                idNivelEducativo: this.antecedenteEducativo.nivelEducativo.idParametro,
                idRendimientoEducativo: this.antecedenteEducativo.rendimientoEducativo.idParametro,
                detalles: this.antecedenteEducativo.detalles,
              }
            }
          }
          await this.saveAntecedenteEducativoAdolescente(params)
        }
        if (this.tieneCriterioJoven) {
          const params = {
            antecedenteEducativoJoven: {
              data: {
                idHistoriaClinica: this.datos.idHistoriaClinica,
                idNivelEducativo: this.antecedenteEducativo.nivelEducativo.idParametro,
                detalles: this.antecedenteEducativo.detalles,
              }
            }
          }
          await this.saveAntecedenteEducativoJoven(params)
        }
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormAntecedenteEducativo = false
          if (this.tieneCriterioAdolescente) {
            this.datos.antecedentesEducativoAdolescente.push({
              nivelEducativo: {
                descripcion: this.antecedenteEducativo.nivelEducativo.descripcion
              },
              rendimientoEducativo: {
                descripcion: this.antecedenteEducativo.rendimientoEducativo.descripcion
              },
              detalles: this.antecedenteEducativo.detalles,
            })
          }
          if (this.tieneCriterioJoven) {
            this.datos.antecedentesEducativoJoven.push({
              nivelEducativo: {
                descripcion: this.antecedenteEducativo.nivelEducativo.descripcion
              },
              detalles: this.antecedenteEducativo.detalles,
            })
          }
        }
      }
    },

    //Antecedente Laboral
    resetInputsFormAntecedenteLaboral() {
      this.antecedenteLaboral.edadInicioContrato = ''
      this.antecedenteLaboral.tipoTrabajo = null
      this.antecedenteLaboral.detalles = ''
    },

    async abrirModalFormAntecedenteLaboral() {
      this.resetInputsFormAntecedenteLaboral()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_TRABAJO}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormAntecedenteLaboral = true
    },

    async guardarDatosAntecedenteLaboral() {
      const esValido = await this.$refs.datosAntecedenteLaboralRef.validate()
      if (esValido) {
        const params = {
          antecedenteLaboral: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              edadInicioContrato: parseInt(this.antecedenteLaboral.edadInicioContrato),
              idTipoTrabajo: this.antecedenteLaboral.tipoTrabajo.idParametro,
              detalles: this.antecedenteLaboral.detalles,
            }
          }
        }
        await this.saveAntecedenteLaboral(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormAntecedenteLaboral = false
          this.datos.antecedentesLaborales.push({
            edadInicioContrato: this.antecedenteLaboral.edadInicioContrato,
            tipoTrabajo: {
              descripcion: this.antecedenteLaboral.tipoTrabajo.descripcion
            },
            detalles: this.antecedenteLaboral.detalles,
          })
        }
      }
    },

    //Antecedente sobre Hábito
    resetInputsFormAntecedenteHabito() {
      this.antecedenteHabito.tipoHabito = null
      this.antecedenteHabito.frecuencia = ''
      this.antecedenteHabito.detalles = ''
    },

    async abrirModalFormAntecedenteHabito() {
      this.resetInputsFormAntecedenteHabito()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_HABITO}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormAntecedenteHabito = true
    },

    async guardarDatosAntecedenteHabito() {
      const esValido = await this.$refs.datosAntecedenteHabito.validate()
      if (esValido) {
        const params = {
          antecedenteHabito: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoHabito: this.antecedenteHabito.tipoHabito.idParametro,
              frecuencia: this.antecedenteHabito.frecuencia,
              detalles: this.antecedenteHabito.detalles,
              criterio: this.datos.criterio
            }
          }
        }
        await this.saveAntecedenteHabito(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          //this.datos.antecedentesHabito.push(this.responseData)
          this.modalFormAntecedenteHabito = false
          this.datos.antecedentesHabito.push({
            tipoHabito: {
              descripcion: this.antecedenteHabito.tipoHabito.descripcion
            },
            frecuencia: this.antecedenteHabito.frecuencia,
            detalles: this.antecedenteHabito.detalles,
          })
        }
      }
    },
  }
}
</script>