<template>
  <div>
    <Title 
      text="Valoración Cínica" 
    />
    <br>
    <ValidationObserver ref="datosValoracionClinicaRef">
      <v-row>
        <v-col cols="12" lg="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-textarea
              v-model="datos.valoracionFuncional"
              label="Valoración funcional"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              :filled="!aplicarSiPuedeEditar"
              :error-messages="errors"
              height="100px"
              color="secondary"
              dense
              placeholder=" ">
            </v-textarea>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-textarea
              v-model="datos.valoracionMental"
              label="Valoración mental"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              :filled="!aplicarSiPuedeEditar"
              :error-messages="errors"
              height="100px"
              color="secondary"
              dense
              placeholder=" ">
            </v-textarea>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-textarea
              v-model="datos.valoracionSocioFamiliar"
              label="Valoración socio familiar"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              :filled="!aplicarSiPuedeEditar"
              :error-messages="errors"
              height="100px"
              color="secondary"
              dense
              placeholder=" ">
            </v-textarea>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" offset-lg="5" offset-md="4" offset-sm="3" lg="2" md="4" sm="6">
          <BtnSubmit v-if="puedeEditarHistoria()"
            :title="buttonTitle"
            :disabled="deshabilitado"
            @click.native="updateDatosValoracionClinica()" 
          />
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  computed: {
    ...mapState('historiaClinica', ['isSuccessCreate','guardando']),
    ...mapState('rulesValidate', ['required']),

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
    ...mapActions('historiaClinica', ['updateValoracionClinica','getHistoriaClinicaData']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    async updateDatosValoracionClinica() {
      const esValido = await this.$refs.datosValoracionClinicaRef.validate()
      if (esValido) {
        const params = {
          valoracionClinica: {
            data: {
              valoracionFuncional: this.datos.valoracionFuncional,
              valoracionMental: this.datos.valoracionMental,
              valoracionSocioFamiliar: this.datos.valoracionSocioFamiliar,
            }
          }
        }
        await this.updateValoracionClinica({
          idPaciente: this.datos.idPaciente,
          params: params,
        })
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.datos.historia.valoracionFuncional = this.datos.valoracionFuncional
          this.datos.historia.valoracionMental = this.datos.valoracionMental
          this.datos.historia.valoracionSocioFamiliar = this.datos.valoracionSocioFamiliar
        }
      }
    }
  }
}
</script>