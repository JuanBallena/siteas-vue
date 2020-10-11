<template>
  <div>
    <Title 
      text="Registro de Salud Sexual Reproductiva" 
    />
    <br>
    <ValidationObserver ref="datosSaludSexualReproductivaRef">
      <v-row>
        <v-col cols="12" lg="3" md="3" sm="3">
          <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
            <v-text-field
              v-model="datos.inicioVidaSexual"
              label="Edad inicio de vida sexual"
              color="secondary"
              dense
              :error-messages="errors"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              @keypress="validadEdadInicioVidaSexual"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <template v-if="tieneCriterioAdulto || tieneCriterioJoven">
          <v-col cols="12" lg="3" md="3" sm="3">
            <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="datos.nivelTestosterona"
                label="Nivel de testosterona"
                color="secondary"
                dense
                :error-messages="errors"
                :outlined="aplicarSiPuedeEditar"
                :readonly="!aplicarSiPuedeEditar"
                placeholder=" ">
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" lg="3" md="3" sm="3">
            <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="datos.calidadEsperma"
                label="Calidad de ADN de esperma"
                color="secondary"
                dense
                :error-messages="errors"
                :outlined="aplicarSiPuedeEditar"
                :readonly="!aplicarSiPuedeEditar"
                placeholder=" ">
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </template>
        <template v-if="tieneCriterioAdulto">
          <v-col cols="12" lg="3" md="3" sm="3">
            <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
              <v-text-field
                v-model="datos.hijosCantidad"
                label="Cantidad de hijos"
                color="secondary"
                dense
                :error-messages="errors"
                :outlined="aplicarSiPuedeEditar"
                :readonly="!aplicarSiPuedeEditar"
                @keypress="validadHijosCantidad"
                placeholder=" ">
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </template>
      </v-row>
      <hr>
      <v-row>
        <template v-if="tieneCriterioAdolescente">
          <v-col cols="12" lg="6" md="6"
            v-for="(item, index) in datos.radiosAndCantidad" :key="index">
            <v-list
              dense>
              <v-list-item
                class="border-bottom">
                <v-list-item-content>
                  {{ item.text }}
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-radio-group
                      dense
                      :disabled="!aplicarSiPuedeEditar"
                      :error-messages="errors"
                      v-model="item.value"
                      :mandatory="false"
                      row>
                      <v-radio label="Si" :value="1" class="radio"></v-radio>
                      <v-radio label="No" :value="0" class="radio"></v-radio>
                    </v-radio-group>
                  </ValidationProvider>
                </v-list-item-content>
                <v-list-item-action style="width: 100px;">
                  <ValidationProvider mode="passive" rules="required|onlyNumbers" v-slot="{ errors }">
                    <v-text-field
                      v-model="item.cantidad"
                      label="Cantidad"
                      color="secondary"
                      dense
                      :error-messages="errors"
                      @keypress="validadCantidad"
                      :outlined="aplicarSiPuedeEditar"
                      :readonly="!aplicarSiPuedeEditar"
                      placeholder=" ">
                    </v-text-field>
                  </ValidationProvider>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </template>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6" md="6">
          <v-list
            dense>
            <v-list-item
              class="border-bottom"
              v-for="(item, index) in datos.radios" :key="index">
              <v-list-item-content>
                {{ item.text }}
              </v-list-item-content>
              <v-list-item-action>
                <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                  <v-radio-group
                    dense
                    :error-messages="errors"
                    :disabled="!aplicarSiPuedeEditar"
                    v-model="item.value"
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
        <v-col cols="12" lg="6" md="6" class="mt-4">
            <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
              <v-textarea
                v-model="datos.detalles"
                label="Detalles"
                :outlined="aplicarSiPuedeEditar"
                :readonly="!aplicarSiPuedeEditar"
                :filled="!aplicarSiPuedeEditar"
                :error-messages="errors"
                height="160px"
                color="secondary"
                dense
                placeholder=" ">
              </v-textarea>
            </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" offset-lg="5" offset-md="4" md="4" offset-sm="0">
          <BtnSubmit v-if="puedeEditarHistoria()"
            :title="buttonTitle"
            :disabled="deshabilitado"
            @click.native="updateDatosSaludSexualReproductiva()" 
          />
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { validarNumeroEntero } from "@/common/rulesValidate"
import { 
  CRITERIO_ADOLESCENTE,
  CRITERIO_ADULTO,
  CRITERIO_JOVEN
} from "@/common/historiaClinicaDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      params: {},
    }
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando','responseData']),
    ...mapState('rulesValidate', ['required','requiredId','onlyNumbers']),

    tieneCriterioAdolescente() {
      return this.datos.criterio == CRITERIO_ADOLESCENTE
    },

    tieneCriterioJoven() {
      return this.datos.criterio == CRITERIO_JOVEN
    },

    tieneCriterioAdulto() {
      return this.datos.criterio == CRITERIO_ADULTO
    },

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
    ...mapActions('historiaClinica', ['updateSaludSexualReproductiva']),

    validadEdadInicioVidaSexual(event) {
      validarNumeroEntero(event, this.datos.inicioVidaSexual, 2)
    },

    validadHijosCantidad(event) {
      validarNumeroEntero(event, this.datos.hijosCantidad, 2)
    },

    validadCantidad(event) {
      validarNumeroEntero(event, event.target.value, 2)
    },
  
    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },
    
    async updateDatosSaludSexualReproductiva() {
      const esValido = await this.$refs.datosSaludSexualReproductivaRef.validate()
      if (esValido) {
        this.params = {}
        if (this.tieneCriterioAdolescente) {
          this.params = {
            saludSexualReproductiva: {
              data: {
                inicioVidaSexual: parseInt(this.datos.inicioVidaSexual),
                abusoSexual: this.datos.radiosAndCantidad[0].value,
                abusoSexualCantidad: parseInt(this.datos.radiosAndCantidad[0].cantidad),
                embarazo: this.datos.radiosAndCantidad[1].value,
                embarazoCantidad: parseInt(this.datos.radiosAndCantidad[1].cantidad),
                hijos: this.datos.radiosAndCantidad[2].value,
                hijosCantidad: parseInt(this.datos.radiosAndCantidad[2].cantidad),
                aborto: this.datos.radiosAndCantidad[3].value,
                abortoCantidad: parseInt(this.datos.radiosAndCantidad[3].cantidad),
                usaMetodoAnticonceptivo: this.datos.radios[0].value,
                sabePrevenirEmbarazo: this.datos.radios[1].value,
                sabePrevenirEts: this.datos.radios[2].value,
                detalles: this.datos.detalles,
              }
            }
          }
        }
        if (this.tieneCriterioJoven) {
          this.params = {
            saludSexualReproductiva: {
              data: {
                inicioVidaSexual:  parseInt(this.datos.inicioVidaSexual),
                nivelTestosterona: this.datos.nivelTestosterona,
                calidadEsperma: this.datos.calidadEsperma, 
                eyaculacionPrecoz: this.datos.radios[0].value,
                menarquia: this.datos.radios[1].value,
                embarazo: this.datos.radios[2].value,
                aborto: this.datos.radios[3].value,
                dolorCoital: this.datos.radios[4].value,
                anorgasmia: this.datos.radios[5].value,
                disfuncionErectil: this.datos.radios[6].value,
                detalles: this.datos.detalles,
              }
            }
          }
        }
        if (this.tieneCriterioAdulto) {
          this.params = {
            saludSexualReproductiva: {
              data: {
                inicioVidaSexual: parseInt(this.datos.inicioVidaSexual),
                nivelTestosterona: this.datos.nivelTestosterona,
                calidadEsperma: this.datos.calidadEsperma, 
                hijosCantidad: parseInt(this.datos.hijosCantidad),
                embarazo: this.datos.radios[0].value,
                partoPrematuro: this.datos.radios[1].value,
                aborto: this.datos.radios[2].value,
                flujoVaginalPatologico: this.datos.radios[3].value,
                dismenorrea: this.datos.radios[4].value,
                disfuncionErectil: this.datos.radios[5].value,
                detalles: this.datos.detalles,
              }
            }
          }
        }
        await this.updateSaludSexualReproductiva({
          idPaciente: this.datos.idPaciente,
          params: this.params,
        })
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.datos.historia.inicioVidaSexual = this.responseData.inicioVidaSexual
          this.datos.historia.detalles = this.responseData.detalles
          this.datos.historia.embarazo = this.responseData.embarazo
          this.datos.historia.aborto = this.responseData.aborto

          if (this.tieneCriterioAdolescente) {
            this.datos.historia.abusoSexual = this.responseData.abusoSexual
            this.datos.historia.abusoSexualCantidad = this.responseData.abusoSexualCantidad
            this.datos.historia.embarazoCantidad = this.responseData.embarazoCantidad
            this.datos.historia.hijos = this.responseData.hijos
            this.datos.historia.hijosCantidad = this.responseData.hijosCantidad
            this.datos.historia.abortoCantidad = this.responseData.abortoCantidad
            this.datos.historia.usaMetodoAnticonceptivo = this.responseData.usaMetodoAnticonceptivo
            this.datos.historia.sabePrevenirEmbarazo = this.responseData.sabePrevenirEmbarazo
            this.datos.historia.sabePrevenirEts = this.responseData.sabePrevenirEts
          }

          if (this.tieneCriterioJoven) {
            this.datos.historia.eyaculacionPrecoz = this.responseData.eyaculacionPrecoz
            this.datos.historia.menarquia = this.responseData.menarquia
            this.datos.historia.dolorCoital = this.responseData.dolorCoital
            this.datos.historia.anorgasmia = this.responseData.anorgasmia
          }

          if (this.tieneCriterioAdulto) {
            this.datos.historia.hijosCantidad = this.responseData.hijosCantidad
            this.datos.historia.partoPrematuro = this.responseData.partoPrematuro
            this.datos.historia.flujoVaginalPatologico = this.responseData.flujoVaginalPatologico
            this.datos.historia.dismenorrea = this.responseData.dismenorrea
          }

          if (this.tieneCriterioJoven || this.tieneCriterioAdulto) {
            this.datos.historia.nivelTestosterona = this.responseData.nivelTestosterona
            this.datos.historia.calidadEsperma = this.responseData.calidadEsperma
            this.datos.historia.disfuncionErectil = this.responseData.disfuncionErectil
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
.input{
  width: 100px;
  box-shadow: none;
}
</style>