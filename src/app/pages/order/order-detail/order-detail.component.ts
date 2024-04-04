import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

    products: any[] = [];
    total: number = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.data.items.forEach((item: any) => {
            this.productService
                .getProductById(item.productId)
                .subscribe({
                    next: (product: any) => {
                        const productWithQuantity = { ...product, quantity: item.quantity };
                        this.products.push(productWithQuantity);

                        this.total += product.price * item.quantity;
                    },
                    error: (error: any) => {
                        console.error('Error fetching product:', error);
                    }
                });
        });
    }
}
