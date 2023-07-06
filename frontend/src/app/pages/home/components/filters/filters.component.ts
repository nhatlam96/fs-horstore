import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { application } from 'express';
import { Subscription } from 'rxjs';
import { StoreService } from 'app/services/store.service';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() setFilters = new EventEmitter<{ min: number, max: number, favorite: boolean }>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;
  selectedNumber: number = 1;
  selectedNumber2: number = 100;
  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  minValue: number = 0;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  checkCheckbox() {
    const checkbox = document.getElementById('flexCheckChecked') as HTMLInputElement;
    this.router.navigate(['/home']);

    this.onSetFilters(this.minValue, this.maxValue, checkbox.checked);

  }

  onItemsUpdated(count: number): void {
    console.log(count);
  }

  go(): void {
    console.log("min:", this.minValue, "max: ", this.maxValue);
  }
  onSetFilters(min: number, max: number, favorite: boolean): void {
    this.setFilters.emit({ min, max, favorite });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}

