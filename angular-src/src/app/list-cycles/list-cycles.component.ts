import { Component, OnInit } from '@angular/core';
import { CycleService } from '../cycle.service';
import { CycleRecord } from '../cycle.data.interface';

@Component({
  selector: 'app-list-cycles',
  templateUrl: './list-cycles.component.html',
  styleUrls: ['./list-cycles.component.css']
})
export class ListCyclesComponent implements  OnInit {
  cycles: CycleRecord[] = [];

  constructor(private cycleService: CycleService) {
  }

  ngOnInit() {
    this.getCycles();
  }

  getCycles() {
    this.cycleService.listAvailableCycles().subscribe((data) => {
      this.cycles = data;
    });
  
    // addToCart(cycleId: number) {
    //   const count = 1; 
    //   this.cycleService.addToCart(cycleId, count).subscribe(
    //     (response) => {
    //       console.log('Added to cart:', response);
    //     },
    //     (error) => {
    //       console.error('Error adding to cart:', error);
    //     }
    //   );
    // }
  }
} 