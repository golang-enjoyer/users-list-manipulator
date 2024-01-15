import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputFilter, FilterFormControls, FilterService } from 'src/app/shared';
import { INPUT_FILTERS } from './consts';

@Component({
  selector: 'app-filters-header',
  templateUrl: './filters-header.component.html',
  styleUrls: ['./filters-header.component.scss'],
})
export class FiltersHeaderComponent implements OnInit {
  filterForm!: FormGroup;
  readonly inputFilters: InputFilter[] = INPUT_FILTERS;

  private fb: FormBuilder = inject(FormBuilder);
  private filterService: FilterService = inject(FilterService);

  ngOnInit(): void {
    this.createForm();
  }

  applyFilters(): void {
    this.filterService.updateFilters(this.filterForm.value);
  }

  clearFilters(): void {
    this.createForm();
    this.filterService.clearFilters();
  }

  createForm(): void {
    const formControls: FilterFormControls = {};

    this.inputFilters.forEach((filter) => {
      formControls[filter.label] = this.fb.control('');
    });

    this.filterForm = this.fb.group(formControls);
  }
}
