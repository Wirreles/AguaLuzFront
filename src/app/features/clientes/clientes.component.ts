import { Component, type OnInit } from "@angular/core"
import type { ClientesService } from "../../shared/services/clientes.service"
import type { Cliente } from "../../shared/models/cliente.model"

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []
  clientesFiltrados: Cliente[] = []
  terminoBusqueda = ""

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes()
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.clientes = clientes
      this.filtrarClientes()
    })
  }

  filtrarClientes(): void {
    if (!this.terminoBusqueda) {
      this.clientesFiltrados = [...this.clientes]
      return
    }

    const termino = this.terminoBusqueda.toLowerCase()
    this.clientesFiltrados = this.clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(termino) ||
        cliente.telefono.includes(termino) ||
        cliente.direccion.toLowerCase().includes(termino),
    )
  }

  buscar(evento: Event): void {
    this.terminoBusqueda = (evento.target as HTMLInputElement).value
    this.filtrarClientes()
  }
}
