import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

// Core Components
import { NavbarComponent } from "./core/components/navbar/navbar.component"
import { SidebarComponent } from "./core/components/sidebar/sidebar.component"
import { FooterComponent } from "./core/components/footer/footer.component"
import { LoginComponent } from "./core/auth/login/login.component"
import { RegisterComponent } from "./core/auth/register/register.component"

// Feature Modules
import { DashboardModule } from "./features/dashboard/dashboard.module"
import { ClientesModule } from "./features/clientes/clientes.module"
import { ZonasModule } from "./features/zonas/zonas.module"
import { DistribuidoresModule } from "./features/distribuidores/distribuidores.module"
import { PedidosModule } from "./features/pedidos/pedidos.module"
import { HistorialLlamadasModule } from "./features/historial-llamadas/historial-llamadas.module"

// Shared Module
import { SharedModule } from "./shared/shared.module"

@NgModule({
  declarations: [AppComponent, NavbarComponent, SidebarComponent, FooterComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    DashboardModule,
    ClientesModule,
    ZonasModule,
    DistribuidoresModule,
    PedidosModule,
    HistorialLlamadasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
