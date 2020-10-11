import { logout } from "@/router/routerCommon"
import * as swal from "@/plugins/sweetAlertMessages"

export function verificarStatusResponse(status: number) {
  if (status == 403) {
    swal.infoMessage('Su sesión ha finalizado.')
    logout()
  } else {
    swal.errorMessage('Sucedió un problema inesperado. Contacte al área de sistemas.')
  }
}