package com.talentsprint.cycleshop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.exception.CycleNotFoundException;
import com.talentsprint.cycleshop.exception.CycleShopBusinessException;
import com.talentsprint.cycleshop.exception.InsufficientStockException;
import com.talentsprint.cycleshop.exception.InvalidReturnCountException;
import com.talentsprint.cycleshop.repository.CycleRepository;

@Service
public class CycleService {
    @Autowired
    private CycleRepository cycleRepository;

    public List<Cycle> listCycles() {
        var listFromDB = cycleRepository.findAll();
        var cycleList = new ArrayList<Cycle>();
        listFromDB.forEach(cycleList::add);
        return cycleList;
    }

    public List<Cycle> listAvailableCycles() {
        return listCycles()
        .stream()
        .filter(cycle -> cycle.getNumAvailable() > 0)
        .collect(Collectors.toList());
    }

    public Cycle findByIdOrThrow404(long id) {
        var optCycle = cycleRepository.findById(id);
        if (optCycle.isEmpty()) {
            throw new CycleShopBusinessException(
                String.format("Can't find the cycle with id %d in the DB",
                id));
        }
        return optCycle.get();
    }

    public void borrowCycle(long id, int count) {
//        var cycle = findByIdOrThrow404(id);
//        cycle.setNumBorrowed(cycle.getNumBorrowed() + count);
//        cycleRepository.save(cycle);        
        try {
            var cycle = findByIdOrThrow404(id);
            int availableStock = cycle.getStock() - cycle.getNumBorrowed();
            
            if (availableStock >= count) {
                cycle.setNumBorrowed(cycle.getNumBorrowed() + count);
                cycleRepository.save(cycle);
            } else {
                throw new InsufficientStockException();
            }
        } catch (CycleNotFoundException e) {
            throw e; // Rethrow the exception for better exception handling elsewhere
        }
    }

    public void returnCycle(long id, int count) {
//        var cycle = findByIdOrThrow404(id);
//        cycle.setNumBorrowed(cycle.getNumBorrowed() - count);
//        cycleRepository.save(cycle);
        try {
            var cycle = findByIdOrThrow404(id);
            int borrowedCount = cycle.getNumBorrowed();
            
            if (borrowedCount >= count) {
                cycle.setNumBorrowed(borrowedCount - count);
                cycleRepository.save(cycle);
            } else {
                throw new InvalidReturnCountException();
            }
        } catch (CycleNotFoundException e) {
            throw e; // Rethrow the exception for better exception handling elsewhere
        }
    }

    public void borrowCycle(long id) {
        borrowCycle(id, 1);
    }

    public void returnCycle(long id) {
        returnCycle(id, 1);
    }

    public void restockBy(long id, int count) {
        var cycle = findByIdOrThrow404(id);
        cycle.setStock(cycle.getStock() + count);
        cycleRepository.save(cycle);
    }

}
