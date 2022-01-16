import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: 'product.card.component.html',
    styleUrls: ['product.card.component.scss']
})

export class ProductCardComponent implements OnInit {

    @Input() product: any = {
        name: 'Skije',
        price: 724,
        id: 34,
        discount: 24,
        defaultImage: 'https://www.intersport.ba/media/catalog/product/cache/382907d7f48ae2519bf16cd5f39b77f9/a/1/a19420v_rc4_race_jr.jpg'
    }
    constructor(private router: Router) { }

    ngOnInit() { }

    showAllAboutProduct(id: number) {
        this.router.navigateByUrl('/product/' + id)
    }
}