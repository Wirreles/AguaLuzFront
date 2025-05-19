import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  userRole = ""

  constructor(
    public router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
  }
}
