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
              text="Formulario para actualizar Diresa"
            />
            <hr>
            <ValidationObserver ref="datosDiresaRef">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombre Diresa"
                      color="secondary"
                      outlined=""
                      dense
                      :error-messages="errors"
                      v-model="nombre"
                      placeholder=" "
                      @keyup.enter="updateDiresa()">
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
                        @click.native="updateDiresa()"
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
    }
  },

  async created() {
    await this.edit(this.$route.params.id)
    if (this.diresaToEdit == null) {
      swal.errorMessage('Diresa no existe.')
      return
    }
    this.nombre = this.diresaToEdit.nombre
  },

  computed: {
    ...mapState('diresa', ['diresaToEdit','isSuccess','guardando']),
    ...mapState('rulesValidate',['required','requiredId']),

    loading() {
      return this.diresaToEdit == ''
    },

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Actualizando...' : 'Actualizar'
    },
  },

  methods: {
    ...mapActions('diresa', ['edit','update']),

    cancelar() {
      this.$router.push({ 
        name: 'ListDiresa'
      })
    },

    async updateDiresa() {
      const isValid = await this.$refs.datosDiresaRef.validate()
      if (isValid) {
        const params = {
          diresa: {
            data: {
              nombre: this.nombre
            }
          }
        }
        await this.update({ idDiresa: this.diresaToEdit.idDiresa, params: params })
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListDiresa' 
          })
          swal.successMessage('Se actualizó correctamente.')
        }
      }
    },
  }
}
</script>