package com.hoshiyar.RestaurantManager.restro.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.Cart;
import java.util.List;


@Repository
public interface CartRepo extends MongoRepository<Cart , String> {
     
    
}
