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

  ngOnInit(): void {
      this.getCycles();
  }
  getCycles() {
    this.cycleService.listAvailableCycles().subscribe((data) => {
      this.cycles = data;
    });
  
  }
} 