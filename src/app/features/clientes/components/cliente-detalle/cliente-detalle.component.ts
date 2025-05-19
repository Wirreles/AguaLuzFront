import { Component, type OnInit } from "@angular/core"
import type { ActivatedRoute, Router } from "@angular/router"
import type { ClientesService } from "../../../../shared/services/clientes.service"
import type { PedidosService } from "../../../../shared/services/pedidos.service"
import type { Cliente } from "../../../../shared/models/cliente.model"
import type { Pedido } from "../../../../shared/models/pedido.model"

@Component({
  selector: "app-cliente-detalle",
  templateUrl: "./cliente-detalle.component.html",
  styleUrls: ["./cliente-detalle.component.scss"],
})
export class ClienteDetalleComponent implements OnInit {
  clienteId = 0
  cliente: Cliente | null = null
  pedidos: Pedido[] = []
  loading = false
  error = ""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientesService: ClientesService,
    private pedidosService: PedidosService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.clienteId = +params["id"]
        this.cargarCliente()
        this.cargarPedidosCliente()
      }
    })
  }

  cargarCliente(): void {
    this.loading = true
    this.clientesService.getClientePorId(this.clienteId).subscribe({
      next: (cliente) => {
        this.cliente = cliente
        this.loading = false
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
    })
  }

  cargarPedidosCliente(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos.filter((p) => p.cliente.id === this.clienteId)
      },
      error: (error) => {
        console.error("Error cargando pedidos del cliente", error)
      },
    })
  }

  volver(): void {
    this.router.navigate(["/clientes"])
  }

  editarCliente(): void {
    this.router.navigate([`/clientes/editar/${this.clienteId}`])
  }

  agregarPedido(): void {
    // Implementar lógica para agregar pedido
    console.log("Agregar pedido para cliente:", this.clienteId)
  }
}
