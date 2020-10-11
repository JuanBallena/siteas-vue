import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    usuarioxCentroData: [],
    usuarioxCentroToEdit: '',
    pages: -1,
    isSuccessAffiliate: false,
    guardando: false,
  },

  mutations: {
    SET_USUARIO_CENTRO_DATA(state: { usuarioxCentroData: any }, data: any) {
      state.usuarioxCentroData = data
    },

    SET_USUARIO_CENTRO_TO_EDIT(state: { usuarioxCentroToEdit: object }, data: object) {
      state.usuarioxCentroToEdit = data
    },

    SET_PAGES(state: { pages: number }, pages: number) {
      state.pages = pages
    },

    SET_IS_SUCCESS_AFFILIATE(state: { isSuccessAffiliate: boolean }, value: boolean) {
      state.isSuccessAffiliate = value
    },

    CHANGE_STATE_USUARIO_CENTRO(state: { usuarioxCentroData: any }, item: any) {
      state.usuarioxCentroData[item.pos].estado.idParametro = item.estado
      state.usuarioxCentroData[item.pos].estado.descripcion = item.descripcion
    },

    SET_GUARDANDO(state: { guardando: boolean }, value: boolean) {
      state.guardando = value
    },
  },

  actions: {
    async getUsuarioxCentroData({ commit }: any,  paramsUrl: string) {
      commit('SET_USUARIO_CENTRO_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/usuarioxcentro${paramsUrl}`, authorization)
        const r = response.data.usuarioxcentro
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || []
          const pages = r.pages
          commit('SET_USUARIO_CENTRO_DATA', data)
          commit('SET_PAGES', pages)
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async edit({ commit }: any, idUsuarioxCentro: string) {
      commit('SET_USUARIO_CENTRO_TO_EDIT', '')
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/usuarioxcentro?id=${idUsuarioxCentro}`, authorization)
        const r = response.data.usuarioxcentro
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data || ''
          commit('SET_USUARIO_CENTRO_TO_EDIT', data[0])
        }
      } catch(e) {
        const status = e.response.status
        verificarStatusResponse(status)
      }
    },

    async affiliateUser({ commit }: any, params: object) {
      commit('SET_IS_SUCCESS_AFFILIATE', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.post(getBaseUrlApi()+`/usuarioxcentro`, params, authorization)
        const r = response.data.usuarioxcentro
        if (responseCodeIsCero(r.responseCode)) {
          commit('SET_IS_SUCCESS_AFFILIATE', true)
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

    changeStateUsuarioCentro({ commit }: any, item: any) {
      commit('CHANGE_STATE_USUARIO_CENTRO', item)
    },

    setUsuarioCentroData({ commit }: any, data: any) {
      commit('SET_USUARIO_CENTRO_DATA', data)
    },

    setPages({ commit }: any, pages: any) {
      commit('SET_PAGES', pages)
    }
  }
}