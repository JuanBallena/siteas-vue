import axios from 'axios'
//import { getBaseUrlApi() } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    redAsistencialData: [],
    redAsistencialToEdit: '',
    pages: -1,
    isSuccess: false,
    guardando: false,
  },

  mutations: {
    SET_RED_ASISTENCIAL_DATA(state: { redAsistencialData: any }, data: any) {
      state.redAsistencialData = data
    },

    SET_RED_ASISTENCIAL_TO_EDIT(state: { redAsistencialToEdit: object }, data: object) {
      state.redAsistencialToEdit = data
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
    async getRedAsistencialData({ commit }: any, paramsUrl: string) {
      commit('SET_RED_ASISTENCIAL_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/redAsistencial${paramsUrl}`, authorization)
        const r = response.data.redAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_RED_ASISTENCIAL_DATA', data)
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
        const response = await axios.post(getBaseUrlApi()+`/redAsistencial`, params, authorization)
        const r = response.data.redAsistencial
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

    async edit({ commit }: any, idRedAsistencial: string) {
      commit('SET_RED_ASISTENCIAL_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/redAsistencial?id=${idRedAsistencial}`, authorization)
        const r = response.data.redAsistencial
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || ''
          commit('SET_RED_ASISTENCIAL_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async update({ commit }: any, { idRedAsistencial, params }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/redAsistencial/${idRedAsistencial}`, params, authorization)
        const r = response.data.redAsistencial
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

    setRedAsistencialData({ commit }: any, data: any) {
      commit('SET_RED_ASISTENCIAL_DATA', data)
    },
  }
}