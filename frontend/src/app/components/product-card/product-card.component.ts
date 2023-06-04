import {Component, Input} from '@angular/core';
import {Product} from "../../core/interfaces";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product: Product;

}
