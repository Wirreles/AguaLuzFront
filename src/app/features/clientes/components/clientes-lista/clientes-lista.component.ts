import { Component, Input } from "@angular/core"
import type { Router } from "@angular/router"
import type { Cliente } from "../../../../shared/models/cliente.model"

@Component({
  selector: "app-clientes-lista",
  templateUrl: "./clientes-lista.component.html",
  styleUrls: ["./clientes-lista.component.scss"],
})
export class ClientesListaComponent {
  @Input() clientes: Cliente[] = []

  constructor(private router: Router) {}

  verDetalle(clienteId: number): void {
    this.router.navigate([`/clientes/${clienteId}`])
  }

  editarCliente(clienteId: number): void {
    this.router.navigate([`/clientes/editar/${clienteId}`])
  }
}
