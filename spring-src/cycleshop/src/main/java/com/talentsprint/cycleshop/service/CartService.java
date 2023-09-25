package com.talentsprint.cycleshop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.annotations.Bag;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.talentsprint.cycleshop.entity.Cart;
import com.talentsprint.cycleshop.entity.Checkout;
import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.entity.Items;
import com.talentsprint.cycleshop.entity.User;
import com.talentsprint.cycleshop.repository.CartRepository;
import com.talentsprint.cycleshop.repository.CycleRepository;
import com.talentsprint.cycleshop.repository.UserRepository;
import com.talentsprint.cycleshop.repository.checkOutRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private checkOutRepository checkOutRepository;

    public List<Items> addToCart(int cycleId, int quantity, String name) {
        User user = userRepository.findByName(name).orElseThrow(() -> new RuntimeException("User not found"));
            Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    
        Cycle cycle = cycleRepository.findById((long) cycleId).orElseThrow(() -> new RuntimeException("Cycle not found"));
    
        Optional<Items> existingItem = cart.getItems().stream()
                .filter(item -> item.getCycle().getCycleId() == cycleId)
                .findFirst();
    
        if (existingItem.isPresent()) {
            Items item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            Items newItem = new Items();
            newItem.setCycle(cycle);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }
    
        cycle.setNumBorrowed(cycle.getNumBorrowed() + quantity);
        cycleRepository.save(cycle);
    
        cartRepository.save(cart);
    
        return cart.getItems();
    }
    

    public List<Items> removeFromCart(int cycleId, int quantity, String name) {
        User user = userRepository.findByName(name).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Cart> cartOptional = cartRepository.findByUser(user);
    
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            List<Items> cartItems = cart.getItems();
    
            Optional<Items> itemToRemoveOptional = cartItems.stream()
                    .filter(item -> item.getCycle().getCycleId() == cycleId)
                    .findFirst();
    
            if (itemToRemoveOptional.isPresent()) {
                Items item = itemToRemoveOptional.get();
    
                int currentQuantity = item.getQuantity();
                if (quantity <= 0 || quantity > currentQuantity) {
                    throw new RuntimeException("Invalid quantity to remove from the cart.");
                }
    
                if (quantity == currentQuantity) {
                    cartItems.remove(item);
                } else {
                    item.setQuantity(currentQuantity - quantity);
                }
    
                Cycle cycle = item.getCycle();
                cycle.setNumBorrowed(cycle.getNumBorrowed() - quantity);
                cycleRepository.save(cycle);
    
                cartRepository.save(cart);
    
                return cart.getItems(); // Return the updated list of items in the cart.
            } else {
                throw new RuntimeException("Cycle not found in the cart.");
            }
        } else {
            throw new RuntimeException("Cart Empty");
        }
    }
    

    public List<Items> getAllCartItems(String name) {
        User user = userRepository.findByName(name).orElse(null);
        if (user != null) {
            Optional<Cart> cart = cartRepository.findByUser(user);
            if (cart.isPresent()) {
                return cart.get().getItems();
            }
        }
        return new ArrayList<>();
    }

    public List<Items> checkOut(String name) {

        User user = userRepository.findByName(name).get();
        Optional<Cart> cart = cartRepository.findByUser(user);
        List<Items> listItems = new ArrayList<>();
        if (cart.isPresent()) {
            Optional<Checkout> checkout = checkOutRepository.findByUser(user);
            if (checkout.isPresent()) {
                checkout.get().getItems().addAll(cart.get().getItems());
                checkout.get().setTotalPrice(addTotalPrice(cart.get()));
                listItems = checkout.get().getItems();
                checkOutRepository.save(checkout.get());
            }

            else {
                Checkout newCheckout = new Checkout();
                newCheckout.setUser(user);
                newCheckout.getItems().addAll(cart.get().getItems());
                listItems = newCheckout.getItems();
                checkOutRepository.save(newCheckout);
            }

            cartRepository.delete(cart.get());
            return listItems;

        }
        return null;

    }

    private int addTotalPrice(Cart cart) {
        System.out.println(cart.getItems());
        List<Items> item = cart.getItems();
        int total_price = 0;
        for (Items i : item) {
            int temp_price = i.getQuantity() * i.getCycle().getPrice();
            total_price = total_price + temp_price;
        }
        System.out.println(total_price);
        return total_price;
    }

}