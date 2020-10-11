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
                          color="secondary"
                          v-model="dni"
                          dense
                          outlined
                          @keypress="validarDni"
                          placeholder=" "
                          :error-messages="errors"
                          @keyup.enter="guardarDatosUsuario()"> 
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
                          @keyup.enter="guardarDatosUsuario()"> 
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
                          placeholder=" "
                          dense
                          outlined
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
                          v-model="email"
                          dense
                          outlined
                          placeholder=" "
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
                          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          @keyup.enter="guardarDatosUsuario()"> 
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" lg="6" md="6">
                      <v-select
                        v-model="idDiresa"
                        :items="diresaData"
                        dense
                        outlined
                        item-text="nombre"
                        color="secondary"
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
                        color="secondary"
                        dense
                        no-data-text="Sin opciones"
                        outlined
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
                        no-data-text="Sin opciones"
                        outlined
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
                          color="secondary"
                          dense
                          no-data-text="Sin opciones"
                          outlined
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
import { DNI_LENGTH } from "@/common/sammcDefinition";
import { PARAMETRO_TIPO_SEXO } from "@/common/parametroTipoDefinition"
import { ROL_ADMINISTRADOR } from "@/common/rolDefinition"
import { SIN_ESPECIALIDAD } from "@/common/especialidadDefinition"
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
    }
  },

  async created() {
    this.setRedAsistencialData([])
    this.setMicroredAsistencialData([])
    this.setCentroAsistencialData([])
    const paramsUrlDiresa = ``
    await this.getDiresaData(paramsUrlDiresa)
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_SEXO}`
    await this.getParametroData1(paramsUrlParametro)
  },

  computed: {
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('microredAsistencial', ['microredAsistencialData']),
    ...mapState('centroAsistencial', ['centroAsistencialData']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('rulesValidation', ['required','requiredId','length','onlyNumbers','invalidEmail']),
    ...mapState('usuario', ['isSuccess','guardando']),

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('diresa', ['getDiresaData']),
    ...mapActions('redAsistencial', ['getRedAsistencialData','setRedAsistencialData']),
    ...mapActions('microredAsistencial', ['getMicroredAsistencialData','setMicroredAsistencialData']),
    ...mapActions('centroAsistencial', ['getCentroAsistencialData','setCentroAsistencialData']),
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('usuario', ['save']),

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

    async guardarDatosUsuario() {
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
              usuario: this.usuario,
              password: this.password,
              idCentroAsistencial: this.idCentroAsistencial,
              idEspecialidad: SIN_ESPECIALIDAD,
              idRol: ROL_ADMINISTRADOR,
            }
          }
        }
        await this.save(params)
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListUsuarioPrincipal'
          })
          swal.successMessage('Se registró correctamente.')
        }
      }
    },
  }
}
</script>