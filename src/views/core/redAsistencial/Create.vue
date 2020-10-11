<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto">
        <v-card
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para registrar Red Asistencial" 
            />
            <hr>
            <ValidationObserver ref="datosRedAsistencialRef">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="requiredId" v-slot="{ errors }">
                    <v-select
                      v-model="idDiresa"
                      :items="diresaData"
                      item-text="nombre"
                      dense
                      outlined
                      item-value="idDiresa"
                      color="secondary"
                      :error-messages="errors"
                      label="Diresa"
                      placeholder="Seleccione">
                    </v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="Nombre Red Asistencial"
                      color="secondary"
                      outlined
                      dense
                      :error-messages="errors"
                      v-model="nombre"
                      placeholder=" "
                      @keyup.enter="guardarDatosRedAsistencial()">
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
                        @click.native="guardarDatosRedAsistencial()"
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
    const paramsUrlDiresa = ``
    await this.getDiresaData(paramsUrlDiresa)
  },

  computed: {
    ...mapState('redAsistencial',['isSuccess','guardando']),
    ...mapState('diresa', ['diresaData']),
    ...mapState('rulesValidate',['required','requiredId']),

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('redAsistencial', ['save']),
    ...mapActions('diresa', ['getDiresaData']),
    
    cancelar() {
      this.$router.push({ 
        name: 'ListRedAsistencial'
      })
    },

    async guardarDatosRedAsistencial() {
      const isValid = await this.$refs.datosRedAsistencialRef.validate()
      if (isValid) {
        const params = {
          redAsistencial: {
            data: {
              idDiresa: this.idDiresa,
              nombre: this.nombre,
            }
          }
        }
        await this.save(params)
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListRedAsistencial' 
          })
          swal.successMessage('Se registró correctamente.')
        }
      }
    },
  }
}
</script>