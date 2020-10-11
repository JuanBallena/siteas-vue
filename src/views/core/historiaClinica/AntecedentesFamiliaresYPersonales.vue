<template>
  <div>
    <template v-if="puedeEditarHistoria()">
      <BtnCreate 
        title="Nuevo Registro" 
        @click.native="abrirModalFormAntecedenteFamiliar()" 
      />
      <hr>
    </template>
    <Title 
      text="Registro de Antecedentes Familiares"
    />
    <v-data-table
      :items="datos.antecedentesFamiliares"
      :headers="headersAntecedentesFamiliares"
      class="elevation-1 mt-2 mb-6"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.antecedentesFamiliares.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormAntecedenteFamiliar"
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            text="Agregar datos de Antecedentes Familiares"
          />
          <hr>
          <ValidationObserver ref="datosAntecedenteFamiliarRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    v-model="antecedenteFamiliar.tipoAntecedenteFamiliar"
                    label="Tipo de antecedente"
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
                    v-model="antecedenteFamiliar.familiar"
                    :items="parametroData2"
                    item-text="descripcion"
                    return-object
                    label="Familiar"
                    dense
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    no-data-text="Sin opciones"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="antecedenteFamiliar.detalle"
                    label="Detalles de antecedente"
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
                      @click.native="modalFormAntecedenteFamiliar = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosAntecedenteFamiliar()"
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
        @click.native="abrirModalFormAntecedentePersonal()"
      />
      <hr>
    </template>
    <Title 
      :text="`Registro de Antecedentes ${title}`"
    />
    <v-data-table
      :items="datos.antecedentesPersonales"
      :headers="headersAntecedentesPersonales"
      class="elevation-1 mt-3"
      no-data-text="Sin registros"
      no-results-text="Sin coincidencias"
      hide-default-footer>
      <template v-slot:item.number="{ item }">
        {{ datos.antecedentesPersonales.indexOf(item) + 1 }}
      </template>
    </v-data-table>
    <v-dialog v-if="puedeEditarHistoria()"
      v-model="modalFormAntecedentePersonal" 
      max-width="550px">
      <v-card>
        <v-card-text>
          <br>
          <TitleCenter 
            :text="`Agregar datos de Antecedentes ${title}`" 
          />
          <hr>
          <ValidationObserver ref="datosAntecedentePersonalRef">
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="6">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="antecedentePersonal.tipoAntecedentePersonal"
                    :items="parametroData1"
                    item-text="descripcion"
                    return-object
                    label="Tipo de antecedente"
                    dense
                    :error-messages="errors"
                    color="secondary"
                    outlined
                    no-data-text="Sin opciones"
                    placeholder="Seleccione">
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                  <v-textarea
                    v-model="antecedentePersonal.detalle"
                    label="Detalles del antecedente"
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
                      @click.native="modalFormAntecedentePersonal = false"
                    />
                  </v-col>
                  <v-col cols="6">
                    <BtnSubmit
                      :title="buttonGuardarTitle"
                      :disabled="deshabilitado"
                      @click.native="guardarDatosAntecedentePersonal()"
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
import { CRITERIO_NINO } from "@/common/historiaClinicaDefinition"
import { 
  PARAMETRO_TIPO_TIPO_ANTECEDENTE_FAMILIAR,
  PARAMETRO_TIPO_FAMILIAR,
  PARAMETRO_TIPO_TIPO_ANTECEDENTE_PERSONAL 
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalFormAntecedenteFamiliar: false,
      antecedenteFamiliar: {
        tipoAntecedenteFamiliar: null,
        familiar: null,
        detalle: '',
      },
      modalFormAntecedentePersonal: false,
      antecedentePersonal: {
        tipoAntecedentePersonal: null,
        detalle: '',
      },
      headersAntecedentesFamiliares: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de antecedente', value: 'tipoAntecedenteFamiliar.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Familiar', value: 'familiar.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles del antecedente', value: 'detalle', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],

      headersAntecedentesPersonales: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Tipo de antecedente', value: 'tipoAntecedentePersonal.descripcion', align: 'left', sortable: false, class: 'primary--text', selected: true },
        { text: 'Detalles del antecedente', value: 'detalle', align: 'left', sortable: false, class: 'primary--text', selected: true },
      ],
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('parametro', ['parametroData1','parametroData2']),
    ...mapState('rulesValidate', ['required']),

    title() {
      return this.datos.criterio == CRITERIO_NINO ? 'Patológicos' : 'Personales'
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
    ...mapActions('historiaClinica', ['saveAntecedenteFamiliar','saveAntecedentePersonal']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    resetInputsFormAntecedenteFamiliar() {
      this.antecedenteFamiliar.tipoAntecedenteFamiliar = null
      this.antecedenteFamiliar.familiar = null,
      this.antecedenteFamiliar.detalle = ''
    },

    async abrirModalFormAntecedenteFamiliar() {
      this.resetInputsFormAntecedenteFamiliar()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_ANTECEDENTE_FAMILIAR}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_FAMILIAR}&criterio=${this.datos.criterio}`
      await this.getParametroData2(paramsUrlParametro2)
      this.modalFormAntecedenteFamiliar =  true
    },

    async guardarDatosAntecedenteFamiliar() {
      const esValido = await this.$refs.datosAntecedenteFamiliarRef.validate()
      if (esValido) {
        const params = {
          antecedenteFamiliar: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoAntecedenteFamiliar: this.antecedenteFamiliar.tipoAntecedenteFamiliar.idParametro,
              idFamiliar: this.antecedenteFamiliar.familiar.idParametro,
              detalle: this.antecedenteFamiliar.detalle,
              criterio: this.datos.criterio,
            }
          }
        }
        await this.saveAntecedenteFamiliar(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormAntecedenteFamiliar =  false
          this.datos.antecedentesFamiliares.push({
            tipoAntecedenteFamiliar: {
              descripcion: this.antecedenteFamiliar.tipoAntecedenteFamiliar.descripcion
            },
            familiar: {
              descripcion: this.antecedenteFamiliar.familiar.descripcion,
            },
            detalle: this.antecedenteFamiliar.detalle,
          })
        }
      }
    },

    resetInputsFormAntecedentePersonal() {
      this.antecedentePersonal.tipoAntecedentePersonal = null
      this.antecedentePersonal.detalle = ''
    },

    async abrirModalFormAntecedentePersonal() {
      this.resetInputsFormAntecedentePersonal()
      const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_ANTECEDENTE_PERSONAL}&criterio=${this.datos.criterio}`
      await this.getParametroData1(paramsUrlParametro1)
      this.modalFormAntecedentePersonal =  true
    },

    async guardarDatosAntecedentePersonal() {
      const esValido = await this.$refs.datosAntecedentePersonalRef.validate()
      if (esValido) {
        const params = {
          antecedentePersonal: {
            data: {
              idHistoriaClinica: this.datos.idHistoriaClinica,
              idTipoAntecedentePersonal: this.antecedentePersonal.tipoAntecedentePersonal.idParametro,
              detalle: this.antecedentePersonal.detalle,
              criterio: this.datos.criterio,
            }
          }
        }
        await this.saveAntecedentePersonal(params)
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.modalFormAntecedentePersonal =  false
          this.datos.antecedentesPersonales.push({
            tipoAntecedentePersonal: {
              descripcion: this.antecedentePersonal.tipoAntecedentePersonal.descripcion
            },
            detalle: this.antecedentePersonal.detalle,
          })
        }
      }
    }
  }
}
</script>