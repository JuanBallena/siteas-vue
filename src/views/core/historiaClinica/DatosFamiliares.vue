<template>
  <div>
    <ValidationObserver ref="datosFamiliaresRef">
      <Title 
        text="Datos de Madre de familia"
      />
      <v-row>
        <v-col cols="12" lg="4" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Nombres y apellidos"
              v-model="datos.nombreMadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="6">
          <v-dialog v-if="puedeEditarHistoria()"
            ref="modalCalendarioFechaNacimientoMadreRef"
            v-model="modalCalendarioFechaNacimientoMadre"
            :return-value.sync="datos.fechaNacimientoMadre"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                <v-text-field
                  v-model="datos.fechaNacimientoMadre"
                  label="Fecha Nacimiento"
                  color="secondary"
                  dense
                  :error-messages="errors"
                  outlined
                  placeholder=" "
                  v-on="on">
                </v-text-field>
              </ValidationProvider>
            </template>
            <v-date-picker 
              v-model="datos.fechaNacimientoMadre" 
              scrollable 
              locale="es"
              color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="cancel" @click="modalCalendarioFechaNacimientoMadre = false">Cerrar</v-btn>
              <v-btn text color="primary" @click="$refs.modalCalendarioFechaNacimientoMadreRef.save(datos.fechaNacimientoMadre)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field v-else
            v-model="datos.fechaNacimientoMadre"
            label="Fecha Nacimiento"
            color="secondary"
            dense
            readonly
            placeholder=" ">
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required|length:8|onlyNumbers" v-slot="{ errors }">
            <v-text-field
              label="Dni"
              v-model="datos.documentoMadre"
              :error-messages="errors"
              dense
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              @keypress="validarDniMadre"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Telefono"
              v-model="datos.telefonoMadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Ocupación"
              v-model="datos.ocupacionMadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-select v-if="puedeEditarHistoria()"
              label="Estado civil"
              :items="parametroData1ForMadre"
              item-text="descripcion"
              item-value="idParametro"
              return-object
              v-model="datos.estadoCivilMadre"
              dense
              :error-messages="errors"
              color="secondary"
              outlined
              placeholder="Seleccione">
            </v-select>
            <v-text-field v-else
              v-model="datos.estadoCivilMadreDescripcion"
              label="Estado civil"
              color="secondary"
              dense
              readonly
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-select v-if="puedeEditarHistoria()"
              label="Grado de instrucción"
              v-model="datos.gradoInstruccionMadre"
              :items="parametroData2ForMadre"
              item-text="descripcion"
              item-value="idParametro"
              return-object
              dense
              :error-messages="errors"
              color="secondary"
              outlined
              placeholder="Seleccione">
            </v-select>
            <v-text-field v-else
              v-model="datos.gradoInstruccionMadreDescripcion"
              label="Grado de instrucción"
              color="secondary"
              dense
              readonly
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Religión"
              v-model="datos.religionMadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <Title 
        text="Datos de Padre de familia"
      />
      <v-row>
        <v-col cols="12" lg="4" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Nombres y apellidos"
              v-model="datos.nombrePadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="6">
          <v-dialog v-if="puedeEditarHistoria()"
            ref="modalCalendarioFechaNacimientoPadreRef"
            v-model="modalCalendarioFechaNacimientoPadre"
            :return-value.sync="datos.fechaNacimientoPadre"
            persistent
            width="290px">
            <template v-slot:activator="{ on }">
              <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                <v-text-field
                  v-model="datos.fechaNacimientoPadre"
                  label="Fecha Nacimiento"
                  color="secondary"
                  dense
                  :error-messages="errors"
                  outlined
                  placeholder=" "
                  v-on="on">
                </v-text-field>
              </ValidationProvider>
            </template>
            <v-date-picker 
              v-model="datos.fechaNacimientoPadre" 
              scrollable 
              locale="es"
              color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="cancel" @click="modalCalendarioFechaNacimientoPadre = false">Cerrar</v-btn>
              <v-btn text color="primary" @click="$refs.modalCalendarioFechaNacimientoPadreRef.save(datos.fechaNacimientoPadre)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field v-else
            v-model="datos.fechaNacimientoPadre"
            label="Fecha Nacimiento"
            color="secondary"
            dense
            readonly
            placeholder=" ">
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required|length:8|onlyNumbers" v-slot="{ errors }">
            <v-text-field
              label="Dni"
              v-model="datos.documentoPadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              @keypress="validarDniPadre"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Telefono"
              v-model="datos.telefonoPadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Ocupación"
              v-model="datos.ocupacionPadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="2" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-select v-if="puedeEditarHistoria()"
              label="Estado civil"
              v-model="datos.estadoCivilPadre"
              :items="parametroData1ForPadre"
              item-text="descripcion"
              item-value="idParametro"
              return-object
              :error-messages="errors"
              dense
              color="secondary"
              outlined
              placeholder="Seleccione">
            </v-select>
            <v-text-field v-else
              v-model="datos.estadoCivilPadreDescripcion"
              label="Estado civil"
              color="secondary"
              dense
              readonly
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-select v-if="puedeEditarHistoria()"
              label="Grado de instrucción"
              v-model="datos.gradoInstruccionPadre"
              :items="parametroData2ForPadre"
              item-text="descripcion"
              item-value="idParametro"
              return-object
              dense
              :error-messages="errors"
              color="secondary"
              outlined
              placeholder="Seleccione">
            </v-select>
            <v-text-field v-else
              v-model="datos.gradoInstruccionPadreDescripcion"
              label="Grado de instrucción"
              color="secondary"
              dense
              readonly
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" lg="3" md="4" sm="6">
          <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Religión"
              v-model="datos.religionPadre"
              dense
              :error-messages="errors"
              color="secondary"
              :outlined="aplicarSiPuedeEditar"
              :readonly="!aplicarSiPuedeEditar"
              placeholder=" ">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" offset-lg="5" offset-md="4" offset-sm="3" lg="2" md="4" sm="6">
          <BtnSubmit v-if="puedeEditarHistoria()"
            :title="buttonTitle"
            :disabled="deshabilitado"
            @click.native="guardarDatosFamiliares()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { validarNumeroEntero } from "@/common/rulesValidate"
