package com.talentsprint.cycleshop.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.talentsprint.cycleshop.entity.Checkout;
import com.talentsprint.cycleshop.entity.User;



public interface checkOutRepository extends CrudRepository<Checkout,Integer>{

    Optional<Checkout> findByUser(User user);
    
}