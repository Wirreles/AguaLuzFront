import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router, ActivatedRoute } from "@angular/router"
import type { ClientesService } from "../../../../shared/services/clientes.service"

@Component({
  selector: "app-cliente-form",
  templateUrl: "./cliente-form.component.html",
  styleUrls: ["./cliente-form.component.scss"],
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup
  clienteId: number | null = null
  isEditing = false
  loading = false
  submitted = false
  error = ""

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
  ) {
    this.clienteForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      telefono: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ["", Validators.required],
      zona: ["", Validators.required],
      calificacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      identificado: [true],
      nuevo: [false],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.clienteId = +params["id"]
        this.isEditing = true
        this.cargarCliente(this.clienteId)
      }
    })
  }

  cargarCliente(id: number): void {
    this.loading = true
    this.clientesService.getClientePorId(id).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.clienteForm.patchValue(cliente)
        } else {
          this.error = "Cliente no encontrado"
        }
        this.loading = false
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
    })
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.clienteForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
    if (this.clienteForm.invalid) {
      return
    }

    this.loading = true

    if (this.isEditing && this.clienteId) {
      this.clientesService.actualizarCliente(this.clienteId, this.clienteForm.value).subscribe({
        next: () => {
          this.router.navigate(["/clientes"])
        },
        error: (error) => {
          this.error = error
          this.loading = false
        },
      })
    } else {
      this.clientesService.crearCliente(this.clienteForm.value).subscribe({
        next: () => {
          this.router.navigate(["/clientes"])
        },
        error: (error) => {
          this.error = error
          this.loading = false
        },
      })
    }
  }

  cancelar(): void {
    this.router.navigate(["/clientes"])
  }
}
