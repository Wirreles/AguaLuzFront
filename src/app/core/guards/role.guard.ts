import { Injectable } from "@angular/core"
import type { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import type { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data["roles"] as Array<string>

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const userRole = this.authService.getUserRole()

    if (requiredRoles.includes(userRole)) {
      return true
    }

    this.router.navigate(["/dashboard"])
    return false
  }
}
