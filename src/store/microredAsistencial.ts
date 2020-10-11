import axios from 'axios'
//import { baseURL } from "@/api/index";
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    microredAsistencialData: [],
    microredAsistencialToEdit: '',
    pages: -1,
    isSuccess: false,
    guardando: false,
  },

  mutations: {
    SET_MICRORED_ASISTENCIAL_DATA(state: { microredAsistencialData: any }, data: any) {
      state.microredAsistencialData = data
    },

    SET_MICRORED_ASISTENCIAL_TO_EDIT(state: { microredAsistencialToEdit: object }, data: object) {
      state.microredAsistencialToEdit = data
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
    async getMicroredAsistencialData({ commit }: any, paramsUrl: string) {
      commit('SET_MICRORED_ASISTENCIAL_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/microredAsistencial${paramsUrl}`, authorization)
        const r = response.data.microredAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_MICRORED_ASISTENCIAL_DATA', data)
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
        const response = await axios.post(getBaseUrlApi()+`/microredAsistencial`, params, authorization)
        const r = response.data.microredAsistencial
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

    async edit({ commit }: any, idMicroredAsistencial: string) {
      commit('SET_MICRORED_ASISTENCIAL_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/microredAsistencial?id=${idMicroredAsistencial}`, authorization)
        const r = response.data.microredAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || ''
          commit('SET_MICRORED_ASISTENCIAL_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idMicroredAsistencial, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/microredAsistencial/${idMicroredAsistencial}`, params, authorization)
        const r = response.data.microredAsistencial
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

    setMicroredAsistencialData({ commit }: any, data: any) {
      commit('SET_MICRORED_ASISTENCIAL_DATA', data)
    },
  }
}