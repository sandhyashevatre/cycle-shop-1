// import { Component } from '@angular/core';
// import { CycleService } from '../cycle.service';
// import { CycleData, CycleRecord } from '../cycle.data.interface';

// @Component({
//   selector: 'app-return',
//   templateUrl: './return.component.html',
//   // styleUrls: ['./return.component.css']
//   styleUrls: ['../list-cycles/list-cycles.component.css']
// })
// export class ReturnComponent {
  
//   returnData: CycleData;
//   returnResult = '';

//   cycles: CycleRecord[] = [];
//   constructor(private cycleService: CycleService) {
//       this.returnData = {
//         id:0,
//         count:0
//       };
//   }

//   ngOnInit(): void {
//     this.getCycles();
//   }

//   getCycles(): void {
//     this.cycleService.listAvailableCycles()
//       .subscribe(cycles => {if (Array.isArray(cycles)) {
//         this.cycles = cycles.filter(item => item.numBorrowed > 0); 
//   }});
//   }

//   returnCycle(cycleId:number, cycleCount:string) {
//     this.returnData.id = cycleId;
//     this.returnData.count = parseInt(cycleCount);
//     this.cycleService.returnCycle(this.returnData).subscribe(
//       (response) => {
//         console.log("response headers below");
//         console.log(response)
//         this.returnResult = 'Cycle returned successfully.';
//         this.ngOnInit();
//       },
//       (error) => {
//         if (error.status === 404) {
//           this.returnResult = 'Cycle not found.';
//         } else {
//           this.returnResult = 'An error occurred.';
//         }
//       }
//     );
//   }
//   totalPrice: number = 0;
//   totalCartPrice : number = 0;
//   total :number =0;

//   calculateTotalPrice() {
//     this.totalPrice = this.cycles.reduce((total, cycle) => {
//       return total + (cycle.numBorrowed * cycle.price);
//     }, 0);
//     console.log('Total Price Calculated:', this.totalPrice);
//   }
  
  
 
// }
