import type { Cliente } from "./cliente.model"

export interface Pedido {
  id: number
  index: number
  cliente: Cliente
  fecha: Date
  destino: {
    direccion: string
    zona: string
  }
  observaciones: string
  horario: string
  estado: "pendiente" | "entregado"
}
