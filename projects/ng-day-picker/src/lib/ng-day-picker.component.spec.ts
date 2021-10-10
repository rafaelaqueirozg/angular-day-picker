import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgDayPickerComponent } from "./ng-day-picker.component";

const range = { initialDay: 1, finalDay: 31 };
const maxSelectableDays = 3;
const disabledDays = [1, 31];

describe("NgDayPickerComponent", () => {
  let component: NgDayPickerComponent;
  let fixture: ComponentFixture<NgDayPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgDayPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDayPickerComponent);
    component = fixture.componentInstance;
    component.range = range;
    component.maxSelectableDays = maxSelectableDays;
    component.disabledDays = disabledDays;

    fixture.detectChanges();
  });

  it("should create the day picker component", () => {
    expect(component).toBeTruthy();
  });

  it("should validate input placeholder", () => {
    const app = fixture.debugElement.nativeElement;

    expect(app.querySelector("small").textContent).toContain(component.label);
    expect(app.querySelector("h3").textContent).toContain(
      "Select at least one day"
    );
  });

  it("should click on input", () => {
    const toggleDayPicker = spyOn(component, "toggleDayPicker");
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();
    expect(toggleDayPicker).toHaveBeenCalled();
  });

  it("should click on input and show day picker", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    expect(component.isShowingDayPicker).toBe(true);

    const dayPicker = app.querySelector(".day-picker");
    expect(dayPicker).toBeTruthy();
  });

  it("should click on input and close without select", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");

    // open day picker
    input.click();
    fixture.detectChanges();

    // close day picker
    input.click();
    fixture.detectChanges();

    expect(component.closedWithoutSelect).toBe(true);
  });

  it("should validate required", () => {
    const app = fixture.debugElement.nativeElement;
    component.required = true;

    const input: HTMLElement = app.querySelector(".input");

    // open day picker
    input.click();
    fixture.detectChanges();

    // close day picker
    input.click();
    fixture.detectChanges();

    expect(component.closedWithoutSelect).toBe(true);
    expect(component.isInvalid).toBe(true);

    const smallMessageValidator = Array.from(
      app.querySelectorAll("small")
    ).find((element: any) =>
      element.textContent?.includes("is required")
    ) as HTMLElement;

    expect(smallMessageValidator.textContent).toContain(
      `${component.label} is required`
    );
  });

  it("should validate the range", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");

    const numberOfDays = numbersBetweenRange(range.initialDay, range.finalDay);

    expect(component.days.length).toEqual(numberOfDays);
    expect(dayGrid.querySelectorAll("button").length).toEqual(numberOfDays);
  });

  it("should display all days of the range", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");

    const numberOfDays = numbersBetweenRange(range.initialDay, range.finalDay);

    for (let index = 0; index < numberOfDays; index++) {
      const day = (index + 1).toString();
      const button = dayGrid.querySelectorAll("button")[index];

      expect(button.textContent?.trim()).toEqual(day);
    }
  });

  it("should validate the maximum selectable days label", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayPicker = app.querySelector(".day-picker");

    expect(dayPicker.querySelector("small").textContent).toContain(
      `Choose up ${maxSelectableDays} days`
    );
  });

  it("should validate the maximum selectable days click", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");
    const buttons = dayGrid.querySelectorAll("button");

    for (let index = 0; index < component.days.length; index++) {
      if (!buttons[index].disabled) {
        buttons[index].click();
      }
    }

    expect(component.selectedDays.length).toEqual(maxSelectableDays);
  });

  it("should validate the selected days", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");
    const buttons = dayGrid.querySelectorAll("button");
    const selectedDays: number[] = [];

    for (let index = 0; index < component.days.length; index++) {
      if (selectedDays.length < maxSelectableDays) {
        if (!buttons[index].disabled) {
          const randomButton = buttons[index];

          randomButton.click();

          selectedDays.push(Number(randomButton.textContent?.trim()));

          fixture.detectChanges();
        }
      } else {
        break;
      }
    }

    for (let index = 0; index < selectedDays.length; index++) {
      expect(selectedDays[index]).toEqual(component.selectedDays[index]);
    }

    fixture.detectChanges();

    expect(component.selectedDays.length).toEqual(selectedDays.length);
    expect(input.querySelector("h3")?.textContent).toContain(
      component.humanizedSelectedDays
    );
  });

  it("should not select a disabled day", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");
    const buttons = Array.from(dayGrid.querySelectorAll("button"));

    for (const day of disabledDays) {
      const disabledDay =
        buttons[
          buttons.findIndex(
            (button) => Number(button.textContent?.trim()) === day
          )
        ];

      disabledDay.click();
    }

    fixture.detectChanges();

    expect(component.selectedDays.length).toEqual(0);
  });

  it("should deselect the selected days", () => {
    const app = fixture.debugElement.nativeElement;

    const input: HTMLElement = app.querySelector(".input");
    input.click();

    fixture.detectChanges();

    const dayGrid: HTMLElement = app.querySelector(".day-grid");
    const buttons = Array.from(dayGrid.querySelectorAll("button"));

    const { selectedDays, maxSelectableDays, days } = component;

    const day = buttons.find((btn) => !btn.disabled);
    day?.click();

    fixture.detectChanges();

    expect(days.find((d) => d.day === Number(day?.textContent))?.selected).toBe(
      true
    );
    expect(selectedDays).toContain(Number(day?.textContent));

    day?.click();
    fixture.detectChanges();
    expect(days.find((d) => d.day === Number(day?.textContent))?.selected).toBe(
      false
    );
    expect(selectedDays.length).toEqual(0);
  });
});

function numbersBetweenRange(
  initialNumber: number,
  finalNumber: number
): number {
  return finalNumber - initialNumber + 1;
}
