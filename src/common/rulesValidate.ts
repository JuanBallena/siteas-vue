export function validarNumeroEntero(event: any, value: string, length: number) {
  const keyCode = (event.keyCode ? event.keyCode : event.which)
  if ((keyCode < 48 || keyCode > 57)) {
    event.preventDefault()
  }
  if (value.length >= length ) {
    event.preventDefault()
  }
}

export function validarNumeroDecimal(event: any, value: string, length: number) {
  const keyCode = (event.keyCode ? event.keyCode : event.which)
  if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || value.indexOf('.') != -1)) {
    event.preventDefault()
  }
  if (value.length >= length ) {
    event.preventDefault()
  }
}