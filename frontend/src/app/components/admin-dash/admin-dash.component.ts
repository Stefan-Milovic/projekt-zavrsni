import { ProductsServiceService } from './../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {
  //default users
  active = 'products';

  number_of_products: number = 0;
  constructor(private productService: ProductsServiceService) { }

  ngOnInit(): void {
    this.productService.productsCount().subscribe((response: any) => this.number_of_products = response['number_of_products'])
  }

}
