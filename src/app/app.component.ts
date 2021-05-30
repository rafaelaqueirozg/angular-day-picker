import { Component } from "@angular/core";
import { SelectedDaysEmitter } from "./day-picker/day-picker.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  selectedDays({
    selectedDays,
    humanizedSelectedDays,
  }: SelectedDaysEmitter): void {
    console.log("selectedDays", selectedDays);
    console.log("humanizedSelectedDays", humanizedSelectedDays);
  }
}
