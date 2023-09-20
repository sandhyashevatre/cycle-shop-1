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
import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.entity.Items;
import com.talentsprint.cycleshop.entity.User;
// import com.talentsprint.cycleshop.repository.BagRepository;
import com.talentsprint.cycleshop.repository.CartRepository;
import com.talentsprint.cycleshop.repository.CycleRepository;
import com.talentsprint.cycleshop.repository.UserRepository;



@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private BagRepository bagRepository;

    public List<Items> addToCart(int cycleId,int quantity,String name){

        User user = userRepository.findByName(name).get();

        Optional<Cart> cart = cartRepository.findByUser(user);

        List<Items> items = new ArrayList<>();

        Items item = new Items();

            Optional<Cycle> cycle = cycleRepository.findById((long) cycleId);

            cycle.get().setNumBorrowed(cycle.get().getNumBorrowed()+quantity);

            cycleRepository.save(cycle.get());

            if(cycle.isPresent()){

                item.setCycle(cycle.get());

                item.setQuantity(quantity);

            }

        if(cart.isPresent()){

            items = cart.get().getItems().stream().filter(ite -> ite.getCycle().getCycleId()==cycleId).collect(Collectors.toList());

            if(items.size()==0){

                cart.get().getItems().add(item);

            }

            else{

                cart.get().getItems().removeAll(items);

                items.get(0).setQuantity(items.get(0).getQuantity()+quantity);

                cart.get().getItems().addAll(items);

            }

            cartRepository.save(cart.get());  

            items = cart.get().getItems();

        }

        else{

            Cart newCart = new Cart();

            newCart.setUser(user);

            newCart.getItems().add(item);

            cartRepository.save(newCart);

            items = newCart.getItems();

        }

       

        return items;

    }
    public String removeFromCart(int cycleId,int quantity,String name){
        User user = userRepository.findByName(name).get();
        Optional<Cart> cart = cartRepository.findByUser(user);
        Items item = new Items();
            Optional<Cycle> cycle = cycleRepository.findById((long) cycleId);
            if(cycle.isPresent()){
                item.setCycle(cycle.get());
                item.setQuantity(quantity);
            }
            else{
                return "Cycle not present";
            }
        if(cart.isPresent()){
            cart.get().getItems().remove(item);
            return "Removed From Cart";
        }
        else{
            return "Cart Empty";
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

}