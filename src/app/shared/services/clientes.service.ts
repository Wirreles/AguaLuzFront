import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { environment } from "../../../environments/environment"
import type { Cliente } from "../models/cliente.model"

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  private apiUrl = `${environment.apiUrl}/clientes`

  // Datos de ejemplo para desarrollo
  private clientesMock: Cliente[] = [
    {
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
    {
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
    {
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
  ]

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    if (environment.useMockData) {
      return of(this.clientesMock)
    }

    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Error obteniendo clientes", error)
        return of([])
      }),
    )
  }

  getClientePorId(id: number): Observable<Cliente | null> {
    if (environment.useMockData) {
      const cliente = this.clientesMock.find((c) => c.id === id)
      return of(cliente || null)
    }

    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error obteniendo cliente con id ${id}`, error)
        return of(null)
      }),
    )
  }

  getClientePorTelefono(telefono: string): Observable<Cliente | null> {
    if (environment.useMockData) {
      const cliente = this.clientesMock.find((c) => c.telefono === telefono)
      return of(cliente || null)
    }

    return this.http.get<Cliente>(`${this.apiUrl}/telefono/${telefono}`).pipe(
      catchError((error) => {
        console.error(`Error obteniendo cliente con teléfono ${telefono}`, error)
        return of(null)
      }),
    )
  }

  crearCliente(cliente: Omit<Cliente, "id" | "createdAt" | "updatedAt">): Observable<Cliente> {
    if (environment.useMockData) {
      const newCliente = {
        ...cliente,
        id: Math.max(...this.clientesMock.map((c) => c.id)) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.clientesMock.push(newCliente)
      return of(newCliente)
    }

    return this.http.post<Cliente>(this.apiUrl, cliente)
  }

  actualizarCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    if (environment.useMockData) {
      const index = this.clientesMock.findIndex((c) => c.id === id)
      if (index !== -1) {
        this.clientesMock[index] = {
          ...this.clientesMock[index],
          ...cliente,
          updatedAt: new Date(),
        }
        return of(this.clientesMock[index])
      }
      throw new Error(`Cliente con id ${id} no encontrado`)
    }

    return this.http.patch<Cliente>(`${this.apiUrl}/${id}`, cliente)
  }

  eliminarCliente(id: number): Observable<void> {
    if (environment.useMockData) {
      const index = this.clientesMock.findIndex((c) => c.id === id)
      if (index !== -1) {
        this.clientesMock.splice(index, 1)
        return of(undefined)
      }
      throw new Error(`Cliente con id ${id} no encontrado`)
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  getEstadisticasClientes(): Observable<{ identificados: number; nuevos: number; anonimos: number }> {
    if (environment.useMockData) {
      return of({
        identificados: 57,
        nuevos: 3,
        anonimos: 0,
      })
    }

    return this.http
      .get<{ identificados: number; nuevos: number; anonimos: number }>(`${this.apiUrl}/estadisticas`)
      .pipe(
        catchError((error) => {
          console.error("Error obteniendo estadísticas de clientes", error)
          return of({ identificados: 0, nuevos: 0, anonimos: 0 })
        }),
      )
  }
}
