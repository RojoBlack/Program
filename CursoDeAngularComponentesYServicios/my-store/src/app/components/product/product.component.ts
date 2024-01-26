import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }

  constructor() {

  }

  ngOnInit(): void {

  }

}
