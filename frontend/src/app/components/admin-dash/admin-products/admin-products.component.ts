import { ToastrService } from 'ngx-toastr';
import { ProductsServiceService } from './../../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  categories: any = [];
  types: any = [];
  newProduct: any = { category_id: -1, type: -1 };
  products: any = [];

  constructor(private productsService: ProductsServiceService,
    private notification: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getType();
  }
  saveProduct() {
    if (!this.newProduct.name) { this.notification.info('Name is required for this field'); return; } else if (!this.newProduct.price) { this.notification.info('Price is required for this field'); return; }
    else if (!this.newProduct.defaultImage) {
      this.notification.info('Image is required for this field');
      return;
    } else if (!this.newProduct.description) { this.notification.info('Description is required for this field'); return; }
    this.productsService.createProduct(this.newProduct).subscribe(
      result => {
        this.notification.success('Successfully added attachment');
        this.getProducts();
        this.clearFields();
      },
      err => {
        this.notification.error('Unsuccessfully added attachment');
      }
    )
  };
  getProducts() {
    this.productsService.searchProducts().subscribe(response => this.products = response);
  }
  getCategories() {
    this.productsService.getCategories().subscribe(
      response => {
        this.categories = response;
      }
    )
  }


  clearFields() {
    this.newProduct = { category_id: -1, type: -1 };
  }

  deleteProduct(id: number) {
    console.log(id);
    this.productsService.deleteProduct(id).subscribe((response: any) => {
      this.notification.success(response.msg)
      this.getProducts();
    })

  }
  editProduct(item: any) {
    this.newProduct = { ...item };
    console.log(item);


  }
  updateProduct() {
    this.productsService.updateProduct(this.newProduct.id, this.newProduct).subscribe((response: any) => {
      this.getProducts()
      this.notification.success(response.msg)
    })
  }
  getType() {

    this.productsService.getType().subscribe(
      response => {
        this.types = response;

      }
    )
  }

}
