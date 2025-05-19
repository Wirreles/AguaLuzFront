import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  activeLink = "inicio"
  currentTime = ""
  currentDate = ""

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.updateDateTime()
    setInterval(() => this.updateDateTime(), 1000)

    // Set active link based on current route
    const currentUrl = this.router.url
    if (currentUrl.includes("clientes")) {
      this.activeLink = "clientes"
    } else if (currentUrl.includes("zonas")) {
      this.activeLink = "zonas"
    } else if (currentUrl.includes("distribuidores")) {
      this.activeLink = "distribuidores"
    } else if (currentUrl.includes("historial-llamadas")) {
      this.activeLink = "historial-llamadas"
    } else {
      this.activeLink = "inicio"
    }
  }

  updateDateTime(): void {
    const now = new Date()
    this.currentTime = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    this.currentDate = now.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  setActiveLink(link: string): void {
    this.activeLink = link
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
