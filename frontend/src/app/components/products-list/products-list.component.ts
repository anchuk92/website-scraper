import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../core/interfaces";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent {

  public products: Product[];

  constructor(private productService: ProductService) {
  }

  onLoad() {
    this.productService.getProducts().subscribe(data => {
      this.products = data
    });
  }

}
