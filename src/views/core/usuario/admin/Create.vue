<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" md="9" sm="9" class="mx-auto">
        <v-card
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para registrar Usuario"
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
                          append-icon="fas fa-search"
                          color="secondary"
                          dense
                          outlined
                          v-model="dni"
                          placeholder=" "
                          :error-messages="errors"
                          @keypress="validarDni"
                          @keyup.enter="buscarUsuarioSegunDni()"
                          @click:append="buscarUsuarioSegunDni()"> 
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
                          :disabled="existeUsuarioData"
                          :error-messages="errors"
                          @keyup.enter="guardarDatosUsuario()"> 
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
                          :disabled="existeUsuarioData"
                          :error-messages="errors"
                          @keyup.enter="guardarDatosUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Nombres"
                          color="secondary"
                          v-model="nombres"
                          dense
                          outlined
                          placeholder=" "
                          :disabled="existeUsuarioData"
                          :error-messages="errors"
                          @keyup.enter="guardarDatosUsuario()"> 
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
                          :disabled="existeUsuarioData"
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
                          v-model="email"
                          dense
                          outlined
                          placeholder=" "
                          :disabled="existeUsuarioData"
                          :error-messages="errors"
                          @keyup.enter="guardarDatosUsuario()"> 
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
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Usuario"
                          v-model="usuario"
                          placeholder=" "
                          dense
                          outlined
                          :disabled="existeUsuarioData"
                          :error-messages="errors"
                          color="secondary"
                          @keyup.enter="guardarDatosUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                        <v-text-field
                          label="Contraseña"
                          v-model="password"
                          placeholder=" "
                          color="secondary"
                          dense
                          outlined
                          :error-messages="errors"
                          :disabled="existeUsuarioData"
                          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          @keyup.enter="guardarDatosUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                        <v-select
                          v-model="idRol"
                          :items="rolData"
                          item-text="nombre"
                          color="secondary"
                          item-value="idRol"
                          dense
                          outlined
                          label="Rol de usuario"
                          :error-messages="errors"
                          placeholder="Seleccione"
                          @change="onChangeRol"> 
                        </v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                        <v-select
                          v-model="idEspecialidad"
                          :items="especialidadData"
                          item-text="nombre"
                          color="secondary"
                          dense
                          outlined
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
                        @click.native="guardarDatosUsuario()"
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
import { mapState, mapActions } from 'vuex'
import { ROL_MEDICO_ESPECIALISTA } from '@/common/rolDefinition'
import { PARAMETRO_TIPO_SEXO } from "@/common/parametroTipoDefinition"
import { SIN_ESPECIALIDAD } from "@/common/especialidadDefinition"
import { DNI_LENGTH } from "@/common/sammcDefinition"
import { validarNumeroEntero } from "@/common/rulesValidate"
import * as swal from '@/plugins/sweetAlertMessages'
import * as ls from "@/localStorage/index"
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
      idUsuario: -1,
      disabledSelectEspecialidad: false,
    }
  },

  async created() {
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    this.getParametroData1(paramsUrlParametro)
    const paramsUrlRol = `?notAdmin=true`
    this.getRolData(paramsUrlRol)
    const paramsUrlEspecialidad = ``
    this.getEspecialidadData(paramsUrlEspecialidad)
    this.idCentroAsistencial = parseInt(ls.getIdCentroAsistencial())
  },

  computed: {
    ...mapState('rol', ['rolData']),
    ...mapState('especialidad', ['especialidadData']),
    ...mapState('rulesValidation', ['required','requiredId','length','onlyNumbers','invalidEmail']),
    ...mapState('usuario', ['usuarioData','isSuccess','guardando']),
    ...mapState('usuarioxCentro', ['isSuccessAffiliate','guardando']),
    ...mapState('parametro', ['parametroData1']),

    existeUsuarioData() {
      return this.usuarioData == null || this.usuarioData.length == 0 ? false : true
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('rol', ['getRolData']),
    ...mapActions('especialidad', ['getEspecialidadData']),
    ...mapActions('usuario', ['getUsuarioData','save','setUsuarioData']),
    ...mapActions('usuarioxCentro', ['affiliateUser']),
    ...mapActions('parametro', ['getParametroData1']),

    validarDni(event) {
      validarNumeroEntero(event, this.dni, DNI_LENGTH)
    },

    async onChangeRol() {
      if (this.idRol != ROL_MEDICO_ESPECIALISTA) {
        this.idEspecialidad = SIN_ESPECIALIDAD
        this.disabledSelectEspecialidad = true
      } else {
        this.idEspecialidad = -1
        this.disabledSelectEspecialidad = false
      }
    },

    async buscarUsuarioSegunDni() {
      if (this.dni == '') {
        swal.infoMessage('Ingrese un número de dni para buscar.')
      } else {
        const data = []
        await this.setUsuarioData(data)
        this.paterno = ''
        this.materno = ''
        this.nombres = ''
        this.sexo = -1
        this.email = ''
        this.usuario = ''
        this.idUsuario = -1
        this.password = ''
        this.idRol = -1
        this.idEspecialidad = -1
        const paramsUrlUsuario = `?dni=${this.dni}`
        await this.getUsuarioData(paramsUrlUsuario)
        if (this.usuarioData) {
          await this.cargarInputsFormUsuario()
        } else {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    cargarInputsFormUsuario() {
      this.paterno = this.usuarioData[0].paterno
      this.materno = this.usuarioData[0].materno
      this.nombres = this.usuarioData[0].nombres
      this.sexo = this.usuarioData[0].sexo.idParametro
      this.email = this.usuarioData[0].email
      this.usuario = this.usuarioData[0].usuario
      this.idUsuario = this.usuarioData[0].idUsuario
      this.password = '***********'
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListUsuarioSecundario' 
      })
    },

    async guardarDatosUsuario() {
      const isValid = await this.$refs.datosUsuarioRef.validate()
      if (isValid) {
        if (this.idUsuario > 0) {
          const params = {
            usuarioxcentro: {
              data: {
                idUsuario: this.idUsuario,
                idCentroAsistencial: this.idCentroAsistencial,
                idRol: this.idRol,
                idEspecialidad: this.idEspecialidad,
              }
            }
          }
          await this.affiliateUser(params)
          if (this.isSuccessAffiliate) {
            this.$router.push({ 
              name: 'ListUsuarioSecundario' 
            })
            swal.successMessage('Se registró correctamente.')
          }
        } else {
          const params = {
            usuario: {
              data: {
                dni: this.dni,
                paterno: this.paterno,
                materno: this.materno,
                nombres: this.nombres,
                sexo: this.sexo,
                email: this.email,
                usuario: this.usuario,
                password: this.password,
                idCentroAsistencial: this.idCentroAsistencial,
                idEspecialidad: this.idEspecialidad,
                idRol: this.idRol,
              }
            }
          }
          await this.save(params)
          if (this.isSuccess) {
            this.$router.push({ 
              name: 'ListUsuarioSecundario'
            })
            swal.successMessage('Se registró correctamente.')
          }
        }
      }
    },
  }
}
</script>