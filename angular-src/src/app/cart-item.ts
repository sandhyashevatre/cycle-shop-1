import { CycleData, CycleRecord } from "./cycle.data.interface";

export interface CartItem {
    id: number;
    cycle: CycleRecord;
    quantity: number;
  }
