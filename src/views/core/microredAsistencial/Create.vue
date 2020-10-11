<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto">
        <v-card
          class="px-1"
          width="100%">
          <v-card-text>
            <TitleCenter 
              text="Formulario para registrar Microred Asistencial"
            />
            <hr>
            <ValidationObserver ref="datosMicroredAsistencialRef">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="idDiresa"
                    :items="diresaData"
                    dense
                    outlined
                    item-text="nombre"
                    item-value="idDiresa"
                    color="secondary"
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
                      dense
                      outlined
                      no-data-text="Sin opciones"
                      item-text="nombre"
                      color="secondary"
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
                      label="Nombre Microred Asistencial"
                      color="secondary"
                      outlined
                      dense
                      :error-messages="errors"
                      v-model="nombre"
                      placeholder=" "
                      @keyup.enter="guardarDatosMicroredAsistencial()">
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
                        @click.native="guardarDatosMicroredAsistencial()"
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
    this.setRedAsistencialData([])
    const paramsUrlDiresa = ``
    await this.getDiresaData(paramsUrlDiresa)
  },

  computed: {
    ...mapState('microredAsistencial',['isSuccess','guardando']),
    ...mapState('diresa', ['diresaData']),
    ...mapState('redAsistencial', ['redAsistencialData']),
    ...mapState('rulesValidate',['required','requiredId']),

    deshabilitado() {
      return this.guardando
    },

    buttonTitle() {
      return this.guardando ? 'Guardando...' : 'Guardar'
    },
  },

  methods: {
    ...mapActions('microredAsistencial', ['save']),
    ...mapActions('diresa', ['getDiresaData']),
    ...mapActions('redAsistencial', ['getRedAsistencialData','setRedAsistencialData']),

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

    async guardarDatosMicroredAsistencial() {
      const isValid = await this.$refs.datosMicroredAsistencialRef.validate()
      if (isValid) {
        const params = {
          microredAsistencial: {
            data: {
              idRedAsistencial: this.idRedAsistencial,
              nombre: this.nombre,
            }
          }
        }
        await this.save(params)
        if (this.isSuccess) {
          this.$router.push({ 
            name: 'ListMicroredAsistencial' 
          })
          swal.successMessage('Se registró correctamente.')
        }
      }
    },
  }
}
</script>