import { Component, OnInit } from '@angular/core';
import { CycleService } from '../cycle.service';
import { CycleData, CycleRecord } from '../cycle.data.interface';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.css']
  //styleUrls: ['../list-cycles/list-cycles.component.css']
})
export class RestockComponent implements OnInit {
  restockData: CycleData;
  restockResult = '';
  cycles: CycleRecord[] = [];
  constructor(private cycleService: CycleService) {
    this.restockData = {
      id:0,
      count:0
    };
  }

  ngOnInit(): void {
    this.getCycles();
  }

  getCycles(): void {
    this.cycleService.listAvailableCycles()
      .subscribe(cycles => this.cycles = cycles);
  }

  restockCycle(cycleId:number, cycleCount:string) {
    this.restockData.id = cycleId;
    this.restockData.count = parseInt(cycleCount);
    
    this.cycleService.restockCycle(this.restockData).subscribe(
      (response) => {
        this.restockResult = 'Cycle restocked successfully.';
        this.ngOnInit();
      },
      (error) => {
        if (error.status === 404) {
          this.restockResult = 'Cycle not found.';
        } else {
          this.restockResult = 'An error occurred.';
        }
      }
    );
  }
}
