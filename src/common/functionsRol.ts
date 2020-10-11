import {
  ROL_MEDICO_TRATANTE,
  ROL_MEDICO_ESPECIALISTA
} from "@/common/rolDefinition"

export function puedeEditarHistoriaClinica(idRol: number) {
  return idRol == ROL_MEDICO_TRATANTE || idRol == ROL_MEDICO_ESPECIALISTA
}