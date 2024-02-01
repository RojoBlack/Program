import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ImgComponent } from "../img/img.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [CommonModule, ProductComponent, ImgComponent, HttpClientModule]
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    title: '',
    image: '',
    price: 0,
    description: '',
    category: '',
    rating: {
      rate: 0,
      count: 0
    }
  }
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() {

  }

  ngOnInit(): void {

  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

}
