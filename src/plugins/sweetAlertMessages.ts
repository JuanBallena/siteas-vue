import Swal from 'sweetalert2'

export function welcomeMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: 'BIENVENIDO  A  SITEA',
  })
}

export function successMessage(text: any) {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: `${text}`,
  })
}

export function infoMessage(text: any) {
  Swal.fire({
    icon: 'info',
    title: 'Información',
    text: `${text}`,
  })
}

export function errorMessage(text: any) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: `${text}`,
  })
}

export function confirm(text: any) {
  return Swal.fire({
    title: 'Confirmar',
    text: `${text}`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if(result.value){
      return result.value
    }
  })
}