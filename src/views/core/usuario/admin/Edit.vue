<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" md="9" sm="9" class="mx-auto">
        <v-card
          :loading="loading"
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para actualizar Usuario" 
            />
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
                          v-model="dni"
                          dense
                          outlined
                          placeholder=" "
                          :error-messages="errors"
                          @keypress="validarDni"
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
                          placeholder=" "
                          dense
                          outlined
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
                          placeholder=" "
                          dense
                          outlined
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
                          dense
                          outlined
                          item-value="idParametro"
                          color="secondary"
                          label="Género"
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
                        placeholder=" "
                        dense
                        outlined
                        color="secondary"
                        disabled> 
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <v-text-field
                        label="Contraseña (opcional)"
                        v-model="password"
                        placeholder=" "
                        dense
                        outlined
                        color="secondary"
                        :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"> 
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                        <v-select
                          v-model="idRol"
                          :items="rolData"
                          item-text="nombre"
                          dense
                          outlined
                          color="secondary"
                          item-value="idRol"
                          label="Rol de usuario"
                          :error-messages="errors"
                          placeholder="Seleccione"
                          @change="onChangeRol()"> 
                        </v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                        <v-select
                          v-model="idEspecialidad"
                          :items="especialidadData"
                          item-text="nombre"
                          dense
                          outlined
                          color="secondary"
                          item-value="idEspecialidad"
                          label="Especialidad"
                          :disabled="disabledSelectEspecialidad"
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
import { validarNumeroEntero } from "@/common/rulesValidate"
import { mapState, mapActions } from 'vuex'
import { DNI_LENGTH } from "@/common/sammcDefinition"
import { ROL_MEDICO_ESPECIALISTA } from '@/common/rolDefinition'
import { PARAMETRO_TIPO_SEXO } from "@/common/parametroTipoDefinition"
import { SIN_ESPECIALIDAD } from "@/common/especialidadDefinition"
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
      idRol: -1,
      idEspecialidad: -1,
      idCentroAsistencial: -1,
      disabledSelectEspecialidad: false,
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
    this.idRol = this.usuarioxCentroToEdit.rol.idRol
    this.idEspecialidad = this.usuarioxCentroToEdit.especialidad.idEspecialidad
    this.idCentroAsistencial = this.usuarioxCentroToEdit.centroAsistencial.idCentroAsistencial
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    this.getParametroData1(paramsUrlParametro)
    const paramsUrlRol = `?notAdmin=true`
    this.getRolData(paramsUrlRol)
    const paramsUrlEspecialidad = ``
    this.getEspecialidadData(paramsUrlEspecialidad)
    this.onChangeRol()
  },

  computed: {
    ...mapState('rol', ['rolData']),
    ...mapState('especialidad', ['especialidadData']),
    ...mapState('rulesValidation', ['required','requiredId','length','onlyNumbers','invalidEmail']),
    ...mapState('usuarioxCentro', ['usuarioxCentroToEdit']),
    ...mapState('usuario',['isSuccess','guardando']),
    ...mapState('parametro', ['parametroData1']),

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
    ...mapActions('rol', ['getRolData']),
    ...mapActions('especialidad', ['getEspecialidadData']),
    ...mapActions('usuarioxCentro', ['edit']),
    ...mapActions('usuario', ['update']),
    ...mapActions('parametro', ['getParametroData1']),

    validarDni(event) {
      validarNumeroEntero(event, this.dni, DNI_LENGTH)
    },

    async onChangeRol() {
      if (this.idRol != ROL_MEDICO_ESPECIALISTA) {
        this.idEspecialidad = SIN_ESPECIALIDAD
        this.disabledSelectEspecialidad = true
      } else {
        this.disabledSelectEspecialidad = false
      }
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListUsuarioSecundario'
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
              idRol: this.idRol,
              idEspecialidad: this.idEspecialidad,
              idCentroAsistencialOld: this.idCentroAsistencial,
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
          this.$router.push({ name: 'ListUsuarioSecundario' })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>