import { Component, Input } from "@angular/core"

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.scss"],
})
export class EstadisticasComponent {
  @Input() identificados = 0
  @Input() nuevos = 0
  @Input() anonimos = 0
  @Input() currentTime = ""
  @Input() currentDate = ""
}
