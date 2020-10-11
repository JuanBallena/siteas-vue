
export function getFechaActual() {
  const date = new Date();
  const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  const fechaActual = isoDate.substr(0, 10)
  return fechaActual
}

export function getHoraActual() {
  const horaActual = new Date().toLocaleTimeString('es-PE')
  return horaActual
}