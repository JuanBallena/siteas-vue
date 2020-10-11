<template>
  <div>
    <v-card
      :loading="loading">
      <v-card-text class="pb-5">
        <TitleCenter
          :text="`HISTORIA CLÍNICA DE ${ paciente }`"
        />
        <hr>
        <v-row>
          <v-col cols="12" lg="3" md="4">
            <ItemIconText icon="far fa-address-card" :text="documento" />
          </v-col>
          <v-col cols="12" lg="9" md="4">
            <ItemIconText icon="far fa-clipboard" :text="numeroHistoriaClinica" />
          </v-col>
          <v-col cols="12" lg="3" md="4">
            <ItemIconText icon="fas fa-mars" :text="sexo" />
          </v-col>
          <v-col cols="12" lg="3" md="4">
            <ItemIconText icon="fas fa-birthday-cake" :text="fechaNacimiento" />
          </v-col>
          <v-col cols="12" lg="6" md="4">
            <ItemIconText icon="fas fa-home" :text="direccion" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="p-0">
        <v-tabs
          show-arrows
          active-class
          v-model="numberTab"
          slider-color="white"
          slider-size="3"
          background-color="blue darken-3"
          dark>
          <v-tab
            v-for="tab in tabsSegunCriterio"
            :class="`tab ${tab.class}`"
            :key="tab.title"
            @click="onChangeTab(tab.routeName)">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
        <v-card flat>
          <v-card-text class="px-5">
            <router-view :datos="datosForTab" />
          </v-card-text>
        </v-card> 
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions } from "vuex"
import * as ls from "@/localStorage/index"
import {
  CRITERIO_NINO,
  CRITERIO_ADOLESCENTE,
  CRITERIO_JOVEN,
  CRITERIO_ADULTO,
  CRITERIO_ADULTO_MAYOR
} from "@/common/historiaClinicaDefinition"
import * as swal from '@/plugins/sweetAlertMessages'
export default {
  data: () => {
    return {
      idRol: parseInt(ls.getIdRol()),
      paciente: '',
      documento: '',
      numeroHistoriaClinica: '',
      sexo: '',
      fechaNacimiento: '',
      direccion: '',
      numberTab: null,
      historia: {},
      datosForTab: {},
      tabs: [],
      radiosAndCantidad: [],
      radios: [],
    }
  },

  async created() {
    await this.getHistoriaClinicaData(this.$route.params.idPaciente)
    if (this.historiaClinicaData.length == 0) {
      swal.errorMessage('Historia Clínica no existe.')
      return
    }
    const historia = this.historiaClinicaData
    this.historia = this.historiaClinicaData
    this.paciente = historia.paciente.nombres +' '+historia.paciente.paterno +' '+ historia.paciente.materno
    this.documento = historia.paciente.tipoDocumento.descripcion +': '+ historia.paciente.documento
    this.numeroHistoriaClinica = historia.historiaClinica
    this.sexo = historia.paciente.sexo.descripcion
    this.fechaNacimiento = historia.paciente.fechaNacimiento
    this.direccion = historia.paciente.direccion
    ls.saveCriterioPaciente(historia.paciente.criterio)
    ls.saveIdPaciente(historia.paciente.idPaciente)
    await this.setTabsSegunCriterio()
    await this.updateNumberTab(this.$route.name)
    await this.setDatosForTab(this.$route.name)
  },

  computed: {
    ...mapState('historiaClinica', ['historiaClinicaData','pages']),

    tabsSegunCriterio() {
      return this.tabs
    },

    loading() {
      return this.pages == -1
    }
  },

  methods: {
    ...mapActions('historiaClinica', ['getHistoriaClinicaData']),

    setTabsSegunCriterio() {
      const criterio = this.historia.paciente.criterio
      switch (criterio) {
        case CRITERIO_NINO:
          this.tabs.push({ title: 'Datos Familiares', routeName: 'DatosFamiliares' })
          this.tabs.push({ title: 'Antec. Perinatales', routeName: 'AntecedentesPerinatales' })
          this.tabs.push({ title: 'Antec. Familiares y Patológicos', routeName: 'AntecedentesFamiliaresYPersonales' })
          this.tabs.push({ title: 'Vacunas', routeName: 'Vacunas' })
          this.tabs.push({ title: 'Control de Crecimiento', routeName: 'ControlDeCrecimiento' })
          this.tabs.push({ title: 'Tamizaje', routeName: 'Tamizaje' })
          this.tabs.push({ title: 'Plan de Atención Integral', routeName: 'PlanDeAtencionIntegral' })
          this.tabs.push({ title: 'Eva. de Alimentación', routeName: 'EvaluacionDeAlimentacion' })
          break;
        case CRITERIO_ADOLESCENTE:
          this.tabs.push({ title: 'Antec. Psicosociales', routeName: 'Psicosociales' })
          this.tabs.push({ title: 'Antec. Familiares y Personales', routeName: 'AntecedentesFamiliaresYPersonales' })
          this.tabs.push({ title: 'Vacunas', routeName: 'Vacunas' })
          this.tabs.push({ title: 'Salud Sexual Reproductiva', routeName: 'SaludSexualReproductiva' })
          this.tabs.push({ title: 'Problemas', routeName: 'Problemas' })
          this.tabs.push({ title: 'Prestaciones de Salud', routeName: 'PrestacionesDeSalud' })
          this.tabs.push({ title: 'Evaluaciones', routeName: 'Evaluaciones' })
          break;
        case CRITERIO_JOVEN:
          this.tabs.push({ title: 'Antec. Psicosociales', routeName: 'Psicosociales' })
          this.tabs.push({ title: 'Antec. Familiares y Personales', routeName: 'AntecedentesFamiliaresYPersonales' })
          this.tabs.push({ title: 'Salud Sexual Reproductiva', routeName: 'SaludSexualReproductiva' })
          this.tabs.push({ title: 'Problemas', routeName: 'Problemas' })
          this.tabs.push({ title: 'Prestaciones de Salud', routeName: 'PrestacionesDeSalud' })
          this.tabs.push({ title: 'Control Preventivo', routeName: 'ControlPreventivo' })
          break;
        case CRITERIO_ADULTO:
          this.tabs.push({ title: 'Antec. Familiares y Personales', routeName: 'AntecedentesFamiliaresYPersonales' })
          this.tabs.push({ title: 'Salud Sexual Reproductiva', routeName: 'SaludSexualReproductiva' })
          this.tabs.push({ title: 'Problemas', routeName: 'Problemas' })
          this.tabs.push({ title: 'Prestaciones de Salud', routeName: 'PrestacionesDeSalud' })
          this.tabs.push({ title: 'Control Preventivo', routeName: 'ControlPreventivo' })
          break;
        case CRITERIO_ADULTO_MAYOR:
          this.tabs.push({ title: 'Antec. Familiares y Personales', routeName: 'AntecedentesFamiliaresYPersonales' })
          this.tabs.push({ title: 'Problemas', routeName: 'Problemas' })
          this.tabs.push({ title: 'Prestaciones de Salud', routeName: 'PrestacionesDeSalud' })
          this.tabs.push({ title: 'Control Preventivo', routeName: 'ControlPreventivo' })
          this.tabs.push({ title: 'Valoración Clínica', routeName: 'ValoracionClinica' })
          break;
        default:
          break;
      }
    },

    updateNumberTab(routeName) {
      this.tabs.forEach(tab => {
        if(tab.routeName == routeName) {
          this.numberTab = this.tabs.indexOf(tab)
          return
        }
      })
    },

    setDatosFamiliares() {
      this.datosForTab = {
        nombreMadre: this.historia.nombreMadre != null ? this.historia.nombreMadre : '',
        fechaNacimientoMadre: this.historia.fechaNacimientoMadre != null ? this.historia.fechaNacimientoMadre : '',
        documentoMadre: this.historia.documentoMadre != null ? this.historia.documentoMadre : '',
        telefonoMadre: this.historia.telefonoMadre != null ? this.historia.telefonoMadre : '',
        ocupacionMadre: this.historia.ocupacionMadre != null ? this.historia.ocupacionMadre : '',
        religionMadre: this.historia.religionMadre != null ? this.historia.religionMadre : '',
        gradoInstruccionMadre: this.historia.gradoInstruccionMadre != null ? this.historia.gradoInstruccionMadre.idParametro : null,
        estadoCivilMadre: this.historia.estadoCivilMadre != null ? this.historia.estadoCivilMadre.idParametro : null,
        
        nombrePadre: this.historia.nombrePadre != null ? this.historia.nombrePadre : '',
        fechaNacimientoPadre: this.historia.fechaNacimientoPadre != null ? this.historia.fechaNacimientoPadre : '',
        documentoPadre: this.historia.documentoPadre != null ? this.historia.documentoPadre : '',
        telefonoPadre: this.historia.telefonoPadre != null ? this.historia.telefonoPadre : '',
        ocupacionPadre: this.historia.ocupacionPadre != null ? this.historia.ocupacionPadre : '',
        religionPadre: this.historia.religionPadre != null ? this.historia.religionPadre : '',
        gradoInstruccionPadre: this.historia.gradoInstruccionPadre != null ? this.historia.gradoInstruccionPadre.idParametro : null,
        estadoCivilPadre: this.historia.estadoCivilPadre != null ? this.historia.estadoCivilPadre.idParametro : null,
        idPaciente: this.historia.paciente.idPaciente,

        historia: this.historia,
        gradoInstruccionMadreDescripcion: this.historia.gradoInstruccionMadre != null ? this.historia.gradoInstruccionMadre.descripcion : null,
        estadoCivilMadreDescripcion: this.historia.estadoCivilMadre != null ? this.historia.estadoCivilMadre.descripcion : null,
        gradoInstruccionPadreDescripcion: this.historia.gradoInstruccionPadre != null ? this.historia.gradoInstruccionPadre.descripcion : null,
        estadoCivilPadreDescripcion: this.historia.estadoCivilPadre != null ? this.historia.estadoCivilPadre.descripcion : null,

      }
    },

    setAntecedentesPerinatales() {
      this.datosForTab = {
        embarazos: this.historia.embarazos,
        partos: this.historia.partos,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setAntecedentesFamiliaresYPersonales() {
      this.datosForTab = {
        antecedentesFamiliares: this.historia.antecedentesFamiliares,
        antecedentesPersonales: this.historia.antecedentesPersonales,
        idHistoriaClinica: this.historia.idHistoriaClinica,
        criterio: this.historia.paciente.criterio,
      }
    },

    setVacunas() {
      this.datosForTab = {
        vacunas: this.historia.vacunas,
        idHistoriaClinica: this.historia.idHistoriaClinica,
        criterio: this.historia.paciente.criterio,
      }
    },

    setControlDeCrecimiento() {
      this.datosForTab = {
        controlesCrecimiento: this.historia.controlesCrecimiento,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setTamizaje() {
      this.datosForTab = {
        tamizajes: this.historia.tamizajes,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setPlanAtencion() {
      this.datosForTab = {
        planesAtencion: this.historia.planesAtencion,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setEvaluacionAlimentacion() {
      this.datosForTab = {
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },
    
    setAntecedentesPsicosociales() {
      this.datosForTab = {
        antecedentesEducativoAdolescente: this.historia.antecedentesEducativoAdolescente,
        antecedentesEducativoJoven: this.historia.antecedentesEducativoJoven,
        antecedentesLaborales: this.historia.antecedentesLaborales,
        antecedentesHabito: this.historia.antecedentesHabito,
        idHistoriaClinica: this.historia.idHistoriaClinica,
        criterio: this.historia.paciente.criterio,
      }
    },
    
    setSaludSexualReproductiva() {
      const criterio = this.historia.paciente.criterio
      switch (criterio) {
        case CRITERIO_ADOLESCENTE:
          this.radiosAndCantidad = [
            { 
              text: 'Abuso sexual',
              value: this.historia.abusoSexual != null ? this.historia.abusoSexual : -1, 
              cantidad: this.historia.abusoSexualCantidad != null ? String(this.historia.abusoSexualCantidad) : '',
            },
            { 
              text: 'Embarazos',
              value: this.historia.embarazo != null ? this.historia.embarazo : -1, 
              cantidad: this.historia.embarazoCantidad != null ? String(this.historia.embarazoCantidad) : '',
            },
            { 
              text: 'Hijos',
              value: this.historia.hijos != null ? this.historia.hijos : -1, 
              cantidad: this.historia.hijosCantidad != null ? String(this.historia.hijosCantidad) : '',
            },
            { 
              text: 'Abortos',
              value: this.historia.aborto != null ? this.historia.aborto : -1, 
              cantidad: this.historia.abortoCantidad != null ? String(this.historia.abortoCantidad) : '',
            },
          ]
          this.radios = [
            { 
              text: 'Usa algún método anticonceptivo', 
              value: this.historia.usaMetodoAnticonceptivo != null ? this.historia.usaMetodoAnticonceptivo : -1,
            },
            { 
              text: 'Sabe como prevenir un embarazo no deseado?', 
              value: this.historia.sabePrevenirEmbarazo != null ? this.historia.sabePrevenirEmbarazo : -1,
            },
            { 
              text: 'Sabe como prevenir la transmición de los ETS', 
              value: this.historia.sabePrevenirEts != null ? this.historia.sabePrevenirEts : -1,
            },
          ]
          this.datosForTab = {
            inicioVidaSexual: this.historia.inicioVidaSexual != null ? String(this.historia.inicioVidaSexual) : '',
            detalles: this.historia.detalles != null ? this.historia.detalles : '',
            radiosAndCantidad: this.radiosAndCantidad,
            radios: this.radios,
            idPaciente: this.historia.paciente.idPaciente,
            criterio: this.historia.paciente.criterio,
            historia: this.historia,
          }
          break;
        case CRITERIO_JOVEN:
          this.radios = [
            { 
              text: 'Eyaculación precoz', 
              value: this.historia.eyaculacionPrecoz != null ? this.historia.eyaculacionPrecoz : -1,
            },
            { 
              text: 'Menarquia', 
              value: this.historia.menarquia != null ? this.historia.menarquia : -1,
            },
            { 
              text: 'Embarazo', 
              value: this.historia.embarazo != null ? this.historia.embarazo : -1,
            },
            { 
              text: 'Aborto', 
              value: this.historia.aborto != null ? this.historia.aborto : -1,
            },
            { 
              text: 'Dolor coital', 
              value: this.historia.dolorCoital != null ? this.historia.dolorCoital : -1,
            },
            { 
              text: 'Anorgasmia', 
              value: this.historia.anorgasmia != null ? this.historia.anorgasmia : -1,
            },
            { 
              text: 'Disfunción eréctil', 
              value: this.historia.disfuncionErectil != null ? this.historia.disfuncionErectil : -1,
            },
          ]
          this.datosForTab = {
            inicioVidaSexual: this.historia.inicioVidaSexual != null ? String(this.historia.inicioVidaSexual) : '',
            nivelTestosterona: this.historia.nivelTestosterona != null ? this.historia.nivelTestosterona : '',
            calidadEsperma: this.historia.calidadEsperma != null ? this.historia.calidadEsperma : '',
            detalles: this.historia.detalles != null ? this.historia.detalles : '',
            radios: this.radios,
            idPaciente: this.historia.paciente.idPaciente,
            criterio: this.historia.paciente.criterio,
            historia: this.historia,
          }
          break;
        case CRITERIO_ADULTO:
          this.radios = [
            { 
              text: 'Embarazo', 
              value: this.historia.embarazo != null ? this.historia.embarazo : -1,
            },
            { 
              text: 'Parto prematuro', 
              value: this.historia.partoPrematuro != null ? this.historia.partoPrematuro : -1,
            },
            { 
              text: 'Aborto', 
              value: this.historia.aborto != null ? this.historia.aborto : -1,
            },
            { 
              text: 'Flujo vaginal patológico', 
              value: this.historia.flujoVaginalPatologico != null ? this.historia.flujoVaginalPatologico : -1,
            },
            { 
              text: 'Dismenorrea', 
              value: this.historia.dismenorrea != null ? this.historia.dismenorrea : -1,
            },
            { 
              text: 'Disfunción eréctil', 
              value: this.historia.disfuncionErectil != null ? this.historia.disfuncionErectil : -1,
            },
          ]
          this.datosForTab = {
            inicioVidaSexual: this.historia.inicioVidaSexual != null ? String(this.historia.inicioVidaSexual) : '',
            nivelTestosterona: this.historia.nivelTestosterona != null ? this.historia.nivelTestosterona : '',
            calidadEsperma: this.historia.calidadEsperma != null ? this.historia.calidadEsperma : '',
            detalles: this.historia.detalles != null ? this.historia.detalles : '',
            radios: this.radios,
            idPaciente: this.historia.paciente.idPaciente,
            hijosCantidad: this.historia.hijosCantidad != null ? String(this.historia.hijosCantidad) : '',
            criterio: this.historia.paciente.criterio,
            historia: this.historia,
          }
          break;
        default:
          break;
      }
    },

    setProblema() {
      this.datosForTab = {
        problemas: this.historia.problemas,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setPrestacionSalud() {
      this.datosForTab = {
        prestacionesSalud: this.historia.prestacionesSalud,
        idHistoriaClinica: this.historia.idHistoriaClinica,
        criterio: this.historia.paciente.criterio,
      }
    },

    setEvaluacion() {
      this.datosForTab = {
        evaluaciones: this.historia.evaluaciones,
        idHistoriaClinica: this.historia.idHistoriaClinica,
      }
    },

    setControlPreventivo() {
      this.datosForTab = {
        controlesPreventivoConsulta: this.historia.controlesPreventivoConsulta,
        controlesPeriodico: this.historia.controlesPeriodico,
        idHistoriaClinica: this.historia.idHistoriaClinica,
        criterio: this.historia.paciente.criterio,
      }
    },

    setValoracionClinica() {
      this.datosForTab = {
        valoracionFuncional: this.historia.valoracionFuncional,
        valoracionMental: this.historia.valoracionMental,
        valoracionSocioFamiliar: this.historia.valoracionSocioFamiliar,
        idPaciente: this.historia.paciente.idPaciente,
        historia: this.historia,
      }
    },

    setDatosForTab(routeName) {
      this.datosForTab = {}
      switch (routeName) {
        case 'DatosFamiliares':
          this.setDatosFamiliares()
          break;
        case 'AntecedentesPerinatales':
          this.setAntecedentesPerinatales()
          break;
        case 'AntecedentesFamiliaresYPersonales':
          this.setAntecedentesFamiliaresYPersonales()
          break;
        case 'Vacunas':
          this.setVacunas()
          break;
        case 'ControlDeCrecimiento':
          this.setControlDeCrecimiento()
          break;
        case 'Tamizaje':
          this.setTamizaje()
          break;
        case 'PlanDeAtencionIntegral':
          this.setPlanAtencion()
          break;
        case 'EvaluacionDeAlimentacion':
          this.setEvaluacionAlimentacion()
          break;
        case 'Psicosociales':
          this.setAntecedentesPsicosociales()
          break;
        case 'SaludSexualReproductiva':
          this.setSaludSexualReproductiva()
          break;
        case 'Problemas':
          this.setProblema()
          break;
        case 'PrestacionesDeSalud':
          this.setPrestacionSalud()
          break;
        case 'Evaluaciones':
          this.setEvaluacion()
          break;
        case 'ControlPreventivo':
          this.setControlPreventivo()
          break;
        case 'ValoracionClinica':
          this.setValoracionClinica()
          break;
        default:
          break;
      }
      Vue.set(this.datosForTab, 'idRol', this.idRol)
    },

    async onChangeTab(routeName) {
      if(this.$route.name == routeName) {
        return
      } else {
        await this.updateNumberTab(routeName)
        await this.setDatosForTab(routeName)
        this.$router.push({ name: routeName })
      }
    },
  }
}
</script>

<style scoped>
.tab {
  text-decoration: none
}
</style>