import { DNI_LENGTH } from "@/common/sammcDefinition"
import { puedeEditarHistoriaClinica } from "@/common/functionsRol"
import { 
  PARAMETRO_TIPO_ESTADO_CIVIL,
  PARAMETRO_TIPO_GRADO_INSTRUCCION
} from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  props: {
    datos: Object,
  },

  data: () => {
    return {
      modalCalendarioFechaNacimientoMadre: false,
      modalCalendarioFechaNacimientoPadre: false,
    }
  },

  async created() {
    const paramsUrlParametro1 = `?idParametroTipo=${PARAMETRO_TIPO_ESTADO_CIVIL}`
    await this.getParametroData1(paramsUrlParametro1)
    const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_GRADO_INSTRUCCION}`
    await this.getParametroData2(paramsUrlParametro2)
  },

  computed: {
    ...mapState('rulesValidate', ['required','length','onlyNumbers']),
    ...mapState('historiaClinica', ['isSuccessCreate','guardando','responseData']),
    ...mapState('parametro', ['parametroData1','parametroData2']),

    parametroData1ForMadre() {
      return this.parametroData1
    },

    parametroData1ForPadre() {
      return this.parametroData1
    },

    parametroData2ForMadre() {
      return this.parametroData2
    },

    parametroData2ForPadre() {
      return this.parametroData2
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
    ...mapActions('historiaClinica', ['saveDatoFamiliar']),
    ...mapActions('parametro', ['getParametroData1','getParametroData2']),

    puedeEditarHistoria() {
      return puedeEditarHistoriaClinica(this.datos.idRol)
    },

    validarDniMadre(event) {
      validarNumeroEntero(event, this.datos.documentoMadre, DNI_LENGTH)
    },

    validarDniPadre(event) {
      validarNumeroEntero(event, this.datos.documentoPadre, DNI_LENGTH)
    },

    async guardarDatosFamiliares() {
      const esValido = await this.$refs.datosFamiliaresRef.validate()
      if (esValido) {
        const params = {
          datoFamiliar: {
            data: {
              nombreMadre: this.datos.nombreMadre,
              fechaNacimientoMadre: this.datos.fechaNacimientoMadre,
              documentoMadre: this.datos.documentoMadre,
              telefonoMadre: this.datos.telefonoMadre,
              ocupacionMadre: this.datos.ocupacionMadre,
              religionMadre: this.datos.religionMadre,
              gradoInstruccionMadre: this.datos.gradoInstruccionMadre.idParametro,
              estadoCivilMadre: this.datos.estadoCivilMadre.idParametro,
              nombrePadre: this.datos.nombrePadre,
              fechaNacimientoPadre : this.datos.fechaNacimientoPadre,
              documentoPadre: this.datos.documentoPadre,
              telefonoPadre: this.datos.telefonoPadre,
              ocupacionPadre: this.datos.ocupacionPadre,
              religionPadre: this.datos.religionPadre,
              gradoInstruccionPadre: this.datos.gradoInstruccionPadre.idParametro,
              estadoCivilPadre: this.datos.estadoCivilPadre.idParametro,
            }
          }
        }
        await this.saveDatoFamiliar({ idPaciente: this.datos.idPaciente, params: params })
        if (this.isSuccessCreate) {
          swal.successMessage('Los datos se guardaron correctamente.')
          this.datos.historia.nombreMadre = this.responseData.nombreMadre
          this.datos.historia.fechaNacimientoMadre = this.responseData.fechaNacimientoMadre
          this.datos.historia.documentoMadre = this.responseData.documentoMadre
          this.datos.historia.telefonoMadre = this.responseData.telefonoMadre
          this.datos.historia.ocupacionMadre = this.responseData.ocupacionMadre
          this.datos.historia.religionMadre = this.responseData.religionMadre
          this.datos.historia.gradoInstruccionMadre = this.responseData.gradoInstruccionMadre
          this.datos.historia.estadoCivilMadre = this.responseData.estadoCivilMadre
          this.datos.historia.nombrePadre = this.responseData.nombrePadre
          this.datos.historia.fechaNacimientoPadre = this.responseData.fechaNacimientoPadre
          this.datos.historia.documentoPadre = this.responseData.documentoPadre
          this.datos.historia.telefonoPadre = this.responseData.telefonoPadre
          this.datos.historia.ocupacionPadre = this.responseData.ocupacionPadre
          this.datos.historia.religionPadre = this.responseData.religionPadre
          this.datos.historia.gradoInstruccionPadre = this.responseData.gradoInstruccionPadre
          this.datos.historia.estadoCivilPadre = this.responseData.estadoCivilPadre
        }
      }
    }
  }
}
</script>