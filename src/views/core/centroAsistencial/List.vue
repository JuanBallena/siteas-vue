<template>
  <div>
    <ValidationObserver ref="datosBuscarCentroAsistencialRef">
      <v-row>
        <v-col cols="12" md="5">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textToSearch"
              label="Buscar Centro Asistencial"
              outlined
              placeholder="Escriba..."
              dense
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarCentroAsistencial()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="5">
          <BtnSearch @click.native="buscarCentroAsistencial()" />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      title="Registrar Centro Asistencial" 
      @click.native="registrarCentroAsistencial()" 
    />
    <hr>
    <Title 
      text="Lista de Centros Asistenciales" 
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="centroAsistencialData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (centroAsistencialData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable 
            icon="fas fa-pen" 
            @click.native="editarCentroAsistencial(item)"
          />
        </template>
      </v-data-table>
    </v-card>
    <br>
    <v-pagination
      class="text-center"
      color="secondary"
      v-model="page"
      :length="pages"
      :total-visible="6"
      @input="onChangePage">
    </v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      page: 1,
      itemsPerPage: 20,
      textToSearch: '',
      textToSearchAux: '',
      headers: [
        { text: '#', value: 'number', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Diresa', value: 'microredAsistencial.redAsistencial.diresa.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Red Asistencial', value: 'microredAsistencial.redAsistencial.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Microred Asistencial', value: 'microredAsistencial.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Centro Asistencial', value: 'nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
       ],
    }
  },

  async created() {
    await this.onChangePage()
  },

  computed: {
    ...mapState('centroAsistencial', ['centroAsistencialData','pages']),
    ...mapState('rulesValidation', ['min']),

    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('centroAsistencial', ['getCentroAsistencialData']),

    registrarCentroAsistencial() {
      this.$router.push({ 
        name: 'CreateCentroAsistencial' 
      })
    },

    editarCentroAsistencial(centroAsistencial) {
      this.$router.push({ 
        name: 'EditCentroAsistencial', 
        params: { id: centroAsistencial.idCentroAsistencial }
      })
    },

    async buscarCentroAsistencial() {
      const isValid = await this.$refs.datosBuscarCentroAsistencialRef.validate()
      if (isValid) {
        this.textToSearchAux = this.textToSearch || ''
        const paramsUrlCentroAsistencial = `?page=${0}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
        await this.getCentroAsistencialData(paramsUrlCentroAsistencial)
        if (this.centroAsistencialData.length == 0) {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async onChangePage(){
      const paramsUrlCentroAsistencial = `?page=${this.pageApi}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
      await this.getCentroAsistencialData(paramsUrlCentroAsistencial)
    }
  }
}
</script>