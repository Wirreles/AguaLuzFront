import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Pedido } from "../../../../shared/models/pedido.model"

@Component({
  selector: "app-pedidos-lista",
  templateUrl: "./pedidos-lista.component.html",
  styleUrls: ["./pedidos-lista.component.scss"],
})
export class PedidosListaComponent {
  @Input() pedidos: Pedido[] = []
  @Output() marcarEntregado = new EventEmitter<number>()

  toggleEstado(pedidoId: number): void {
    this.marcarEntregado.emit(pedidoId)
  }
}
