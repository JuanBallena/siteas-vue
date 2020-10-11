import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    consultaMedicaData: [],
    successCreateConsulta: false,
    successUpdateConsulta: false,
    pages: -1,
    guardandoConsultaMedica: false,
  },

  mutations: {
    SET_CONSULTA_MEDICA_DATA(state: { consultaMedicaData: any }, data: any) {
      state.consultaMedicaData = data
    },

    SET_SUCCESS_CREATE_CONSULTA(state: { successCreateConsulta: boolean }, value: boolean) {
      state.successCreateConsulta = value
    },

    SET_SUCCESS_UPDATE_CONSULTA(state: { successUpdateConsulta: boolean }, value: boolean) {
      state.successUpdateConsulta = value
    },

    SET_PAGES(state: { pages: number }, pages: number) {
      state.pages = pages
    },

    SET_GUARDANDO_CONSULTA_MEDICA(state: { guardandoConsultaMedica: boolean }, value: boolean) {
      state.guardandoConsultaMedica = value
    },
  },

  actions: {
    async getConsultaMedicaData({ commit }: any, paramsUrl: string) {
      commit('SET_CONSULTA_MEDICA_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/consultaMedica${paramsUrl}`, authorization)
        const r = response.data.consultaMedica
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_CONSULTA_MEDICA_DATA', data)
          commit('SET_PAGES', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async save({ commit }: any, params: object) {
      commit('SET_SUCCESS_CREATE_CONSULTA', false)
      commit('SET_GUARDANDO_CONSULTA_MEDICA', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/consultaMedica`, params, authorization)
        const r = response.data.consultaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_SUCCESS_CREATE_CONSULTA', true)
          commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        } else {
          commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idConsultaMedica, params }: any ) {
      commit('SET_SUCCESS_UPDATE_CONSULTA', false)
      commit('SET_GUARDANDO_CONSULTA_MEDICA', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/consultaMedica/${idConsultaMedica}`, params, authorization)
        const r = response.data.consultaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_SUCCESS_UPDATE_CONSULTA', true)
          commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        } else {
          commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        }
      } catch(e) {
        commit('SET_GUARDANDO_CONSULTA_MEDICA', false)
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },
  }
}