import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';
import { CartItem } from '../cart-item'; // Import the CartItem interface

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private cycleService: CycleService) {}
  cartItems: CartItem[] = [];

  ngOnInit(): void {
   
    this.getCartItems();
  }

getCartItems() {
  this.cycleService.getAllCartItems().subscribe(
      (cartItems) => {
        console.log(cartItems);
        this.cartItems = cartItems;
      },
      (error) => {
        console.error('Error getting cart items:', error);
      }
    );
}

removeItemsFromCart(cycleId: number) {
  this.cycleService.removeFromCart(cycleId, 1).subscribe(
    (response) => {
      console.log('Removed from cart:', response);
      this.ngOnInit();
    },
    (error) => {
      console.error('Error removing', error);
    }
  );
}

totalPrice : number = 0;
calculateTotalPrice() {
  this.totalPrice = this.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.cycle.price,
    0
  );
}

checkout() {
  this.cycleService.checkout().subscribe(
    (response) => {
      console.log('Checkout successful', response);

      this.ngOnInit();
    },
    (error) => {
      console.error('Error during checkout', error);
    }
  );
  }
}
