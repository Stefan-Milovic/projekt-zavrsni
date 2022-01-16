import { UserService } from './../../shared/services/User.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from './../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetail: any = {};

  constructor(private productService: ProductsServiceService,
    private router: ActivatedRoute, private notification: ToastrService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    console.log(id);

    this.getProductById(id);

  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(response => {
      this.productDetail = response
      console.log(this.productDetail);

    });
  }
  addToCart(id: number) {
    if (!this.userService.loggedUser.id) {
      this.route.navigateByUrl('login')
    }
    this.productService.addToCart(id).subscribe(response => {
      this.notification.success('Successfully added to card');
    })
  }
}
