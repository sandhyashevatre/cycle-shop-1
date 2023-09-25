import { Component } from '@angular/core';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-remove-from-cart',
  templateUrl: './remove-from-cart.component.html',
  styleUrls: ['./remove-from-cart.component.css']
})
export class RemoveFromCartComponent {
  constructor(private cycleService: CycleService) {}

  removeItemsFromCart(cycleId: number, quantity: number) {
    this.cycleService.removeFromCart(cycleId, quantity).subscribe(
      (response) => {
        console.log('Removed from cart:', response);
      },
      
    );
  }
}
