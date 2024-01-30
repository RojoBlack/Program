import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductComponent } from "../product/product.component";
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [ProductComponent, NgForOf]
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: "https://picsum.photos/300",
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      image: "https://picsum.photos/301",
      price: 200
    },
    {
      id: '3',
      name: 'Product 3',
      image: "https://picsum.photos/302",
      price: 300
    },
    {
      id: '4',
      name: 'Product 4',
      image: "https://picsum.photos/303",
      price: 400
    }
  ]

  onAddToShoppingCart(product: Product) {
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

}
