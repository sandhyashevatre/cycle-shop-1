package com.talentsprint.cycleshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.talentsprint.cycleshop.entity.Cart;
import com.talentsprint.cycleshop.entity.User;

public interface CartRepository extends JpaRepository<Cart,Long>{

    Optional<Cart> findByUser(User user);
    
}
