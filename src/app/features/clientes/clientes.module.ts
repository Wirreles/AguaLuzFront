import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Routes } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { ClientesComponent } from "./clientes.component"
import { ClienteFormComponent } from "./components/cliente-form/cliente-form.component"
import { ClientesListaComponent } from "./components/clientes-lista/clientes-lista.component"
import { ClienteDetalleComponent } from "./components/cliente-detalle/cliente-detalle.component"
import { SharedModule } from "../../shared/shared.module"

const routes: Routes = [
  { path: "", component: ClientesComponent },
  { path: "nuevo", component: ClienteFormComponent },
  { path: "editar/:id", component: ClienteFormComponent },
  { path: ":id", component: ClienteDetalleComponent },
]

@NgModule({
  declarations: [ClientesComponent, ClienteFormComponent, ClientesListaComponent, ClienteDetalleComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
})
export class ClientesModule {}
