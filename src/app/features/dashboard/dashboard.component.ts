import { Component, OnInit } from "@angular/core"
import { PedidosService } from "../../shared/services/pedidos.service"
import { ClientesService } from "../../shared/services/clientes.service"
import { Pedido } from "../../shared/models/pedido.model"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  pedidosRecientes: Pedido[] = []
  pedidosFiltrados: Pedido[] = []
  estadisticas = {
    identificados: 0,
    nuevos: 0,
    anonimos: 0,
  }
  filtroActual = "todos"
  currentTime = ""
  currentDate = ""

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
  ) {}

  ngOnInit(): void {
    this.cargarPedidosRecientes()
    this.cargarEstadisticas()
    this.updateDateTime()
    setInterval(() => this.updateDateTime(), 1000)
  }

  updateDateTime(): void {
    const now = new Date()
    this.currentTime = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    this.currentDate = now.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  cargarPedidosRecientes(): void {
    this.pedidosService.getPedidosRecientes().subscribe((pedidos) => {
      this.pedidosRecientes = pedidos
      this.aplicarFiltro(this.filtroActual)
    })
  }

  cargarEstadisticas(): void {
    this.clientesService.getEstadisticasClientes().subscribe((stats) => {
      this.estadisticas = stats
    })
  }

  aplicarFiltro(filtro: string): void {
    this.filtroActual = filtro

    switch (filtro) {
      case "entregados":
        this.pedidosFiltrados = this.pedidosRecientes.filter((p) => p.estado === "entregado")
        break
      case "pendientes":
        this.pedidosFiltrados = this.pedidosRecientes.filter((p) => p.estado === "pendiente")
        break
      default:
        this.pedidosFiltrados = [...this.pedidosRecientes]
        break
    }
  }

  marcarComoEntregado(pedidoId: number): void {
    this.pedidosService.marcarComoEntregado(pedidoId).subscribe(() => {
      this.cargarPedidosRecientes()
    })
  }
}
