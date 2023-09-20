import { Component, OnInit } from '@angular/core';
import { CycleService } from '../cycle.service';  
import { CycleData, CycleRecord } from '../cycle.data.interface';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  // styleUrls: ['./borrow.component.css']
  styleUrls: ['../list-cycles/list-cycles.component.css']
})
export class BorrowComponent implements OnInit {
  cartData: CycleData;
  borrowResult = '';
  cycles: CycleRecord[] = [];
  
  constructor(private cycleService: CycleService) {
    this.cartData = {
      id:0,
      count:0
    };
  }

  ngOnInit(): void {
    this.getCycles();

  }

  getCycles(): void {
    this.cycleService.listAvailableCycles()
      .subscribe(cycles => 
        {this.cycles = cycles.filter(item => item.numAvailable > 0);} 
        );

  }

  addCart(cycleId:number, cycleCount:string) {
    this.cartData.id = cycleId;
    this.cartData.count = parseInt(cycleCount);
    this.cycleService.addToCart(this.cartData.id, this.cartData.count).subscribe(
      (response) => {
        console.log('Added to cart:', response);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
      
    );
    
  }
}
