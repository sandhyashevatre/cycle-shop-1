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
// import com.talentsprint.cycleshop.repository.BagRepository;
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

    public List<Items> checkOut(String name){

        User user = userRepository.findByName(name).get();
        Optional<Cart> cart = cartRepository.findByUser(user);
        List<Items> items = new ArrayList<>();
        if(cart.isPresent()){
            Optional<Checkout> checkout = checkOutRepository.findByUser(user);
            if(checkout.isPresent()){
                checkout.get().getItems().addAll(cart.get().getItems());
                checkout.get().setTotalPrice(addTotalPrice(cart.get()));
                items = checkout.get().getItems();
                checkOutRepository.save(checkout.get());
            }

            else{
                Checkout checkout2 = new Checkout();
                checkout2.setUser(user);
                checkout2.getItems().addAll(cart.get().getItems());
                items = checkout2.getItems();
                checkOutRepository.save(checkout2);
            }

            cartRepository.delete(cart.get());
            return items;

        }
        return null;

    }
    private int addTotalPrice(Cart cart) {
        System.out.println(cart.getItems());
        List<Items> item = cart.getItems();
        int total_price = 0;
        for(Items i : item)
        {
            int temp_price = i.getQuantity() * i.getCycle().getPrice();
            total_price = total_price + temp_price;
        }
        System.out.println(total_price);
        return total_price;
    }


}