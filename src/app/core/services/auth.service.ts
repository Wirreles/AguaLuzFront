import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, throwError } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"
import { environment } from "../../../environments/environment"
import type { User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser: User | null = null
  private apiUrl = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient) {
    this.loadUserFromStorage()
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.setSession(response.token)
        this.currentUser = response.user
        localStorage.setItem("user", JSON.stringify(response.user))
      }),
      map((response) => response.user),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || "Error en la autenticación"))
      }),
    )
  }

  register(userData: any): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        this.setSession(response.token)
        this.currentUser = response.user
        localStorage.setItem("user", JSON.stringify(response.user))
      }),
      map((response) => response.user),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || "Error en el registro"))
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("user")
    this.currentUser = null
  }

  isAuthenticated(): boolean {
    return Date.now() < this.getExpiration()
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  getUserRole(): string {
    return this.currentUser?.role || ""
  }

  private setSession(token: string): void {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    localStorage.setItem("token", token)
    localStorage.setItem("expires_at", expiresAt.toString())
  }

  private getExpiration(): number {
    const expiration = localStorage.getItem("expires_at")
    return expiration ? Number.parseInt(expiration, 10) : 0
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr)
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
        this.logout()
      }
    }
  }
}
