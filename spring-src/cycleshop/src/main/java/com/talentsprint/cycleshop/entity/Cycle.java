package com.talentsprint.cycleshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Cycle {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int cycleId;
    
    private int stock;
    private String cycleName;
    private int numBorrowed;
    private int price;
    public  int getNumAvailable() {
        return stock - numBorrowed;
    }


}
