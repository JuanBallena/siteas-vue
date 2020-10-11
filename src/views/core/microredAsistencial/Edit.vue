<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto">
        <v-card
          :loading="loading"
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para actualizar Microred Asistencial"
            />
            <hr>
            <ValidationObserver ref="datosMicroredAsistencialRef">
              <v-row>
                <v-col cols="12">
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
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
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
                      :error-messages="errors"> 
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="nombre"
                      label="Nombre Microred Asistencial"
                      color="secondary"
                      outlined=""
                      dense
                      :error-messages="errors"
                      placeholder=" "
                      @keyup.enter="updateMicroredAsistencial()">
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
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
                        @click.native="updateMicroredAsistencial()"
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
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      nombre: '',
      idDiresa: -1,
      idRedAsistencial: -1,
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.microredAsistencialToEdit == null) {
      swal.errorMessage('Microred Asistencial no existe.')
      return
    }
    this.nombre = this.microredAsistencialToEdit.nombre
    this.idDiresa = this.microredAsistencialToEdit.redAsistencial.diresa.idDiresa
    this.idRedAsistencial = this.microredAsistencialToEdit.redAsistencial.idRedAsistencial
    const paramsUrlDiresa = ``
    this.getDiresaData(paramsUrlDiresa)
    const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
    this.getRedAsistencialData(paramsUrlRedAsistencial)
  },

  computed: {
    ...mapState('microredAsistencial', ['microredAsistencialToEdit','isSuccess','guardando']),
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('rulesValidate',['required','requiredId']),

    loading() {
      return this.microredAsistencialToEdit == ''
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },
  },

  methods: {
    ...mapActions('microredAsistencial', ['edit','update']),
    ...mapActions('diresa', ['getDiresaData']),
    ...mapActions('redAsistencial', ['getRedAsistencialData']),

    async onChangeDiresa() {
      this.idRedAsistencial = -1
      const paramsUrlRedAsistencial = `?idDiresa=${this.idDiresa}`
      await this.getRedAsistencialData(paramsUrlRedAsistencial)
    },

    cancelar() {
      this.$router.push({ 
        name: 'ListMicroredAsistencial' 
      })
    },

    async updateMicroredAsistencial() {
      const isValid = await this.$refs.datosMicroredAsistencialRef.validate()
      if (isValid) {
        const params = {
          microredAsistencial: {
            data: {
              nombre: this.nombre,
              idRedAsistencial: this.idRedAsistencial,
            }
          }
        }
        await this.update({ 
          idMicroredAsistencial: this.microredAsistencialToEdit.idMicroredAsistencial, 
          params: params 
        })
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListMicroredAsistencial'
          })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>