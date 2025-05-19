import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { FormsModule } from "@angular/forms"

import { DashboardComponent } from "./dashboard.component"
import { PedidoCardComponent } from "./components/pedido-card/pedido-card.component"
import { EstadisticasComponent } from "./components/estadisticas/estadisticas.component"
import { PedidosListaComponent } from "./components/pedidos-lista/pedidos-lista.component"
import { SharedModule } from "../../shared/shared.module"

const routes: Routes = [{ path: "", component: DashboardComponent }]

@NgModule({
  declarations: [DashboardComponent, PedidoCardComponent, EstadisticasComponent, PedidosListaComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
