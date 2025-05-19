import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { PedidosComponent } from "./pedidos.component"
import { SharedModule } from "../../shared/shared.module"

const routes: Routes = [{ path: "", component: PedidosComponent }]

@NgModule({
  declarations: [PedidosComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class PedidosModule {}
