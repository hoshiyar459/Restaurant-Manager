package com.hoshiyar.RestaurantManager.restro.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.Cart;



@Repository
public interface CartRepo extends MongoRepository<Cart , String> {
     
    
}
