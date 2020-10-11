import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    historiaClinicaData: [],
    isSuccessCreate: false,
    pages: -1,
    responseData: null,
    guardando: false,
  },

  mutations: {
    SET_HISTORIA_CLINICA_DATA(state: { historiaClinicaData: any }, data: any) {
      state.historiaClinicaData = data
    },

    SET_IS_SUCCESS_CREATE(state: { isSuccessCreate: boolean }, value: boolean) {
      state.isSuccessCreate = value
    },

    SET_PAGES(state: { pages: number }, pages: number) {
      state.pages = pages
    },

    SET_RESPONSE_DATA(state: { responseData: object }, data: object) {
      state.responseData = data
    },

    SET_GUARDANDO(state: { guardando: boolean }, value: boolean) {
      state.guardando = value
    },
  },

  actions: {
    async getHistoriaClinicaData({ commit }: any,  idPaciente: any) {
      commit('SET_HISTORIA_CLINICA_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/historiaClinica?idPaciente=${idPaciente}`, authorization)
        const r = response.data.historiaClinica
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_HISTORIA_CLINICA_DATA', data)
          commit('SET_PAGES', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    initState({ commit }: any){
      commit('SET_IS_SUCCESS_CREATE', false)
      commit('SET_RESPONSE_DATA', null)
      commit('SET_GUARDANDO', true)
    },

    async saveDatoFamiliar({ commit, dispatch }: any, { idPaciente, params }: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/datoFamiliar/${idPaciente}`, params, authorization)
        const r = response.data.datoFamiliar
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_RESPONSE_DATA', data)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveEmbarazo({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/embarazo`, params, authorization)
        const r = response.data.embarazo
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveParto({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/parto`, params, authorization)
        const r = response.data.parto
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedenteFamiliar({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedenteFamiliar`, params, authorization)
        const r = response.data.antecedenteFamiliar
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedentePersonal({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedentePersonal`, params, authorization)
        const r = response.data.antecedentePersonal
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveVacuna({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/vacuna`, params, authorization)
        const r = response.data.vacuna
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveControlCrecimiento({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/controlCrecimiento`, params, authorization)
        const r = response.data.controlCrecimiento
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveTamizaje({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/tamizaje`, params, authorization)
        const r = response.data.tamizaje
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async savePlanAtencion({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/planAtencion`, params, authorization)
        const r = response.data.planAtencion
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveEvaluacionAlimentacion({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/evaluacionAlimentacion`, params, authorization)
        const r = response.data.evaluacionAlimentacion
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_RESPONSE_DATA', data)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedenteEducativoAdolescente({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedenteEducativoAdolescente`, params, authorization)
        const r = response.data.antecedenteEducativoAdolescente
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedenteEducativoJoven({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedenteEducativoJoven`, params, authorization)
        const r = response.data.antecedenteEducativoJoven
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedenteLaboral({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedenteLaboral`, params, authorization)
        const r = response.data.antecedenteLaboral
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveAntecedenteHabito({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/antecedenteHabito`, params, authorization)
        const r = response.data.antecedenteHabito
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_RESPONSE_DATA', data)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async updateSaludSexualReproductiva({ commit, dispatch }: any, { idPaciente, params }: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/saludSexualReproductiva/${idPaciente}`, params, authorization)
        const r = response.data.saludSexualReproductiva
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_RESPONSE_DATA', data)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveProblema({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/problema`, params, authorization)
        const r = response.data.problema
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async savePrestacionSalud({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/prestacionSalud`, params, authorization)
        const r = response.data.prestacionSalud
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveEvaluacion({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/evaluacion`, params, authorization)
        const r = response.data.evaluacion
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveControlPreventivoConsulta({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/controlPreventivoConsulta`, params, authorization)
        const r = response.data.controlPreventivoConsulta
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async saveControlPeriodico({ commit, dispatch }: any, params: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/controlPeriodico`, params, authorization)
        const r = response.data.controlPeriodico
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async updateValoracionClinica({ commit, dispatch }: any, { idPaciente, params }: any) {
      dispatch('initState')
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/valoracionClinica/${idPaciente}`, params, authorization)
        const r = response.data.valoracionClinica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_CREATE', true)
          commit('SET_GUARDANDO', false)
        } else {
          commit('SET_GUARDANDO', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  },
}