import { Component } from '@angular/core';

@Component({
  selector: 'app-filters-header',
  templateUrl: './filters-header.component.html',
  styleUrls: ['./filters-header.component.scss']
})
export class FiltersHeaderComponent {
  readonly blockHeader: string = "Список экспертов по оценке и руководителей";

  readonly buttonText: string = "Применить фильтры";

  readonly inputFilters: any[] = [{
    label: "ID",
    placeholder: "Введите ID",
    type: "number"
  },
  {
    label: "ФИО",
    placeholder: "Введите ФИО участника",
    type: "string"
  },
  {
    label: "Должность",
    placeholder: "Введите должность участника",
    type: "string"
  },
  {
    label: "Почта (логин)",
    placeholder: "Введите почту участника",
    type: "string"
  },
]
}
