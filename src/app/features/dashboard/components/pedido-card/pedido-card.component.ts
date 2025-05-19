import { Component, Input } from "@angular/core"
import type { Pedido } from "../../../../shared/models/pedido.model"

@Component({
  selector: "app-pedido-card",
  templateUrl: "./pedido-card.component.html",
  styleUrls: ["./pedido-card.component.scss"],
})
export class PedidoCardComponent {
  @Input() pedido!: Pedido

  agregarPedido(): void {
    console.log("Agregar pedido para cliente:", this.pedido.cliente.telefono)
  }

  editarContacto(): void {
    console.log("Editar contacto:", this.pedido.cliente.telefono)
  }
}
