import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    centroAsistencialData: [],
    centroAsistencialToEdit: '',
    pages: -1,
    isSuccess: false,
    guardando: false,
  },

  mutations: {
    SET_CENTRO_ASISTENCIAL_DATA(state: { centroAsistencialData: any }, data: any) {
      state.centroAsistencialData = data
    },

    SET_CENTRO_ASISTENCIAL_TO_EDIT(state: { centroAsistencialToEdit: object }, data: object) {
      state.centroAsistencialToEdit = data
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
    async getCentroAsistencialData({ commit }: any, paramsUrl: string) {
      commit('SET_CENTRO_ASISTENCIAL_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/centroAsistencial${paramsUrl}`, authorization)
        const r = response.data.centroAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_CENTRO_ASISTENCIAL_DATA', data)
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
        const response = await axios.post(getBaseUrlApi()+`/centroAsistencial`, params, authorization)
        const r = response.data.centroAsistencial
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

    async edit({ commit }: any, idCentroAsistencial: string) {
      commit('SET_CENTRO_ASISTENCIAL_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/centroAsistencial?id=${idCentroAsistencial}`, authorization)
        const r = response.data.centroAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || ''
          commit('SET_CENTRO_ASISTENCIAL_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idCentroAsistencial, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/centroAsistencial/${idCentroAsistencial}`, params, authorization)
        const r = response.data.centroAsistencial
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

    setCentroAsistencialData({ commit }: any, data: any) {
      commit('SET_CENTRO_ASISTENCIAL_DATA', data)
    },
  },
}