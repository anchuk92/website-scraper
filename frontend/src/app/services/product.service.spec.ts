import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../core/interfaces';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve products from the server', () => {
    const mockProducts: Product[] = [
      { title: 'Product 1', description: 'Description 1', price: '10', discount: '0' },
      { title: 'Product 2', description: 'Description 2', price: '20', discount: '5' }
    ];

    service.getProducts().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/scrape');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should have the correct structure for Product interface', () => {
    const product: Product = { title: 'Product 1', description: 'Description 1', price: '10', discount: '0' };

    expect(product.title).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.price).toBeDefined();
    expect(product.discount).toBeDefined();
  });

});
