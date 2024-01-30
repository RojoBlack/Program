import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ImgComponent } from "../img/img.component";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [CommonModule, ProductComponent, ImgComponent]
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
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
