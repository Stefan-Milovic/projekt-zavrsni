import { ProductsServiceService } from './../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products10 = [];
  categories: any = [];
  activeCategory: number = 0;

  constructor(private productService: ProductsServiceService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getCategories() {
    this.productService.getCategories().subscribe(
      response => {
        this.categories = response;
      }
    )
  }
  getProducts() {
    this.productService.searchProducts().subscribe((response: any) => this.products10 = response);
  }
  filterByCategory(category: any) {
    this.activeCategory = category.id;
    this.productService.searchProducts({ category_id: category.id }).subscribe((response: any) => this.products10 = response);
  }

}
