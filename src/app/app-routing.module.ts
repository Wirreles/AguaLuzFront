import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { LoginComponent } from "./core/auth/login/login.component"
import { RegisterComponent } from "./core/auth/register/register.component"
import { AuthGuard } from "./core/guards/auth.guard"
import { RoleGuard } from "./core/guards/role.guard"

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    loadChildren: () => import("./features/dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: "clientes",
    loadChildren: () => import("./features/clientes/clientes.module").then((m) => m.ClientesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "zonas",
    loadChildren: () => import("./features/zonas/zonas.module").then((m) => m.ZonasModule),
    canActivate: [AuthGuard],
  },
  {
    path: "distribuidores",
    loadChildren: () => import("./features/distribuidores/distribuidores.module").then((m) => m.DistribuidoresModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["coordinador"] },
  },
  {
    path: "pedidos",
    loadChildren: () => import("./features/pedidos/pedidos.module").then((m) => m.PedidosModule),
    canActivate: [AuthGuard],
  },
  {
    path: "historial-llamadas",
    loadChildren: () =>
      import("./features/historial-llamadas/historial-llamadas.module").then((m) => m.HistorialLlamadasModule),
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/dashboard" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
