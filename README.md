# 📆 Angular Day-Picker

Angular Day-Picker is a simple and customizable day picker component built with Angular.

<p align="center">
  <img heigt="650" width="650" src="https://user-images.githubusercontent.com/42815135/120120288-a0044900-c172-11eb-89ab-ac55711af558.gif">
</p>

# 📌 Live demo

See it in action, check out the [demo page](https://angular-day-picker.stackblitz.io).

# 🚀 Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Angular (v12.0.2)](https://angular.io/)
- [Scss](https://sass-lang.com/)
- [Jasmine](https://jasmine.github.io/)

# ⛏ Tools

- [Visual Studio Code](https://code.visualstudio.com/)
- [Karma](https://karma-runner.github.io/latest/index.html)


Or edit on [Stackblitz](https://stackblitz.com/edit/angular-day-picker?file=src/app/day-picker/day-picker.component.ts).

# 💻 Usage

Install this lib

```bash
npm i --save ng-day-picker
```

In your module:

```typescript
import { NgDayPickerModule } from 'ng-day-picker'

@NgModule({
  imports: [
    NgDayPickerModule
  ]
})
```

In your component:

```typescript
import { Component } from "@angular/core";

import { SelectedDaysEmitter } from "ng-day-picker";

@Component({
  selector: "app",
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
```

In your HTML:

```html
<ng-day-picker
  [label]="'Your label here'"
  [range]="{ initialDay: 1, finalDay: 31 }"
  [required]="true"
  [disabledDays]="[1, 31]"
  [maxSelectableDays]="5"
  (selectedDaysEmitter)="selectedDays($event)"
></ng-day-picker>
```

# 🤝 Contributions

Feel free to contribute. Suggestions, bugs reports or new features are always welcome.

# 📔 License

This project is under the [MIT LICENSE](https://github.com/rafaela-queiroz/angular-day-picker/blob/master/LICENSE).

# ✨ Acknowledgment

I want to thank my friend [Diego](https://github.com/DiguyaDeveloper) for all the support and sugestions on this project; to my mentor [Danilo](https://github.com/danilocontini) for the tips and encouragement; to me for never giving up, always looking to learn and evolve; and to everyone who supports me directly or indirectly.

<h2 align="center">Made with ❤️ by <a href="https://www.linkedin.com/in/rafaelaqueiroz21/">Rafaela Queiroz</a></h2>
