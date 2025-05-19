import { Component, type OnInit } from "@angular/core"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  userRole = ""

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
  }
}
