import { ToastrService } from 'ngx-toastr';
import { ProductsServiceService } from './../../shared/services/products-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  productsCard: any = [];
  currentUser: any;

  constructor(private productService: ProductsServiceService, private notification: ToastrService) { }

  ngOnInit(): void {
    //ShowBag
    this.getProductFromUser()
    const user = localStorage.getItem('loggedUser')
    if (user) {
      this.currentUser = JSON.parse(user)
    }
  }
  getProductFromUser() {
    this.productService.getProductFromCard().subscribe(response => this.productsCard = response)
  }

  buyProducts() {
    this.productService.buyProducts(this.currentUser.id).subscribe(() => {
      this.getProductFromUser()
      this.notification.success('Thank you for your purchase')
    })
  }
}
