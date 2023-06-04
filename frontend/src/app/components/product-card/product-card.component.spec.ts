import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../core/interfaces';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product data', () => {
    const mockProduct: Product = {
      title: 'Product 1',
      description: 'Description 1',
      price: '10',
      discount: '0'
    };
    component.product = mockProduct;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h4');
    const descriptionElement = fixture.nativeElement.querySelector('p');
    const priceElement = fixture.nativeElement.querySelector('h4.mb-1.me-1');
    const discountElement = fixture.nativeElement.querySelector('h5 span.badge');

    expect(titleElement.textContent).toContain(mockProduct.title);
    expect(descriptionElement.textContent).toContain(mockProduct.description);
    expect(priceElement.textContent).toContain(mockProduct.price);
    expect(discountElement.textContent).toContain(mockProduct.discount);
  });
});
