import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { environment } from "../../../environments/environment"
import type { Pedido } from "../models/pedido.model"

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  private apiUrl = `${environment.apiUrl}/pedidos`

  // Datos de ejemplo para desarrollo
  private pedidosMock: Pedido[] = [
    {
      id: 1,
      index: 1,
      cliente: {
        id: 1,
        nombre: "ESCUELA FE Y ALEGRIA",
        telefono: "0983429271",
        direccion: "Olmedo y Cuba - Zona 14",
        zona: "Zona 14",
        calificacion: 3,
        totalPedidos: 13,
        identificado: true,
        nuevo: false,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-05-15"),
      },
      fecha: new Date("2024-05-17"),
      destino: {
        direccion: "ESCUELA FE Y ALEGRIA - Olmedo y Cuba - Zona 14",
        zona: "ZONA 14",
      },
      observaciones: "Portón madera esquina casa",
      horario: "16:11-26",
      estado: "pendiente",
    },
    {
      id: 2,
      index: 2,
      cliente: {
        id: 2,
        nombre: "LEMA M",
        telefono: "0983429271",
        direccion: "San andrés y Atahuallpa - Primavera - Zona 6",
        zona: "Zona 6",
        calificacion: 4,
        totalPedidos: 24,
        identificado: true,
        nuevo: false,
        createdAt: new Date("2023-02-15"),
        updatedAt: new Date("2023-06-20"),
      },
      fecha: new Date("2024-05-17"),
      destino: {
        direccion: "LEMA M - San andrés y Atahuallpa - Primavera - Zona 6",
        zona: "ZONA 6",
      },
      observaciones: "Azul 3P Edificio Portón negro junto a cancha",
      horario: "16:08-16",
      estado: "entregado",
    },
    {
      id: 3,
      index: 3,
      cliente: {
        id: 3,
        nombre: "MIRA MADEIRA",
        telefono: "0985 123548",
        direccion: "SAN ANDRES Y ATAHUALLPA PRIMAVERA",
        zona: "Zona 6",
        calificacion: 5,
        totalPedidos: 8,
        identificado: true,
        nuevo: false,
        createdAt: new Date("2023-03-10"),
        updatedAt: new Date("2023-07-05"),
      },
      fecha: new Date("2024-05-17"),
      destino: {
        direccion: "SAN ANDRES Y ATAHUALLPA PRIMAVERA",
        zona: "ZONA 6",
      },
      observaciones: "Azul 3P Edificio Portón negro junto a cancha",
      horario: "16:08-16",
      estado: "pendiente",
    },
  ]

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    if (environment.useMockData) {
      return of(this.pedidosMock)
    }

    return this.http.get<Pedido[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Error obteniendo pedidos", error)
        return of([])
      }),
    )
  }

  getPedidosRecientes(): Observable<Pedido[]> {
    if (environment.useMockData) {
      return of(this.pedidosMock)
    }

    return this.http.get<Pedido[]>(`${this.apiUrl}/recientes`).pipe(
      catchError((error) => {
        console.error("Error obteniendo pedidos recientes", error)
        return of([])
      }),
    )
  }

  getPedidoPorId(id: number): Observable<Pedido | null> {
    if (environment.useMockData) {
      const pedido = this.pedidosMock.find((p) => p.id === id)
      return of(pedido || null)
    }

    return this.http.get<Pedido>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error obteniendo pedido con id ${id}`, error)
        return of(null)
      }),
    )
  }

  crearPedido(pedido: Omit<Pedido, "id">): Observable<Pedido> {
    if (environment.useMockData) {
      const newPedido = {
        ...pedido,
        id: Math.max(...this.pedidosMock.map((p) => p.id)) + 1,
      }
      this.pedidosMock.push(newPedido)
      return of(newPedido)
    }

    return this.http.post<Pedido>(this.apiUrl, pedido)
  }

  actualizarPedido(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    if (environment.useMockData) {
      const index = this.pedidosMock.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pedidosMock[index] = { ...this.pedidosMock[index], ...pedido }
        return of(this.pedidosMock[index])
      }
      throw new Error(`Pedido con id ${id} no encontrado`)
    }

    return this.http.patch<Pedido>(`${this.apiUrl}/${id}`, pedido)
  }

  eliminarPedido(id: number): Observable<void> {
    if (environment.useMockData) {
      const index = this.pedidosMock.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pedidosMock.splice(index, 1)
        return of(undefined)
      }
      throw new Error(`Pedido con id ${id} no encontrado`)
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  marcarComoEntregado(id: number): Observable<Pedido> {
    if (environment.useMockData) {
      const index = this.pedidosMock.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pedidosMock[index].estado = "entregado"
        return of(this.pedidosMock[index])
      }
      throw new Error(`Pedido con id ${id} no encontrado`)
    }

    return this.http.patch<Pedido>(`${this.apiUrl}/${id}/entregar`, {})
  }
}
