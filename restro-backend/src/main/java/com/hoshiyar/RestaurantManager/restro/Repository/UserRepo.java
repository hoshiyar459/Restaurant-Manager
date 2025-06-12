package com.hoshiyar.RestaurantManager.restro.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.User;

@Repository
public interface UserRepo extends MongoRepository<User , ObjectId> {
    
    User findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByMobileNumber(String mobileNumber);
    User findByMobileNumber(String mobileNumber);
     boolean existsByUsernameAndMobileNumber(String username, String mobileNumber);
}
