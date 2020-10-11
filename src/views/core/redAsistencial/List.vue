<template>
  <div>
    <ValidationObserver ref="datosBuscarRedAsistencialRef">
      <v-row>
        <v-col cols="12" md="5">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textToSearch"
              label="Buscar Red Asistencial"
              outlined
              dense
              placeholder="Escriba..."
              :error-messages="errors"
              clearable
              color="secondary"
              @keyup.enter="buscarRedAsistencial()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="5">
          <BtnSearch 
            @click.native="buscarRedAsistencial()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      title="Registrar Red Asistencial" 
      @click.native="registrarRedAsistencial()"
    />
    <hr>
    <Title 
      text="Lista de Redes Asistenciales"
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="redAsistencialData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (redAsistencialData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable 
            icon="fas fa-pen" 
            @click.native="editarRedAsistencial(item)"
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
        { text: 'Diresa', value: 'diresa.nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Red Asistencial', value: 'nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
       ],
    }
  },

  async created() {
    await this.onChangePage()
  },

  computed: {
    ...mapState('redAsistencial', ['redAsistencialData','pages']),
    ...mapState('rulesValidation', ['min']),
    
    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('redAsistencial', ['getRedAsistencialData']),

    registrarRedAsistencial() {
      this.$router.push({ 
        name: 'CreateRedAsistencial' 
      })
    },

    editarRedAsistencial(redAsistencial) {
      this.$router.push({ 
        name: 'EditRedAsistencial', 
        params: { id: redAsistencial.idRedAsistencial }
      })
    },

    async buscarRedAsistencial() {
      const isValid = await this.$refs.datosBuscarRedAsistencialRef.validate()
      if (isValid) {
        this.textToSearchAux = this.textToSearch || ''
        const paramsUrlRedAsistencial = `?page=${0}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
        await this.getRedAsistencialData(paramsUrlRedAsistencial)
        if (this.redAsistencialData.length == 0) {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async onChangePage() {
      const paramsUrlRedAsistencial = `?page=${this.pageApi}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
      await this.getRedAsistencialData(paramsUrlRedAsistencial)
    }
  }
}
</script>