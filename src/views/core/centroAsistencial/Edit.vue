<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" md="10" sm="8" class="mx-auto">
        <v-card
          :loading="loading"
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para actualizar Centro Asistencial"
            />
            <hr>
            <ValidationObserver ref="datosCentroAsistencialRef">
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <v-select
                    v-model="idDiresa"
                    :items="diresaData"
                    item-text="nombre"
                    dense
                    outlined
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
                    dense
                    outlined
                    no-data-text="Sin opciones"
                    item-value="idRedAsistencial"
                    label="Red Asistencial"
                    color="secondary"
                    placeholder="Seleccione"
                    @change="onChangeRedAsistencial()"> 
                  </v-select>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="idMicroredAsistencial"
                      :items="microredAsistencialData"
                      item-text="nombre"
                      color="secondary"
                      dense
                      outlined
                      no-data-text="Sin opciones"
                      item-value="idMicroredAsistencial"
                      label="Microred Asistencial"
                      :error-messages="errors"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="nivel"
                      :items="parametroData1"
                      dense
                      outlined
                      item-text="descripcion"
                      item-value="idParametro"
                      label="Nivel"
                      color="secondary"
                      :error-messages="errors"
                      placeholder="Seleccione"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombre de Centro Asistencial"
                      color="secondary"
                      v-model="nombre"
                      dense
                      outlined
                      :error-messages="errors"
                      placeholder=" "
                      @keyup.enter="updateCentroAsistencial()">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" lg="6" offset-lg="3" md="10" offset-md="1" offset-sm="0">
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
                        @click.native="updateCentroAsistencial()"
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
import { PARAMETRO_TIPO_NIVEL_CENTRO_ASISTENCIAL } from "@/common/parametroTipoDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      idDiresa: -1,
      idRedAsistencial: -1,
      idMicroredAsistencial: -1,
      nombre: '',
      nivel: -1,
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.centroAsistencialToEdit == null) {
      swal.errorMessage('Centro Asistencial no existe.')
      return
    }
    this.nombre = this.centroAsistencialToEdit.nombre
    this.nivel = this.centroAsistencialToEdit.nivel.idParametro
    this.idDiresa = this.centroAsistencialToEdit.microredAsistencial.redAsistencial.diresa.idDiresa
    this.idRedAsistencial = this.centroAsistencialToEdit.microredAsistencial.redAsistencial.idRedAsistencial
    this.idMicroredAsistencial = this.centroAsistencialToEdit.microredAsistencial.idMicroredAsistencial
    const paramsUrlDiresa = ``
    this.getDiresaData(paramsUrlDiresa)
    const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
    this.getRedAsistencialData(paramsUrlRedAsistencial)
    const paramsUrlMicroredAsistencial = `?idRedAsistencial=${this.idRedAsistencial}`
    this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    const paramsUrlParametro = `?idParametroTipo=${PARAMETRO_TIPO_NIVEL_CENTRO_ASISTENCIAL}`
    this.getParametroData1(paramsUrlParametro)
  },

  computed: {
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('microredAsistencial', ['microredAsistencialData']),
    ...mapState('parametro', ['parametroData1']),
    ...mapState('centroAsistencial', ['isSuccess','centroAsistencialToEdit','guardando']),
    ...mapState('rulesValidation', ['required','requiredId']),

    loading() {
      return this.centroAsistencialToEdit == ''
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
    ...mapActions('parametro', ['getParametroData1']),
    ...mapActions('centroAsistencial', ['edit','update']),

    async onChangeDiresa() {
      this.idRedAsistencial = -1
      this.idMicroredAsistencial = -1
      this.setMicroredAsistencialData()
      const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
      await this.getRedAsistencialData(paramsUrlRedAsistencial)
    },

    async onChangeRedAsistencial() {
      this.idMicroredAsistencial = -1
      const paramsUrlMicroredAsistencial = `?idRedAsistencial=${this.idRedAsistencial}`
      await this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListCentroAsistencial' 
      })
    },

    async updateCentroAsistencial() {
      const isValid = await this.$refs.datosCentroAsistencialRef.validate()
      if (isValid) {
        const params = {
          centroAsistencial: {
            data: {
              nombre: this.nombre,
              idMicroredAsistencial: this.idMicroredAsistencial,
              nivel : this.nivel
            }
          }
        }
        await this.update({ 
          idCentroAsistencial: this.centroAsistencialToEdit.idCentroAsistencial, 
          params: params 
        })
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListCentroAsistencial' 
          })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>