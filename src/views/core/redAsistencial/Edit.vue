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
              text="Formulario para actualizar Red Asistencial"
            />
            <hr>
            <ValidationObserver ref="datosRedAsistencialRef">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="idDiresa"
                      :items="diresaData"
                      dense
                      outlined
                      item-text="nombre"
                      item-value="idDiresa"
                      :error-messages="errors"
                      label="Diresa"
                      color="secondary"
                      placeholder="Seleccione">
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombre Red Asistencial"
                      color="secondary"
                      outlined=""
                      dense
                      :error-messages="errors"
                      v-model="nombre"
                      placeholder=" "
                      @keyup.enter="updateRedAsistencial()">
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
                        @click.native="updateRedAsistencial()"
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
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.redAsistencialToEdit == null) {
      swal.errorMessage('Red Asistencial no existe.')
      return
    }
    this.nombre = this.redAsistencialToEdit.nombre
    this.idDiresa = this.redAsistencialToEdit.diresa.idDiresa
    const paramsUrlDiresa = ``
    this.getDiresaData(paramsUrlDiresa)
  },

  computed: {
    ...mapState('redAsistencial', ['redAsistencialToEdit','isSuccess','guardando']),
    ...mapState('diresa', ['diresaData']),
    ...mapState('rulesValidate',['required','requiredId']),

    loading() {
      return this.redAsistencialToEdit == ''
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },
  },

  methods: {
    ...mapActions('redAsistencial', ['edit','update']),
    ...mapActions('diresa', ['getDiresaData']),

    cancelar() {
      this.$router.push({ 
        name: 'ListRedAsistencial' 
      })
    },

    async updateRedAsistencial() {
      const isValid = await this.$refs.datosRedAsistencialRef.validate()
      if (isValid) {
        const params = {
          redAsistencial: {
            data: {
              nombre: this.nombre,
              idDiresa: this.idDiresa,
            }
          }
        }
        await this.update({ 
          idRedAsistencial: this.redAsistencialToEdit.idRedAsistencial, 
          params: params 
        })
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListRedAsistencial' 
          })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>