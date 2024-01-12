import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent {
  @Input() inputLabel!: string;
  @Input() inputType!: "text" | "number";
  @Input() inputPlaceholder!: string;
}
