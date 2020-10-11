<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" md="9" sm="9" class="mx-auto">
        <v-card
          :loading="loading"
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter text="Formulario para actualizar Usuario" />
            <hr>
            <ValidationObserver ref="datosUsuarioRef">
              <v-row>
                <v-col cols="12"  lg="6">
                  <SubTitle 
                    text="Datos Personales" 
                  />
                  <v-row>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required|length:8|onlyNumbers" v-slot="{ errors }">
                        <v-text-field
                          label="Dni"
                          color="secondary"
                          dense
                          outlined
                          v-model="dni"
                          placeholder=" "
                          @keypress="validarDni"
                          :error-messages="errors"
                          @keyup.enter="updateUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Ap. paterno"
                          color="secondary"
                          v-model="paterno"
                          dense
                          outlined
                          placeholder=" "
                          :error-messages="errors"
                          @keyup.enter="updateUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Ap. materno"
                          color="secondary"
                          v-model="materno"
                          dense
                          outlined
                          placeholder=" "
                          :error-messages="errors"
                          @keyup.enter="updateUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Nombres"
                          color="secondary"
                          dense
                          outlined
                          v-model="nombres"
                          placeholder=" "
                          :error-messages="errors"
                          @keyup.enter="updateUsuario()"> 
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
                          label="Género"
                          dense
                          outlined
                          :error-messages="errors"
                          placeholder="Seleccione"> 
                        </v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required|invalidEmail" v-slot="{ errors }">
                        <v-text-field
                          label="Correo electrónico"
                          color="secondary"
                          dense
                          outlined
                          v-model="email"
                          placeholder=" "
                          :error-messages="errors"
                          @keyup.enter="updateUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12"  lg="6">
                  <SubTitle 
                    text="Datos del Sistema"
                  />
                  <v-row>
                    <v-col cols="12" lg="6" md="6">
                      <v-text-field
                        label="Usuario"
                        v-model="usuario"
                        dense
                        outlined
                        placeholder=" "
                        color="secondary"
                        disabled> 
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <v-text-field
                        label="Contraseña (opcional)"
                        v-model="password"
                        placeholder=" "
                        color="secondary"
                        dense
                        outlined
                        :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"> 
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <v-select
                        v-model="idDiresa"
                        :items="diresaData"
                        item-text="nombre"
                        color="secondary"
                        dense
                        outlined
                        item-value="idDiresa"
                        label="Diresa"
                        placeholder="Seleccione"
                        @change="onChangeDiresa()">
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <v-select
                        v-model="idRedAsistencial"
                        :items="redAsistencialData"
                        item-text="nombre"
                        dense
                        outlined
                        no-data-text="Sin opciones"
                        color="secondary"
                        item-value="idRedAsistencial"
                        label="Red Asistencial"
                        placeholder="Seleccione"
                        @change="onChangeRedAsistencial()"> 
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                     <v-select
                        v-model="idMicroredAsistencial"
                        :items="microredAsistencialData"
                        item-text="nombre"
                        dense
                        outlined
                        no-data-text="Sin opciones"
                        color="secondary"
                        item-value="idMicroredAsistencial"
                        label="Microred Asistencial"
                        @change="onChangeMicroredAsistencial()"
                        placeholder="Seleccione"> 
                      </v-select>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                        <v-select
                          v-model="idCentroAsistencial"
                          :items="centroAsistencialData"
                          item-text="nombre"
                          dense
                          outlined
                          no-data-text="Sin opciones"
                          color="secondary"
                          item-value="idCentroAsistencial"
                          label="Centro Asistencial"
                          :error-messages="errors"
                          placeholder="Seleccione"> 
                        </v-select>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="4" offset-lg="4" md="10" offset-md="1" offset-sm="0">
                  <v-row>
                    <v-col cols="6">
                      <BtnCancel 
                        @click.native="cancelar()"
                      />
                    </v-col>
                    <v-col cols="6">
                      <BtnSubmit 
                        :title="buttonTitle"
                        :disabled="deshabilitado"
                        @click.native="updateUsuario()"
                      />
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
import Vue from 'vue'
import { DNI_LENGTH } from "@/common/sammcDefinition";
import { mapState, mapActions } from 'vuex'
import { PARAMETRO_TIPO_SEXO } from "@/common/parametroTipoDefinition"
import { validarNumeroEntero } from "@/common/rulesValidate"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      showPassword: false,
      dni: '',
      paterno: '',
      materno: '',
      nombres: '',
      sexo: -1,
      email: '',
      usuario: '',
      password: '',
      idDiresa: -1,
      idRedAsistencial: -1,
      idMicroredAsistencial: -1,
      idCentroAsistencial: -1,
      idCentroAsistencialOld: -1,
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.usuarioxCentroToEdit == null) {
      swal.errorMessage('Usuario no existe.')
      return
    }
    this.dni = this.usuarioxCentroToEdit.usuario.dni
    this.paterno = this.usuarioxCentroToEdit.usuario.paterno
    this.materno = this.usuarioxCentroToEdit.usuario.materno
    this.nombres = this.usuarioxCentroToEdit.usuario.nombres
    this.sexo = this.usuarioxCentroToEdit.usuario.sexo.idParametro
    this.email = this.usuarioxCentroToEdit.usuario.email
    this.usuario = this.usuarioxCentroToEdit.usuario.usuario
    this.idDiresa = this.usuarioxCentroToEdit.centroAsistencial.microredAsistencial.redAsistencial.diresa.idDiresa
    this.idRedAsistencial = this.usuarioxCentroToEdit.centroAsistencial.microredAsistencial.redAsistencial.idRedAsistencial
    this.idMicroredAsistencial = this.usuarioxCentroToEdit.centroAsistencial.microredAsistencial.idMicroredAsistencial
    this.idCentroAsistencial = this.usuarioxCentroToEdit.centroAsistencial.idCentroAsistencial
    this.idCentroAsistencialOld = this.usuarioxCentroToEdit.centroAsistencial.idCentroAsistencial
    const paramsUrlDiresa = ``
    this.getDiresaData(paramsUrlDiresa)
    const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
    this.getRedAsistencialData(paramsUrlRedAsistencial)
    const paramsUrlMicroredAsistencial = `?idRedAsistencial=${this.idRedAsistencial}`
    this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    const paramsUrlCentroAsistencial = `?idMicroredAsistencial=${this.idMicroredAsistencial}`
    this.getCentroAsistencialData(paramsUrlCentroAsistencial)
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    this.getParametroData1(paramsUrlParametro)
  },

  computed: {
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('microredAsistencial', ['microredAsistencialData']),
    ...mapState('centroAsistencial', ['centroAsistencialData']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('rulesValidation', ['required','requiredId','length','onlyNumbers','invalidEmail']),
    ...mapState('usuario', ['isSuccess','guardando']),
    ...mapState('usuarioxCentro', ['usuarioxCentroToEdit']),

    loading() {
      return this.usuarioxCentroToEdit == ''
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },
  },

  methods: {
    ...mapActions('diresa', ['getDiresaData']),
    ...mapActions('redAsistencial', ['getRedAsistencialData']),
    ...mapActions('microredAsistencial', ['getMicroredAsistencialData','setMicroredAsistencialData']),
    ...mapActions('centroAsistencial', ['getCentroAsistencialData','setCentroAsistencialData']),
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('usuario', ['update']),
    ...mapActions('usuarioxCentro', ['edit']),

    validarDni(event) {
      validarNumeroEntero(event, this.dni, DNI_LENGTH)
    },

    async onChangeDiresa() {
      this.setMicroredAsistencialData([])
      this.setCentroAsistencialData([])
      this.idRedAsistencial = -1
      this.idMicroredAsistencial = -1
      this.idCentroAsistencial = -1
      const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
      await this.getRedAsistencialData(paramsUrlRedAsistencial)
    },

    async onChangeRedAsistencial() {
      this.setCentroAsistencialData([])
      this.idMicroredAsistencial = -1
      this.idCentroAsistencial = -1
      const paramsUrlMicroredAsistencial = `?idRedAsistencial=${this.idRedAsistencial}`
      await this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    },

    async onChangeMicroredAsistencial() {
      this.idCentroAsistencial = -1
      const paramsUrlCentroAsistencial = `?idMicroredAsistencial=${this.idMicroredAsistencial}`
      await this.getCentroAsistencialData(paramsUrlCentroAsistencial)
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListUsuarioPrincipal' 
      })
    },

    async updateUsuario() {
      const isValid = await this.$refs.datosUsuarioRef.validate()
      if (isValid) {
        const params = {
          usuario: {
            data: {
              dni: this.dni,
              paterno: this.paterno,
              materno: this.materno,
              nombres: this.nombres,
              sexo: this.sexo,
              email: this.email,
              idCentroAsistencialOld: this.idCentroAsistencialOld,
              idCentroAsistencialNew: this.idCentroAsistencial,
            }
          }
        }
        if (this.password) {
          Vue.set(params.usuario.data, 'password', this.password)
        }
        await this.update({ 
          idUsuario: this.usuarioxCentroToEdit.usuario.idUsuario , 
          params: params 
        })
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListUsuarioPrincipal' 
          })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>