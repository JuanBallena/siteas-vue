<template>
  <div>
    <ValidationObserver ref="datosBuscarDiresaRef">
      <v-row>
        <v-col cols="12" md="5">
          <ValidationProvider rules="min:3" v-slot="{ errors }">
            <v-text-field
              v-model="textToSearch"
              label="Buscar Diresa"
              outlined
              dense
              :error-messages="errors"
              clearable
              placeholder="Escriba..."
              color="secondary"
              @keyup.enter="buscarDiresa()">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="5">
          <BtnSearch 
            @click.native="buscarDiresa()"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <BtnCreate 
      title="Registrar Diresa" 
      @click.native="registrarDiresa()" 
    />
    <hr>
    <Title 
      text="Lista de Diresas" 
    />
    <v-card
      :loading="loading"
      max-width="100%" 
      class="mx-auto mt-5">
      <v-data-table
        :headers="headers"
        :items="diresaData"
        class="elevation-1"
        :items-per-page="itemsPerPage"
        no-data-text="Sin registros"
        no-results-text="Sin coincidencias"
        hide-default-footer>
        <template v-slot:item.number="{ item }">
          {{ itemsPerPage * pageApi + (diresaData.indexOf(item) + 1) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <IconActionTable 
            icon="fas fa-pen" 
            @click.native="editarDiresa(item)"
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
        { text: 'Diresa', value: 'nombre', align: 'left', sortable: false, class: 'primary--text' },
        { text: 'Acciones', value: 'actions', align: 'left', sortable: false, class: 'primary--text' },
      ],
    }
  },

  async created() {
    await this.onChangePage()
  },

  computed: {
    ...mapState('diresa', ['diresaData','pages']),
    ...mapState('rulesValidation', ['min']),

    pageApi() {
      return this.page - 1
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('diresa', ['getDiresaData']),

    registrarDiresa() {
      this.$router.push({ 
        name: 'CreateDiresa' 
      })
    },

    editarDiresa(diresa) {
      this.$router.push({ 
        name: 'EditDiresa', 
        params: { id: diresa.idDiresa }
      })
    },

    async buscarDiresa() {
      const isValid = await this.$refs.datosBuscarDiresaRef.validate()
      if (isValid) {
        this.textToSearchAux = this.textToSearch || ''
        const paramsUrlDiresa = `?page=${0}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
        await this.getDiresaData(paramsUrlDiresa)
        if(this.diresaData.length == 0) {
          swal.infoMessage('No se encontraron resultados')
        }
      }
    },

    async onChangePage() {
      const paramsUrlDiresa = `?page=${this.pageApi}&size=${this.itemsPerPage}&nombre=${this.textToSearchAux}`
      await this.getDiresaData(paramsUrlDiresa)
    }
  }
}
</script>