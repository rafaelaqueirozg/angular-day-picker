import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

interface DaysModel {
  day: number;
  selected?: boolean;
  disabled?: boolean;
}

interface Range {
  initialDay: number;
  finalDay: number;
}

export interface SelectedDaysEmitter {
  selectedDays: number[];
  humanizedSelectedDays: string;
}

@Component({
  selector: 'ng-day-picker',
  templateUrl: './ng-day-picker.component.html',
  styleUrls: ['./ng-day-picker.component.css']
})
export class NgDayPickerComponent implements OnInit {
  @Input()
  range!: Range;

  @Input()
  maxSelectableDays!: number;

  @Input()
  disabledDays: number[] = [];

  @Input()
  required: boolean = false;

  @Input()
  label: string = "Month days";

  @Output()
  selectedDaysEmitter: EventEmitter<SelectedDaysEmitter> = new EventEmitter();

  selectedDays: number[] = [];

  days: DaysModel[] = [];

  isShowingDayPicker = false;

  closedWithoutSelect = false;

  get isInvalid(): boolean {
    return this.required && this.closedWithoutSelect;
  }

  get humanizedSelectedDays(): string {
    let days = "";
    const orderedDays = this.selectedDays.sort((a, b) => a - b);

    const penultimateDay = orderedDays.length - 2;
    const lastDay = orderedDays.length - 1;

    for (let index = 0; index < orderedDays.length; index++) {
      days += ` ${orderedDays[index]}${index === penultimateDay ? " and " : index === lastDay ? "" : ", "
        }`;
    }

    return `Every day ${days}`;
  }

  constructor() { }

  toggleDayPicker(): void {
    this.isShowingDayPicker = !this.isShowingDayPicker;

    if (!this.closedWithoutSelect)
      this.closedWithoutSelect =
        !this.isShowingDayPicker && !this.selectedDays.length;
  }

  selectDay(day: number): void {
    const indexOfDay = this.days.findIndex((element) => element.day === day);

    if (this.selectedDays.includes(day)) {
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
      this.days[indexOfDay].selected = false;
    } else {
      if (this.selectedDays.length !== this.maxSelectableDays) {
        this.selectedDays.push(day);
        this.days[indexOfDay].selected = true;
      }
    }

    this.closedWithoutSelect = !!!this.selectedDays.length;

    this.selectedDaysEmitter.emit({
      selectedDays: this.selectedDays,
      humanizedSelectedDays: this.humanizedSelectedDays,
    });
  }

  ngOnInit(): void {
    if (this.range) {
      const { initialDay, finalDay } = this.range;

      for (let index = initialDay; index <= finalDay; index++) {
        this.days.push({
          day: index,
          selected: false,
          disabled: this.disabledDays.includes(index),
        });
      }
    }
  }
}
