import { ProductsServiceService } from './../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products10 = [];
  constructor(private productService: ProductsServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.searchProducts().subscribe((response: any) => this.products10 = response);
  }
}
