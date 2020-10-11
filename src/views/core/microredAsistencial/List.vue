<template>
  <div>
    <ValidationObserver ref="datosBuscarMicroredAsistencial">
      <v-row>
        <v-col cols="12" md="5">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textToSearch"
              label="Buscar Microred Asistencial"
              outlined
              dense
              placeholder="Escriba..."
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarMicroredAsistencial()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="5">
          <BtnSearch 
            @click.native="buscarMicroredAsistencial()" 
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      title="Registrar Microred Asistencial" 
      @click.native="registrarMicroredAsistencial"
    />
    <hr>
    <Title 
      text="Lista de Microredes Asistenciales"
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="microredAsistencialData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (microredAsistencialData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable 
            icon="fas fa-pen" 
            @click.native="editarMicroredAsistencial(item)"
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
        { text: 'Diresa', value: 'redAsistencial.diresa.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Red Asistencial', value: 'redAsistencial.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Microred Asistencial', value: 'nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
       ],
    }
  },

  async created() {
    await this.onChangePage()
  },

  computed: {
    ...mapState('microredAsistencial', ['microredAsistencialData','pages']),
    ...mapState('rulesValidation', ['min']),

    pageApi(){
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('microredAsistencial', ['getMicroredAsistencialData']),

    registrarMicroredAsistencial() {
      this.$router.push({ 
        name: 'CreateMicroredAsistencial' 
      })
    },

    editarMicroredAsistencial(microredAsistencial) {
      this.$router.push({ 
        name: 'EditMicroredAsistencial', 
        params: { id: microredAsistencial.idMicroredAsistencial }
      })
    },

    async buscarMicroredAsistencial() {
      const isValid = await this.$refs.datosBuscarMicroredAsistencial.validate()
      if (isValid) {
        this.textToSearchAux = this.textToSearch || ''
        const paramsUrlMicroredAsistencial = `?page=${0}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
        await this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
        if (this.microredAsistencialData.length == 0) {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async onChangePage() {
      const paramsUrlMicroredAsistencial = `?page=${this.pageApi}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
      await this.getMicroredAsistencialData(paramsUrlMicroredAsistencial)
    }
  }
}
</script>