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
  borrowData: CycleData;
  borrowResult = '';
  cycles: CycleRecord[] = [];
  
  constructor(private cycleService: CycleService) {
    this.borrowData = {
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

  borrowCycle(cycleId:number, cycleCount:string) {
    this.borrowData.id = cycleId;
    this.borrowData.count = parseInt(cycleCount);
    this.cycleService.borrowCycle(this.borrowData).subscribe(
      (response) => {
        this.borrowResult = 'Cycle borrowed successfully.';
        this.ngOnInit();
      },
      (error) => {
        if (error.status === 404) {
          this.borrowResult = 'Cycle not found.';
        } else if (error.status === 400) {
          this.borrowResult = 'Insufficient stock.';
        } else {
          this.borrowResult = 'An error occurred.';
        }
      }
    );
  }
}
