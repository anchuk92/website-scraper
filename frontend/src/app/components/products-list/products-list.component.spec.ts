import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../core/interfaces';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const mockProducts: Product[] = [
      { title: 'Product 1', description: 'Description 1', price: '10', discount: '0' },
      { title: 'Product 2', description: 'Description 2', price: '20', discount: '5' }
    ];
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));

    component.onLoad();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });
});
