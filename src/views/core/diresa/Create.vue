<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto">
        <v-card
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para registrar Diresa"
            />
            <hr>
            <ValidationObserver ref="datosDiresaRef">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombre Diresa"
                      color="secondary"
                      outlined
                      dense
                      :error-messages="errors"
                      v-model="nombre"
                      placeholder=" "
                      @keyup.enter="guardarDatosDiresa()">
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
                        @click.native="guardarDatosDiresa()" 
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

  computed: {
    ...mapState('diresa',['isSuccess','guardando']),
    ...mapState('rulesValidate',['required']),

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('diresa', ['save']),
    
    cancelar() {
      this.$router.push({ 
        name: 'ListDiresa' 
      })
    },

    async guardarDatosDiresa() {
      const isValid = await this.$refs.datosDiresaRef.validate()
      if (isValid){
        const params = {
          diresa: {
            data: {
              nombre: this.nombre
            }
          }
        }
        await this.save(params)
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListDiresa' 
          })
          swal.successMessage('Se registró correctamente.')
        }
      }
    },
  }
}
</script>