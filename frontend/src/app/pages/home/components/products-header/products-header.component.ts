import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {
  [x: string]: any;
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Input() max_product: number = 0;
  itemsShowCount = 12;
  sort = 'asc';
  selectedNumber: number = 1;

  constructor() { }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount = count;
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }
  onSliderChange() {
    // Logique à exécuter lorsque la valeur du curseur change
    // Vous pouvez ajouter du code supplémentaire ici selon vos besoins
    console.log('Nouvelle valeur sélectionnée :', this.selectedNumber);
  }

  moveLeft() {
    if (this.selectedNumber > 1) {
      this.selectedNumber--;
    }
  }

  moveRight() {
    if (this.selectedNumber < 20) {
      this.selectedNumber++;
    }
  }
}