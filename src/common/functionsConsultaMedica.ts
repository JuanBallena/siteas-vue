import { PARAMETRO_ATENDIDO, 
  PARAMETRO_EN_REVISION, 
  PARAMETRO_PENDIENTE } from "@/common/parametroDefinition"

export function getColorSegunEstadoAtencion(idParametroEstadoAtencion: number) {
  switch (idParametroEstadoAtencion) {
    case PARAMETRO_EN_REVISION:
      return 'yellow darken-2'
    case PARAMETRO_PENDIENTE:
      return 'red'
    case PARAMETRO_ATENDIDO:
      return 'green'
    default:
      break;
  }
}