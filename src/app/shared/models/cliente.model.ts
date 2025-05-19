export interface Cliente {
  id: number
  nombre: string
  telefono: string
  direccion: string
  zona: string
  calificacion: number
  totalPedidos: number
  identificado: boolean
  nuevo: boolean
  createdAt: Date
  updatedAt: Date
}
