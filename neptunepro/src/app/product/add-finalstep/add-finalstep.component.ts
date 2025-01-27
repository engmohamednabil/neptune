import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/IProduct';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductStore } from '../../store/product.store';

@Component({
  selector: 'app-add-finalstep',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-finalstep.component.html',
  styleUrl: './add-finalstep.component.scss'
})
export class AddFinalstepComponent {

  product!: IProduct | null;
  constructor(private router: Router, private productStore: ProductStore) {}

  ngOnInit() {
    
    if (this.productStore.product()) {
      this.product = this.productStore.product();
      console.log('titleOnly: '+ this.product?.ProductName);
    }
  }
  
  saveAndClose() {  
    let existing = localStorage.getItem('products');
    let products: IProduct[] = [];
      if (existing) {
        
        products = JSON.parse(existing);
        if (this.product) {
          products.push(this.product);
          localStorage.setItem('products', JSON.stringify(products));
        }
      }

    this.productStore.removeProduct();
    this.router.navigate(['/product']);
  }

}
