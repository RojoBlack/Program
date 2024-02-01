import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductComponent } from "../product/product.component";
import { CommonModule, NgForOf } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [ProductComponent, NgForOf, CommonModule, HttpClientModule]
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
