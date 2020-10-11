<template>
  <div>
    <v-row>
      <v-col cols="12" lg="7" md="8" sm="9" class="mx-auto">
        <v-card
          :loading="loading"
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para actualizar Paciente" 
            />
            <hr>
            <ValidationObserver ref="formEdit">
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="idTipoDocumento"
                      :items="parametroData2"
                      item-text="descripcion"
                      item-value="idParametro"
                      color="secondary"
                      dense
                      outlined
                      @change="validarLengthDocumento()"
                      label="Tipo de documento"
                      :error-messages="errors"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" :rules="`required|length:${this.lengthDocumento}|onlyNumbers`" v-slot="{ errors }">
                    <v-text-field
                      label="N° de documento"
                      color="secondary"
                      v-model="documento"
                      placeholder=" "
                      dense
                      @keypress="validarDocumento"
                      outlined
                      :error-messages="errors"
                      @keyup.enter="updatePaciente()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Ap. paterno"
                      color="secondary"
                      dense
                      outlined
                      v-model="paterno"
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="updatePaciente()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Ap. materno"
                      color="secondary"
                      dense
                      outlined
                      v-model="materno"
                      placeholder=" "
                      :error-messages="errors"
                      @keyup.enter="updatePaciente()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombres"
                      color="secondary"
                      v-model="nombres"
                      placeholder=" "
                      dense
                      outlined
                      :error-messages="errors"
                      @keyup.enter="updatePaciente()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="sexo"
                      :items="parametroData1"
                      item-text="descripcion"
                      item-value="idParametro"
                      color="secondary"
                      dense
                      outlined
                      label="Género"
                      :error-messages="errors"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Domicilio"
                      color="secondary"
                      v-model="domicilio"
                      placeholder=" "
                      dense
                      outlined
                      :error-messages="errors"
                      @keyup.enter="updatePaciente()"> 
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                    <v-dialog
                      ref="dialogCalender"
                      v-model="modalCalender"
                      :return-value.sync="fechaNac"
                      persistent
                      width="290px">
                      <template v-slot:activator="{ on }">
                        <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                          <v-text-field
                            v-model="fechaNac"
                            label="Fecha de Nacimiento"
                            :error-messages="errors"
                            dense
                            outlined
                            placeholder=" "
                            v-on="on"
                          ></v-text-field>
                        </ValidationProvider>
                      </template>
                      <v-date-picker 
                        v-model="fechaNac" 
                        scrollable 
                        locale="es" 
                        color="primary">
                        <v-spacer></v-spacer>
                        <v-btn text color="cancel" @click="modalCalender = false">Cerrar</v-btn>
                        <v-btn text color="primary" @click="$refs.dialogCalender.save(fechaNac)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3" md="10" offset-md="1" offset-sm="0">
                  <v-row>
                    <v-col cols="6">
                      <BtnCancel @click.native="cancelar()" />
                    </v-col>
                    <v-col cols="6">
                      <BtnSubmit @click.native="updatePaciente()" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validarNumeroEntero } from "@/common/rulesValidate"
import { PARAMETRO_DNI } from "@/common/parametroDefinition"
import { DNI_LENGTH, CODIGO_EMPADRONAMIENTO_LENGTH } from "@/common/sammcDefinition"
import { PARAMETRO_TIPO_SEXO } from "@/common/parametroTipoDefinition"
import { PARAMETRO_TIPO_TIPO_DOCUMENTO } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      idTipoDocumento: -1,
      paterno: '',
      materno: '',
      nombres: '',
      edad: '',
      documento: '',
      sexo: -1,
      domicilio: '',
      fechaNac: '',
      modalCalender: false,
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.pacienteToEdit == null) {
      swal.errorMessage('Paciente no existe.')
      return
    }
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    await this.getParametroData1(paramsUrlParametro)
    const paramsUrlParametro2 = `?idParametroTipo=${PARAMETRO_TIPO_TIPO_DOCUMENTO}`
    await this.getParametroData2(paramsUrlParametro2)
    this.idTipoDocumento = this.pacienteToEdit.tipoDocumento.idParametro
    this.documento = this.pacienteToEdit.documento
    this.paterno = this.pacienteToEdit.paterno
    this.materno = this.pacienteToEdit.materno
    this.nombres = this.pacienteToEdit.nombres
    this.domicilio = this.pacienteToEdit.direccion
    this.sexo = this.pacienteToEdit.sexo.idParametro
    this.fechaNac = this.pacienteToEdit.fechaNacimiento
  },

  computed: {
    ...mapState('paciente', ['pacienteToEdit','isSuccess']),
    ...mapState('parametro', ['parametroData1','parametroData2']),
    ...mapState('rulesValidate', ['required','requiredId','length','onlyNumbers','invalidEmail']),

    loading() {
      return this.pacienteToEdit == ''
    },

    lengthDocumento() {
      return this.idTipoDocumento == PARAMETRO_DNI ? DNI_LENGTH : CODIGO_EMPADRONAMIENTO_LENGTH
    }
  },

  methods: {
    ...mapActions('paciente', ['edit','update']),
    ...mapActions('parametro', ['getParametroData1','getParametroData2']),

    validarDocumento(event) {
      validarNumeroEntero(event, this.documento, this.lengthDocumento)
    },

    validarLengthDocumento() {
      if (this.idTipoDocumento == PARAMETRO_DNI && this.documento.length > DNI_LENGTH ) {
        this.documento = ''
      }
    },

    cancelar() {
      this.$router.push({ name: 'ListPaciente' })
    },

    async updatePaciente() {
      const isValid = await this.$refs.formEdit.validate()
      if (isValid) {
        const params = {
          paciente: {
            data: {
              documento: this.documento,
              idTipoDocumento: this.idTipoDocumento,
              paterno: this.paterno,
              materno: this.materno,
              nombres: this.nombres,
              sexo: this.sexo,
              fechaNacimiento: this.fechaNac,
              direccion: this.domicilio,
            }
          }
        }
        await this.update({ idPaciente: this.pacienteToEdit.idPaciente , params: params })
        if (this.isSuccess) {
          this.$router.push({ name: 'ListPaciente' })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    }
  }
}
</script>