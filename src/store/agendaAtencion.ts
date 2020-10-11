import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    agendaAtencionData: [],
    agendaAtencionToEdit: '',
    pages: -1,
    isSuccess: false,
    guardando: false,
  },

  mutations: {
    SET_AGENDA_ATENCION_DATA(state: { agendaAtencionData: any }, data: any) {
      state.agendaAtencionData = data
    },

    SET_AGENDA_ATENCION_TO_EDIT(state: { agendaAtencionToEdit: object }, data: object) {
      state.agendaAtencionToEdit = data
    },

    SET_PAGES(state: { pages: number }, pages: number) {
      state.pages = pages
    },

    SET_IS_SUCCESS(state: { isSuccess: boolean }, value: boolean) {
      state.isSuccess = value
    },

    SET_GUARDANDO(state: { guardando: boolean }, value: boolean) {
      state.guardando = value
    },
  },

  actions: {
    async getAgendaAtencionData({ commit }: any,  paramsUrl: string) {
      commit('SET_AGENDA_ATENCION_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/citaMedica${paramsUrl}`, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_AGENDA_ATENCION_DATA', data)
          commit('SET_PAGES', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async save({ commit }: any, params: object) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/citaMedica`, params, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
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

    async edit({ commit }: any, idCitaMedica: any) {
      commit('SET_AGENDA_ATENCION_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/citaMedica?id=${idCitaMedica}`, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data
          commit('SET_AGENDA_ATENCION_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idCitaMedica, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/citaMedica/${idCitaMedica}`, params, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
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

    async updateAgendaAtencionAndFiles({ commit }: any, { idCitaMedica, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/citaMedica/atencionMedica/uploadFile/${idCitaMedica}`, params, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
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

    async deleteFileAgendaAtencion({ commit }: any, { idCitaMedica, indiceFile }: any ) {
      commit('SET_IS_SUCCESS', false)
      const authorization = getAuthorization()
      try {
        const response = await axios.delete(getBaseUrlApi()+`/citaMedica/atencionMedica/deleteFile/${idCitaMedica}/${indiceFile}`, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS', true)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async getCitaData({ commit }: any,  paramsUrl: string) {
      commit('SET_AGENDA_ATENCION_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/citaMedica/consulta${paramsUrl}`, authorization)
        const r = response.data.citaMedica
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_AGENDA_ATENCION_DATA', data)
          commit('SET_PAGES', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    setAgendaAtencionData({ commit }: any, data: any) {
      commit('SET_AGENDA_ATENCION_DATA', data)
    },
  },
}