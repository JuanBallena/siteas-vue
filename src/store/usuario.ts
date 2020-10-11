import axios from 'axios'
//import { baseURL } from "@/api/index"
import { getAuthorization, responseCodeIsCero } from "@/api/secutity"
import { verificarStatusResponse } from "@/errors/functions"
import { getBaseUrlApi } from "@/prototype/index"

export default {
  namespaced: true,
  
  state: {
    usuarioData: [],
    usuarioToEdit: '',
    pages: -1,
    isSuccess: false,
    guardando: false,
  },

  mutations: {
    SET_USUARIO_DATA(state: { usuarioData: any }, data: any) {
      state.usuarioData = data
    },

    SET_USUARIO_TO_EDIT(state: { usuarioToEdit: object }, data: object) {
      state.usuarioToEdit = data
    },

    SET_PAGES(state: { pages: number }, pages: number) {
      state.pages = pages
    },

    SET_IS_SUCCESS(state: { isSuccess: boolean }, value: boolean) {
      state.isSuccess = value
    },

    CHANGE_STATE_USUARIO(state: { usuarioData: any }, item: any) {
      state.usuarioData[item.pos].estado.idParametro = item.estado
      state.usuarioData[item.pos].estado.descripcion = item.descripcion
    },

    SET_GUARDANDO(state: { guardando: boolean }, value: boolean) {
      state.guardando = value
    },
  },

  actions: {
    async getUsuarioData({ commit }: any,  paramsUrl: string) {
      commit('SET_USUARIO_DATA', [])
      commit('SET_PAGES', -1)
      const authorization = getAuthorization()
      try {
        const response = await axios.get(getBaseUrlApi()+`/usuario${paramsUrl}`, authorization)
        const r = response.data.usuario
        if (responseCodeIsCero(r.responseCode)) {
          const data = r.data
          const pages = r.pages
          commit('SET_USUARIO_DATA', data)
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
        const response = await axios.post(getBaseUrlApi()+`/usuario`, params, authorization)
        const r = response.data.usuario
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

    async update({ commit }: any, { idUsuario, params  }: any ) {
      commit('SET_IS_SUCCESS', false)
      commit('SET_GUARDANDO', true)
      const authorization = getAuthorization()
      try {
        const response = await axios.put(getBaseUrlApi()+`/usuario/${idUsuario}`, params, authorization)
        const r = response.data.usuario
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

    changeStateUsuario({ commit }: any, item: any) {
      commit('CHANGE_STATE_USUARIO', item)
    },

    setUsuarioData({ commit }: any, data: any) {
      commit('SET_USUARIO_DATA', data)
    },
  }
}